import fs from 'fs/promises';

/**
 * Reads a line from a buffer starting at an offset.
 * Returns the line string and the new offset.
 */
function readLine(buffer, offset) {
  let end = offset;
  while (end < buffer.length && buffer[end] !== 10) { // 10 is '\n'
    end++;
  }
  const line = buffer.toString('utf8', offset, end).trim();
  return { line, nextOffset: end < buffer.length ? end + 1 : end };
}

export class RtiParser {
  constructor(filepath) {
    this.filepath = filepath;
    this.buffer = null;
    this.type = null;
    this.format = null;
    this.width = 0;
    this.height = 0;
    this.scale = [];
    this.bias = [];
    this.coefficients = 0;
    this.headerOffset = 0;
    this.layers = []; // Will store the extracted image layers (as Buffers of RGB pixels)
  }

  async parse() {
    this.buffer = await fs.readFile(this.filepath);
    
    // Read first word to determine type
    const firstSpaceOrNewline = this.buffer.findIndex(b => b === 32 || b === 10);
    const firstWord = this.buffer.toString('utf8', 0, firstSpaceOrNewline).trim();
    
    if (firstWord === 'PTM_1.2' || firstWord.includes('PTM')) {
      await this.parsePtm();
    } else {
      await this.parseHsh();
    }
  }

  async parsePtm() {
    let offset = 0;
    let line;
    
    // Read Format
    ({ line, nextOffset: offset } = readLine(this.buffer, offset));
    this.format = line;
    
    // Read Type
    ({ line, nextOffset: offset } = readLine(this.buffer, offset));
    let ptmType = line;
    
    // Read Dimensions
    ({ line, nextOffset: offset } = readLine(this.buffer, offset));
    this.width = parseInt(line, 10);
    ({ line, nextOffset: offset } = readLine(this.buffer, offset));
    this.height = parseInt(line, 10);
    
    // Read Scale
    ({ line, nextOffset: offset } = readLine(this.buffer, offset));
    this.scale = line.split(' ').filter(s => s).map(Number);
    
    // Read Bias
    ({ line, nextOffset: offset } = readLine(this.buffer, offset));
    this.bias = line.split(' ').filter(s => s).map(Number);
    
    this.headerOffset = offset;
    
    if (ptmType === 'PTM_FORMAT_LRGB') {
      this.type = 'LRGB_PTM';
      this.coefficients = 6; // LRGB has 6 scale/bias, but 3 coeff layers in C++ code
      await this.parsePtmLRGBData();
    } else if (ptmType === 'PTM_FORMAT_RGB') {
      this.type = 'RGB_PTM';
      this.coefficients = 6;
      await this.parsePtmRGBData();
    } else {
      throw new Error(`Unsupported PTM Type: ${ptmType}`);
    }
  }

  async parsePtmLRGBData() {
    // Ported from PtmLRGB::loadData
    let offset = this.headerOffset;
    const multiplexed_channels = this.format === 'PTM_1.2' ? 2 : 3;
    
    // Initialize 3 layers, each w*h*3 bytes (RGB)
    for (let i = 0; i < 3; i++) {
      this.layers.push(Buffer.alloc(this.width * this.height * 3));
    }
    
    const line_size = this.width * multiplexed_channels * 3;
    
    // PTM is stored bottom-to-top usually, so we read y from bottom to top
    for (let y = 0; y < this.height; y++) {
      let line = this.buffer.subarray(offset, offset + line_size);
      offset += line_size;
      
      for (let c = 0; c < multiplexed_channels; c++) {
        let dest_offset = this.width * (this.height - y - 1) * 3;
        let source_offset = c * 3;
        let layerBuffer = this.layers[c];
        
        for (let x = 0; x < this.width; x++) {
          layerBuffer[dest_offset] = line[source_offset];
          layerBuffer[dest_offset + 1] = line[source_offset + 1];
          layerBuffer[dest_offset + 2] = line[source_offset + 2];
          source_offset += multiplexed_channels * 3;
          dest_offset += 3;
        }
      }
    }
    
    if (multiplexed_channels === 2) {
      // Read the 3rd layer appended at the end
      let offset_layer3 = this.width * (this.height - 1) * 3;
      const line_size_l3 = this.width * 3;
      for (let y = 0; y < this.height; y++) {
        let line = this.buffer.subarray(offset, offset + line_size_l3);
        offset += line_size_l3;
        line.copy(this.layers[2], offset_layer3);
        offset_layer3 -= this.width * 3;
      }
    }
  }

  async parsePtmRGBData() {
    // Ported from PtmRGB::loadData
    let offset = this.headerOffset;
    
    // Initialize 6 layers
    for (let i = 0; i < 6; i++) {
      this.layers.push(Buffer.alloc(this.width * this.height * 3));
    }
    
    const line_size = this.width * 6;
    
    // RGB format is interleaved differently
    for (let i = 0; i < 3; i++) {
      for (let y = 0; y < this.height; y++) {
        let line = this.buffer.subarray(offset, offset + line_size);
        offset += line_size;
        
        for (let c = 0; c < 6; c++) {
          let dest_offset = this.width * (this.height - y - 1) * 3 + i;
          let source_offset = c;
          let layerBuffer = this.layers[c];
          
          for (let x = 0; x < this.width; x++) {
            layerBuffer[dest_offset] = line[source_offset];
            dest_offset += 3;
            source_offset += 6;
          }
        }
      }
    }
  }

  async parseHsh() {
    let offset = 0;
    let line;
    
    // Read past comments
    do {
      ({ line, nextOffset: offset } = readLine(this.buffer, offset));
    } while (line.startsWith('#'));
    
    this.type = 'HSH_RTI';
    this.format = parseInt(line, 10);
    
    // Dimensions
    ({ line, nextOffset: offset } = readLine(this.buffer, offset));
    let dims = line.split(' ').filter(s => s);
    this.width = parseInt(dims[0], 10);
    this.height = parseInt(dims[1], 10);
    
    // Coefficients
    ({ line, nextOffset: offset } = readLine(this.buffer, offset));
    this.coefficients = parseInt(line.split(' ')[0], 10);
    
    // Scales and Biases are stored as binary floats (32-bit LE)
    for (let i = 0; i < this.coefficients; i++) {
      this.scale.push(this.buffer.readFloatLE(offset));
      offset += 4;
    }
    for (let i = 0; i < this.coefficients; i++) {
      this.bias.push(this.buffer.readFloatLE(offset));
      offset += 4;
    }
    
    this.headerOffset = offset;
    
    // Ported from Hsh::loadData
    for (let i = 0; i < this.coefficients; i++) {
      this.layers.push(Buffer.alloc(this.width * this.height * 3));
    }
    
    const line_size = this.width * this.coefficients * 3;
    
    for (let y = 0; y < this.height; y++) {
      let line = this.buffer.subarray(offset, offset + line_size);
      offset += line_size;
      
      for (let k = 0; k < this.coefficients; k++) {
        let source_offset = k;
        let dest_offset = this.width * y * 3;
        let layerBuffer = this.layers[k];
        
        for (let x = 0; x < this.width; x++) {
          layerBuffer[dest_offset] = line[source_offset]; source_offset += this.coefficients;     // R
          layerBuffer[dest_offset + 1] = line[source_offset]; source_offset += this.coefficients; // G
          layerBuffer[dest_offset + 2] = line[source_offset]; source_offset += this.coefficients; // B
          dest_offset += 3;
        }
      }
    }
  }

  getLayer(index) {
    if (index < 0 || index >= this.layers.length) return null;
    return this.layers[index];
  }
}
