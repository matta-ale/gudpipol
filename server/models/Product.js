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
  collectionId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Collections',
      key: 'id'
    }
  },
  length: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  width: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  tablas: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  varilla60x60: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  varilla45x45: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  costoPlaca: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  costoMateriales: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  costoMO: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  costosOcultos: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  costoTotal: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  isDestacado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Product


