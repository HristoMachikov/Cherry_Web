const jwt = require('./jwt');
const { userCookieName } = require('../app-config');
const User = require('../models/User');
const TokenBlacklist = require('../models/TokenBlacklist');

function auth(redirectUnauthenticated = true, adminOnly = false) {
    return function (req, res, next) {
        const token = req.cookies[userCookieName] || '';
        Promise.all([
            jwt.verifyToken(token),
            TokenBlacklist.findOne({ token })
        ]).then(([data, blacklistedToken]) => {
            if (blacklistedToken) { return Promise.reject(new Error('blacklisted token')); }

            return User.findById(data.id).then(user => {
                user.isAdmin = user.roles.includes('Admin');
                if (!user || (adminOnly && !user.isAdmin)) {
                    return Promise.reject(new Error('admin only'));
                }
                req.user = user;
                next();
            })
        }).catch(err => {
            console.log(err.message)
            if (!redirectUnauthenticated) { next(); return; }
            if (adminOnly) {
                res.status(401).send('[UNAUTHORIZED - ADMIN ONLY]');
                return
            }
            if ([
                'jwt expired',
                'blacklisted token',
                'jwt must be provided'
            ].includes(err.message)
            ) {
                res.status(401).send('[UNAUTHORIZED]');
                return;
            }
            next(err);
        });
    };
}

module.exports = auth;