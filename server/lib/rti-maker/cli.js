#!/usr/bin/env node
import { processRTI } from './index.js';
import path from 'path';

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Usage: node cli.js <pathToRtiFile> [-q quality] [-t tileSize] [-f format]");
  process.exit(1);
}

const inputFile = path.resolve(args[0]);
let quality = 90;
let tileSize = 256;
let format = 'jpg';

for (let i = 1; i < args.length; i++) {
  if (args[i] === '-q' && i + 1 < args.length) quality = parseInt(args[++i], 10);
  if (args[i] === '-t' && i + 1 < args.length) tileSize = parseInt(args[++i], 10);
  if (args[i] === '-f' && i + 1 < args.length) format = args[++i];
}

processRTI(inputFile, { quality, tileSize, format })
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch(err => {
    console.error("Error processing RTI:", err);
    process.exit(1);
  });
