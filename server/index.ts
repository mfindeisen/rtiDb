import { loadConfig } from './config.js';
import { bootstrapDatabase } from './db.js';
import { createApp } from './app.js';

const config = loadConfig();
bootstrapDatabase(config);

const app = createApp(config);

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});
