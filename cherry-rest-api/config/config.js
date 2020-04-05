const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        httpPort: process.env.PORT || 80,
        httpsPort: 443,
        // port: process.env.PORT || 4000,
        dbPath: 'mongodb://localhost:27017/cherry-rest-api'
    },
    production: {}
};

module.exports = config[env];