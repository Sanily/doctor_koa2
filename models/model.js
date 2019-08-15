const Sequelize = require('sequelize');
const config = require('../config');

//从dependency中引入sequelize，并用本地config文件进行实例化
const sequelize = new Sequelize(
    config.database.data_base_name,
    config.database.username,
    config.database.password,
    config.database.options,
    config.database.extra
);

module.exports = sequelize;
