const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isDestacado: {
    type: DataTypes.BOOLEAN,
    default: false
  },
  collectionId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Collections', // Nombre de la tabla
      key: 'id'
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    default: true
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Product;
