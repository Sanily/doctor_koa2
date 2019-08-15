const Sequelize = require('sequelize');
const sequelize = require('./model');

const Patient = sequelize.define('drug_patient_test',
    {
        id: {type: Sequelize.INTEGER, primaryKey: true},
        patient_serial: {type: Sequelize.STRING, field: 'patient_serial'},
        patient_name: {type: Sequelize.STRING},
        patient_age: {type: Sequelize.INTEGER},
        patient_month: {type: Sequelize.INTEGER},
        patient_day: {type: Sequelize.INTEGER},
        patient_nation_id: {type: Sequelize.INTEGER},
        patient_gender: {type: Sequelize.STRING},
        patient_id_number: {type: Sequelize.STRING},
        patient_address: {type: Sequelize.STRING},
        patient_telephone: {type: Sequelize.STRING},
        country_id: {type: Sequelize.INTEGER},
        medical_institution_id: {type: Sequelize.STRING},
        patient_is_married: {type: Sequelize.INTEGER}
    },
    {
        freezeTableName: true,
        timestamps: false,
        freezeColumnName: true
    });

module.exports = Patient;
