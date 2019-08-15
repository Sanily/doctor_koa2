const Sequelize = require('sequelize');
const sequelize = require('./model');

const Patient = sequelize.define('drug_jibing',
    {
        id: {type: Sequelize.INTEGER, primaryKey: true},
        name: {type: Sequelize.STRING, field: 'name'},
        xuhao: {type: Sequelize.STRING, field: 'xuhao'}
    },
    {
        freezeTableName: true,
        timestamps: false,
        freezeColumnName: true
    });

module.exports = Patient;
