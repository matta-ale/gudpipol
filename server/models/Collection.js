const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const Collection = sequelize.define('Collection', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: true
});

module.exports = Collection;
