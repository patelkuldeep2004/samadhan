import {DataTypes} from 'sequelize';
import sequelize from '../db/config.js';

const product = sequelize.define('product', {
  title: DataTypes.STRING,
  price: DataTypes.FLOAT,
  categoryId: DataTypes.INTEGER,
  img_link: DataTypes.STRING(2048),
  product_desc: DataTypes.STRING,
  sellerId: DataTypes.INTEGER,
  sellerName: DataTypes.STRING,
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  unit: {
    type: DataTypes.STRING,
    defaultValue: 'kg'
  }
});

export default product;