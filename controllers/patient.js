const Patient = require('../models/patient');

const get_all_patient = async (ctx, next) => {
    let RequiredQuery = [
        'patient_age',
        'patient_month',
        'patient_day',
        'patient_nation_id',
        'patient_gender',
        'patient_is_married',
        'medical_institution_id',
        'patient_name',
        'patient_telephone',
        'patient_address'
    ];

    //查询所有的科室
    try {
        let patients = await Patient.findAll().filter(patient => {
            return !RequiredQuery.some(query =>
                patient[query] === null || !(patient[query].toString())
            );
        });
        ctx.response.body = {
            code: 0,
            data: {
                patients
            }
        };
    } catch (e) {
        ctx.response.body = {
            code: 1,
            err: e.message
        };
    }

};

module.exports = {
    'GET /patient/query': get_all_patient
};