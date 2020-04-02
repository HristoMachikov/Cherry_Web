global.__basedir = __dirname;

const dbConnector = require('./config/database');
dbConnector().then(() => {
    const config = require('./config/config');
    const app = require('express')();

    require('./config/express')(app);
    require('./config/routes')(app);

    // const https = require('https');
    // const http = require('http');
    // const fs = require('fs');
    // https.createServer({
    //     key: fs.readFileSync('./key.pem'),
    //     cert: fs.readFileSync('./cert.pem'),
    //     passphrase: ''
    // }, app)
    //     .listen(config.port);

    // http.createServer(app).listen(80));

       app.listen(config.port, console.log(`Listening on port ${config.port}!`));

}).catch(console.error);;