global.__basedir = __dirname;

const dbConnector = require('./config/database');
dbConnector().then(() => {
    const config = require('./config/config');
    const app = require('express')();

    require('./config/express')(app);
    require('./config/routes')(app);

    const https = require('https');
    const http = require('http');
    const fs = require('fs');
    https.createServer({
        key: fs.readFileSync('./key.pem'),
        cert: fs.readFileSync('./cert.pem'),
        passphrase: ''
    }, app).listen(config.httpsPort);

    http.createServer(app).listen(config.httpPort, console.log(`Listening on port ${config.httpPort}!`));

    // app.listen(config.port, console.log(`Listening on port ${config.port}!`));
}).catch(console.error);;