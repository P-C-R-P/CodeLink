import { Sequelize } from 'sequelize';
import 'dotenv/config';

const config = {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
} as object;


const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, config);

(async function () {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();

export { Sequelize, sequelize };