import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize('samadhan_db', 'root', '11223344', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;