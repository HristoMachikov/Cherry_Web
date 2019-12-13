const User = require('../models/User');
const TokenBlacklist = require('../models/TokenBlacklist');
const utils = require('../utils');
const { userCookieName } = require('../app-config');

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
            res.send(user);
        }).catch(err => {
            res.status(401).send(err);
        });
}

function registerPost(req, res, next) {
    const { username, password, email, phone } = req.body;

    return User.create({ username, password, email, phone, roles: ['User'] }).then((newUser) => {
        res.send(newUser);
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
        .then(user => res.send(user))
        .catch(() => res.status(401).send('HELLO!'));
}

module.exports = {
    loginPost,
    registerPost,
    logoutGet,
    authGet
};