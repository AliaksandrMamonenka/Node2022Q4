'use strict';
import Sequelize, { DataTypes } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();
import user from './user.js';
import group from './group.js';
import userGroup from './userGroup.js';
const __filename = fileURLToPath(import.meta.url);
const env = process.env.NODE_ENV || 'development';
const __dirname = path.dirname(__filename);
const config = fs.readFileSync(path.resolve(__dirname, '../data-access/config.json'));
const currentEnv = JSON.parse(config)[env];
let sequelize = new Sequelize(currentEnv.database, currentEnv.username, currentEnv.password, currentEnv);
const db = {};
db.user = user(sequelize, DataTypes);
db.group = group(sequelize, DataTypes);
db.userGroup = userGroup(sequelize, DataTypes);
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
//# sourceMappingURL=index.js.map