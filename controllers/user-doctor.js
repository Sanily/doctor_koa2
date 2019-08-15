const axios = require('axios');
const Department = require('../models/department');
const Patient = require('../models/patient');
const Disease = require('../models/disease');

const get_all_departments = async (ctx, next) => {
    //查询所有的科室
    let departments = await Department.findAll().then(departments => {
        return departments.map(department => ({
            department_id: department.id,
            department_name: department.name,
        }));
    });
    ctx.response.body = {
        code: 0,
        data: departments
    };
};

let info = {
    patient_age: '1',
    patient_month: '0',
    patient_day: '0',
    patient_nation_id: '1', // '汉族'
    patient_gender: '1', // '男'
    patient_is_married: '1', // '未婚'
    medical_institution_id: '0',
    patient_name: '',
    patient_telephone: '',
    patient_address: ''
};

const create_patient = async (ctx, next) => {
    let patient_serial = (Math.random() * Math.pow(10, 18)).toString()

    try {
        await Patient.create(Object.assign(info, {
            patient_serial
        }), {
            fields: Object.keys(info)
        });
        ctx.response.body = {
            code: 0,
            data: { patient_serial }
        }
    } catch (err) {
        ctx.response.body = {
            code: 1,
            data: { patient_serial },
            err: err
        }
    }
};

const update_patient = async (ctx, next) => {
    let form = ctx.request.body;

    try {
        await Patient.update(form, {
            where: {
                patient_serial: form.patient_serial
            }
        }).then(res => {
            console.log('res: ', res);
        });

        ctx.response.body = {
            code: 0,
            data: 'success'
        };
    } catch (err) {
        ctx.response.body = {
            code: 1,
            err: err.message
        }
    }
};

const get_all_disease = async (ctx) => {
    let query = ctx.request.query;
    let condition;
    if (query.category_type === 'department') {
        condition = {
            keshi_id: query.category_id,
            parent_id: 0
        };
    } else {
        condition = {
            parent_id: query.category_id
        };
    }
    try {
        let disease = await Disease.findAll({
            where: condition
        }).map(disease => ({
            disease_id: disease.id,
            disease_name: disease.name
        }));

        ctx.response.body = {
            code: 0,
            data: disease
        };
    } catch (err) {
        ctx.response.body = {
            code: 1,
            err: err.message
        }
    }
};

const get_all_symptoms = async (ctx) => {
    try {
        let query = ctx.request.query;
        let disease = await Disease.findOne({
            where: {
                id: query.disease_id
            }
        });
        let url = `https://www.zrkmy.com/api/GetSymptomsList?xuhao=${disease.xuhao}`;
        let symptoms = await axios.get(url).then(res => {
            return res.data.zhengzhuang.map(symptom => ({
                symptom_id: symptom.sID,
                symptom_name: symptom.sName
            }));
        });
        ctx.response.body = {
            code: 0,
            data: symptoms
        };
    } catch (err) {
        ctx.response.body = {
            code: 1,
            err: err.message
        };
    }

}

module.exports = {
    'GET /user-doctor/get-all-departments': get_all_departments,
    'GET /user-doctor/create-patient': create_patient,
    'POST /user-doctor/update-patient': update_patient,
    'GET /user-doctor/get-all-diseases': get_all_disease,
    'GET /user-doctor/get-all-symptoms': get_all_symptoms

};