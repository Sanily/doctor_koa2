const Department = require('../models/department');

const get_all_departments = async (ctx, next) => {
    //查询所有的科室
    var departments = await Department.findAll().then(departments => {
        return departments.map(department => ({
            department_id: department.id,
            department_name: department.department_name,
        }));
    });
    ctx.response.body = {
        code: 200,
        banner_list: departments
    };
};

module.exports = {
    'GET /doctor': get_all_departments
};
