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

    // const requestListener = function (req, res) {
    //     res.writeHead(302, {
    // 	    'Location': 'https://' + req.headers.host + req.url
    //     });
    //     res.end();
    // }
    
    // const server = http.createServer(requestListener);
    // server.listen(8080);

    // For production in react package.json
    // "start": "PORT=443 HTTPS=true HOST=getcherry.online react-scripts start"

}).catch(console.error);;