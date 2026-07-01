import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

/**
 * Replicates the quadtree tiling logic from splitter.cpp
 */
export class ImageTiler {
  constructor(tileSize = 256, quality = 90) {
    this.tileSize = tileSize;
    this.quality = quality;
    this.nodes = [];
    this.maxSize = 0;
    this.nLevels = 0;
    this.imgRect = null;
  }

  buildTree(width, height) {
    let maxImgSize = Math.max(width, height);
    this.maxSize = 1 << Math.ceil(Math.log2(maxImgSize));
    this.nLevels = Math.ceil(Math.log2(this.maxSize)) - Math.ceil(Math.log2(this.tileSize)) + 1;

    let woffset = Math.floor((this.maxSize - width) / 2);
    let hoffset = Math.floor((this.maxSize - height) / 2);

    this.imgRect = { x: woffset, y: hoffset, width, height };

    let nNodes = Math.floor((Math.pow(4, this.nLevels) - 1) / 3);
    this.nodes = new Array(nNodes);

    let pfp = 1 << (this.nLevels - 1);

    this.nodes[0] = {
      index: 0,
      parent: -1,
      normalizeBox: { left: 0, top: 0, right: 1, bottom: 1, width: 1, height: 1 },
      valid: true,
      imgBox: { left: 0, top: 0, width: this.maxSize, height: this.maxSize },
      children: []
    };

    if (nNodes > 1) {
      for (let i = 0; i < 4; i++) {
        this.nodes[0].children[i] = this.makeChildren(this.nodes[0], i + 1, 1);
      }
    }

    this.nodes[0].imgBox = {
      left: -pfp, top: -pfp,
      width: this.maxSize + 2 * pfp, height: this.maxSize + 2 * pfp
    };
  }

  rectIntersects(r1, r2) {
    let r1Right = r1.x + r1.width;
    let r1Bottom = r1.y + r1.height;
    let r2Right = r2.left + r2.width;
    let r2Bottom = r2.top + r2.height;

    return !(r2.left >= r1Right || r2Right <= r1.x || r2.top >= r1Bottom || r2Bottom <= r1.y);
  }

  makeChildren(parent, index, level) {
    let t = index % 4;
    let pw = parent.normalizeBox.width / 2;
    let ph = parent.normalizeBox.height / 2;
    
    let normalizeBox = {
      left: parent.normalizeBox.left,
      top: parent.normalizeBox.top,
      width: pw,
      height: ph,
      right: parent.normalizeBox.left + pw,
      bottom: parent.normalizeBox.top + ph
    };

    let iw = parent.imgBox.width / 2;
    let ih = parent.imgBox.height / 2;
    
    let imgBox = {
      left: parent.imgBox.left,
      top: parent.imgBox.top,
      width: iw,
      height: ih
    };

    if (t === 1) {
      normalizeBox.top += ph;
    } else if (t === 2) {
      normalizeBox.left += pw;
      normalizeBox.top += ph;
      imgBox.left += iw;
    } else if (t === 3) {
      imgBox.top += ih;
    } else if (t === 0) {
      normalizeBox.left += pw;
      imgBox.left += iw;
      imgBox.top += ih;
    }
    
    normalizeBox.right = normalizeBox.left + pw;
    normalizeBox.bottom = normalizeBox.top + ph;

    let node = {
      index: index,
      parent: parent.index,
      normalizeBox: normalizeBox,
      imgBox: imgBox,
      valid: false,
      children: []
    };

    if (this.rectIntersects(this.imgRect, node.imgBox)) {
      node.valid = true;
    }

    if (level === this.nLevels - 1) {
      for (let i = 0; i < 4; i++) node.children[i] = null;
    } else {
      for (let i = 0; i < 4; i++) {
        node.children[i] = this.makeChildren(node, 4 * index + 1 + i, level + 1);
      }
    }

    let pfp = 1 << (this.nLevels - 1 - level);
    node.imgBox.left -= pfp;
    node.imgBox.top -= pfp;
    node.imgBox.width += 2 * pfp;
    node.imgBox.height += 2 * pfp;

    this.nodes[index] = node;
    return node;
  }

  async processLayer(layerBuffer, width, height, destFolder, layerIndex, format = 'jpg', onTileComplete) {
    // We center this raw image onto a black maxSize x maxSize canvas
    const canvas = sharp({
      create: {
        width: this.maxSize,
        height: this.maxSize,
        channels: 3,
        background: { r: 0, g: 0, b: 0 }
      },
      limitInputPixels: false
    }).composite([{
      input: layerBuffer,
      raw: { width, height, channels: 3 },
      left: this.imgRect.x,
      top: this.imgRect.y
    }]);

    const canvasBuffer = await canvas.png().toBuffer();

    // 3. Recursively save tiles
    await this.saveTile(this.nodes[0], canvasBuffer, destFolder, layerIndex, format, onTileComplete);
  }

  async saveTile(node, canvasBuffer, destFolder, layerIndex, format, onTileComplete) {
    if (!node || !node.valid) return;

    // Crop box limits to ensure we don't extract outside the canvas bounds
    let cropLeft = Math.max(0, node.imgBox.left);
    let cropTop = Math.max(0, node.imgBox.top);
    
    // Calculate right/bottom to safely limit width/height
    let cropRight = Math.min(this.maxSize, node.imgBox.left + node.imgBox.width);
    let cropBottom = Math.min(this.maxSize, node.imgBox.top + node.imgBox.height);
    
    let cropWidth = cropRight - cropLeft;
    let cropHeight = cropBottom - cropTop;

    if (cropWidth > 0 && cropHeight > 0) {
      const targetSize = this.tileSize + 2;
      
      let sharpTile = sharp(canvasBuffer, { limitInputPixels: false })
        .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
        .resize(targetSize, targetSize, { fit: 'fill' }); // Ignore aspect ratio for exact sizes

      const filename = path.join(destFolder, `${node.index + 1}_${layerIndex}.${format}`);
      
      if (format === 'jpg') {
        await sharpTile.jpeg({ quality: this.quality }).toFile(filename);
      } else {
        await sharpTile.png().toFile(filename);
      }
      
      if (onTileComplete) onTileComplete();
    }

    // Process children
    for (let i = 0; i < 4; i++) {
      if (node.children[i]) {
        await this.saveTile(node.children[i], canvasBuffer, destFolder, layerIndex, format, onTileComplete);
      }
    }
  }

  getTreeDescriptor() {
    let output = `${this.nodes.length} 0\n`;
    output += `${this.tileSize}\n`;
    output += `${this.maxSize} ${this.maxSize} 255\n`;
    output += `0 0 0\n`;
    
    for (let i = 0; i < this.nodes.length; i++) {
      let node = this.nodes[i];
      output += `${node.index + 1} ${node.parent} `;
      for (let j = 0; j < 4; j++) {
        let child = node.children[(j + 2) % 4];
        if (child) {
          output += `${child.index} `;
        } else {
          output += `-1 `;
        }
      }
      output += `${this.tileSize} `;
      output += `${node.valid ? 1 : 0} `;
      output += `${node.normalizeBox.left} ${node.normalizeBox.top} 0 `;
      output += `${node.normalizeBox.right} ${node.normalizeBox.bottom} 1\n`;
    }
    
    return output;
  }
}
