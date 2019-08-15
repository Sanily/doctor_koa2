const Sequelize = require('sequelize');
const sequelize = require('./model');

const Department = sequelize.define('drug_keshi',
    {
        id: {type: Sequelize.INTEGER, primaryKey: true},
        name: {type: Sequelize.STRING}
    },
    {
        freezeTableName: true,
        timestamps: false,
        freezeColumnName: true
    });

module.exports = Department;
