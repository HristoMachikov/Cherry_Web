const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 4000,
        dbPath: 'mongodb://localhost:27017/cherry-rest-api'
    },
    production: {}
};

module.exports = config[env];