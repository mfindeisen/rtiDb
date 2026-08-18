// Must load before @huggingface/transformers (onnxruntime). On Windows the reverse
// order fails with ERR_DLOPEN_FAILED / "procedure could not be found".
import 'sharp';
import { loadConfig } from './config.js';
import { bootstrapDatabase } from './db.js';
import { createApp } from './app.js';

const config = loadConfig();
bootstrapDatabase(config);

const app = createApp(config);

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});
