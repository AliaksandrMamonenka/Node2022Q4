import { Sequelize } from 'sequelize';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data: any = fs.readFileSync(path.resolve(__dirname, 'config.json'));
const { development } = JSON.parse(data);

const sequelize = new Sequelize(development.database, development.username, development.password, {
  dialect: development.dialect,
  host: development.host,
});

export { sequelize };
