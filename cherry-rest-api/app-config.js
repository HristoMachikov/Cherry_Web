const { googleAuth } = require('./rest-config');
const nodeMailerTransporter = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: googleAuth
};
const userCookieName = "user_cookie";
const secret = "shahspeshkata";
const saltRounds = 10;

module.exports = {
    nodeMailerTransporter,
    userCookieName,
    secret,
    saltRounds
}