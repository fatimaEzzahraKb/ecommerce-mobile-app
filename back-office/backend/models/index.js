const { sequelize } = require('../config/db');
const User = require('./User');
const Category = require('./Category');

module.exports = {
  sequelize,
  User,
  Category,
};