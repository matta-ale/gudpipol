const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  dialectOptions: {
    // Esto ayuda con problemas de red en Railway
    connectTimeout: 60000 
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000, // Tiempo máximo para intentar conectar
    idle: 10000    // Tiempo antes de liberar una conexión inactiva
  }
});

module.exports = sequelize;