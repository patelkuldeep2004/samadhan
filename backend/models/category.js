import { DataTypes } from 'sequelize';
import sequelize from '../db/config.js';

const Category = sequelize.define('category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  url: {
    type: DataTypes.STRING
  }
});

export default Category;