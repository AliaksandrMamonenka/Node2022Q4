import { Sequelize } from 'sequelize';

// const { DATABASE, DATABASE_USER, DATABASE_PASSWORD, DIALECT, HOST } = process.env;
const sequelize = new Sequelize('node2022q4', 'Aliaksandr_Mamonenka', undefined, {
  dialect: 'postgres',
  host: '127.0.0.1',
});

export { sequelize };
