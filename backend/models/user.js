import {DataTypes} from 'sequelize';
import sequelize from '../db/config.js';

const user = sequelize.define('user', {
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
  role: {
    type: DataTypes.ENUM('buyer', 'seller'),
    defaultValue: 'buyer'
  }
});

export default user;