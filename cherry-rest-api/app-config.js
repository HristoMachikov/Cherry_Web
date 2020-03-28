const userCookieName = "user_cookie";
const secret = "shahspeshkata";
const saltRounds = 10;
const nodeMailerTransporter = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'hristomachikov@gmail.com',
        pass: 'Levski1914Gmail'
    }
};

module.exports = {
    userCookieName,
    secret,
    saltRounds,
    nodeMailerTransporter
}