'use strict';
import { readdirSync } from 'fs';
import { basename as _basename } from 'path';
import Sequelize, { DataTypes } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development';
const __dirname = path.dirname(__filename);
const config = fs.readFileSync(path.resolve(__dirname, '../data-access/config.json'));
const currentEnv = JSON.parse(config)[env];
let sequelize = new Sequelize(currentEnv.database, currentEnv.username, currentEnv.password, currentEnv);
const db = {};
readdirSync(__dirname)
    .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
})
    .forEach(async (file) => {
    const { default: model } = await import(path.resolve(__dirname, file));
    const currentModel = await model(sequelize, DataTypes);
    db[currentModel.name] = currentModel;
});
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
//# sourceMappingURL=index.js.map