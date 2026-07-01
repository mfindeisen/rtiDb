import fs from 'fs/promises';
import path from 'path';

export class XMLGenerator {
  static async generate(parser, tiler, destFolder) {
    let xml = `<?xml version='1.0' encoding='UTF-8'?>\n`;
    xml += `<RTI>\n`;
    xml += `  <Tree>\n`;
    
    // Split the tree descriptor into lines and indent them
    const treeLines = tiler.getTreeDescriptor().split('\\n').filter(l => l.trim() !== '');
    for (const line of treeLines) {
      xml += `    ${line}\n`;
    }
    
    xml += `  </Tree>\n`;
    xml += `  <Content type="${parser.type}">\n`;
    
    // Fix coefficients number for PTM LRGB
    let coeffs = parser.coefficients;
    if (parser.type === 'LRGB_PTM') {
      coeffs = 6;
    }
    
    xml += `    <Size width="${parser.width}" height="${parser.height}" coefficients="${coeffs}"/>\n`;
    xml += `    <Scale>${parser.scale.join(' ')} </Scale>\n`;
    xml += `    <Bias>${parser.bias.join(' ')} </Bias>\n`;
    
    xml += `  </Content>\n`;
    xml += `</RTI>\n`;

    await fs.writeFile(path.join(destFolder, 'info.xml'), xml, 'utf8');
  }
}
