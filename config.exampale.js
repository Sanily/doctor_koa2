const config = {
    database:
        {
            data_base_name: 'cloud_top',
            username: 'root',
            password: '',
            options: {
                dialect: 'mysql',
                host: 'hk.kirisamenana.com',
            },
            extra: {
                timestamps: false
            }
        }
};


module.exports = config;
