import { DataTypes } from 'sequelize';
import sequelize from '../db/config.js';

const Review = sequelize.define('Review', {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.TEXT
  },
  reviewerName: {
    type: DataTypes.STRING
  },
  reviewerEmail: {
    type: DataTypes.STRING
  }
});

export default Review;