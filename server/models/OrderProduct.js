const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderProduct = sequelize.define('OrderProducts', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'OrderProducts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  
module.exports = OrderProduct;
