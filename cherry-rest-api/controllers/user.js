const crypto = require("crypto");
const nodeMailer = require('nodemailer');
const bcrypt = require("bcrypt");

const User = require('../models/User');
const TokenBlacklist = require('../models/TokenBlacklist');
const utils = require('../utils');
const { userCookieName, saltRounds, nodeMailerTransporter } = require('../app-config');
// const encryption = require('../utils/encryption');

function frontUser(user) {
    let { username, roles, _id } = user;
    return { username, roles, _id };
}

function loginPost(req, res, next) {
    const { email, password } = req.body;

    User.findOne({ email })
        .then((user) => Promise.all([user, user ? user.matchPassword(password) : false]))
        .then(([user, match]) => {
            if (!match) {
                const error = "Грешен e-mail или парола!";
                res.status(401).send(error);
                return;
            }
            const token = utils.jwt.createToken({ id: user._id });
            res.cookie(userCookieName, token);
            res.send(frontUser(user));
        }).catch(err => {
            res.status(401).send(err);
        });
}

function registerPost(req, res, next) {
    const { username, password, email, phone } = req.body;

    return User.create({ username, password, email, phone, roles: ['User'] }).then((newUser) => {
        res.send(frontUser(newUser));
    }).catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
            const error = "Потребител с този Е-mail съществува!"
            res.status(401).send(error);
            return;
        }
        next(err);
    });
}

function logoutGet(req, res, next) {
    const token = req.cookies[userCookieName];
    TokenBlacklist.create({ token }).then(() => {
        res.clearCookie(userCookieName)
        res.send('Успешно излизане!');
    }).catch(next);
}

function authGet(req, res) {
    const token = req.cookies[userCookieName];
    utils.jwt.verifyToken(token)
        .then(({ id }) => User.findById(id))
        .then(user => res.send(frontUser(user)))
        .catch(() => res.status(401).send('HELLO!'));
}
function sendEmailPost(req, res, next) {
    let { firstname, lastname, email, theme, message } = req.body;

    console.log({ firstname, lastname, email, theme, message });

    let transporter = nodeMailer.createTransport(nodeMailerTransporter);
    let mailOptions = {
        from: `${email}`, // sender address will be replace with user
        to: "hristomachikov@gmail.com", // list of receivers
        subject: `Get Cherry and ${firstname} ${lastname} discuss: ${theme}`, // Subject line
        text: `${message}\n\nSender: ${email}`, // plain text body
        // html: '<b>NodeJS Email Tutorial</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send(error);
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.send(info);
    });
}

function changePasswordPost(req, res, next) {
    const { oldPassword, newPassword } = req.body;
    const { userId } = req.query;
    console.log(userId)
    User.findById({ _id: userId })
        .then((user) => Promise.all([user, user ? user.matchPassword(oldPassword) : false]))
        .then(([user, match]) => {
            if (!match) {
                const error = "Грешна стара парола!";
                res.status(400).send(error);
                return;
            }
            return Promise.all([user, user.matchPassword(newPassword)])
        }).then(([user, match]) => {
            if (match) {
                const error = "Новата парола е като старата!";
                res.status(400).send(error);
                return;
            }
            // const newPassSalt = encryption.generateSalt();
            // const newPassHash = encryption.generateHashedPassword(newPassSalt, newPassword);
            // return User.updateOne({ _id: userId }, { $set: { password: newPassHash, salt: newPassSalt } })
            return bcrypt.hash(newPassword, saltRounds)
        }).then(newPassHash => {
            return User.updateOne({ _id: userId }, { $set: { password: newPassHash } })
        }).then(updatedUser => {
            res.send(updatedUser)
        }).catch(err => {
            res.status(401).send(err);
        });
}

function setNewPassLinkPost(req, res, next) {
    const { email, newPassword } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                const error = "Не е намерен потребител с този e-mail!";
                res.status(400).send(error);
                return;
            }
            return Promise.all([user, user.matchPassword(newPassword)])
        }).then(([user, match]) => {
            if (match) {
                const error = "Новата парола е като старата!";
                res.status(400).send(error);
                return;
            }
            // const newPassSalt = encryption.generateSalt();
            // const newPassHash = encryption.generateHashedPassword(newPassSalt, newPassword);
            return bcrypt.hash(newPassword, saltRounds)
        }).then(newPassHash => {
            const newPassLinkId = crypto.randomBytes(20).toString('hex');

            let transporter = nodeMailer.createTransport(nodeMailerTransporter);
            const confirmLink = `http://${req.hostname}${req.hostname === "localhost" ? ":3000" : ""}${req.url}/${newPassLinkId}`;

            let dateNow = new Date;
            let dateNewPassLink = new Date(dateNow);

            dateNewPassLink.setMinutes(dateNow.getMinutes() + 15);
            const dateNewPassLinkStr = dateNewPassLink.toLocaleDateString() + " - " + dateNewPassLink.toLocaleTimeString();

            let mailOptions = {
                from: ``, // sender address will be replace with user
                to: `${email}`,
                subject: `Get Cherry confirmation of the new password`,
                html: `<p>За да потвърдите новата парола, моля отворете посочения линк:</p>
                <a href="${confirmLink}">${confirmLink}</a></br>
                 <p>Линка е активен до: ${dateNewPassLinkStr}</p></br>
               <p> Ако не сте направили заявка за нова парола, моля не отворете посочения линк!</p>`,
            };

            return Promise.all([
                User.updateOne({ email }, { $set: { newPassword: newPassHash, newPassLinkId } }),
                transporter.sendMail(mailOptions)
            ])
        }).then(([updatedUser, info]) => {
            setTimeout(() => {
                User.updateOne({ email }, { $set: { newPassword: undefined, newPassLinkId: undefined } })
                    .then(result => console.log(result))
                    .catch(err => console.log(err))
            }, 900000);//15 minutes
            res.send(updatedUser);
        }).
        catch(err => {
            res.status(401).send(err);
        });
};

function confirmNewPassLinkGet(req, res, next) {
    const newPassLinkId = req.params.id;
    User.findOne({ newPassLinkId }).then(user => {
        if (!user) {
            const error = "Линка не е активен!";
            res.status(400).send(error);
            return;
        }
        return User.updateOne({ newPassLinkId }, {
            $set: {
                password: user.newPassword,
                // salt: user.newPassSalt,
                newPassLinkId: undefined,
                newPassword: undefined,
                // newPassSalt: undefined
            }
        })
    }).then(updatedUser => {
        res.send(updatedUser);
    }).catch(error => {
        res.status(401).send(error);
    })
};

module.exports = {
    loginPost,
    registerPost,
    logoutGet,
    authGet,
    sendEmailPost,
    changePasswordPost,
    setNewPassLinkPost,
    confirmNewPassLinkGet
};