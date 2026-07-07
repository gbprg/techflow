import { createApp } from './app.js';
import { createDatabase } from './database.js';

const port = Number(process.env.PORT ?? 3000);
const database = createDatabase(process.env.DATABASE_PATH);
const app = createApp(database);

app.listen(port, () => {
  console.log(`TechFlow Tasks disponível em http://localhost:${port}`);
});
