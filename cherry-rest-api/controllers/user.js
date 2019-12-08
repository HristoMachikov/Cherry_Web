const User = require('../models/User');
const TokenBlacklist = require('../models/TokenBlacklist');
// const { handleError, handleErrors, options } = require('./index');
const utils = require('../utils');
// const encryption = require('../utils/encryption');
const { userCookieName } = require('../app-config');
// const Cherry = require('../models/Cherry');
// const State = require('../models/State');
// const Order = require('../models/Order');

// function loginGet(req, res) {
//     res.render('user/login');
// }
function loginPost(req, res, next) {
    const { email, password } = req.body;
    // let userBody = { username, password };
    // if (!username || !password) {
    //     const error = "Pleas fill all fields!";
    //     handleError(error, res);
    //     res.render('user/login', userBody);
    //     return;
    // }
    User.findOne({ email })
        // .then((user) => Promise.all([user, user ? user.matchPassword(password) : false]))
        .then((user) => Promise.all([user, user ? user.matchPassword(password) : false]))
        .then(([user, match]) => {
            if (!match) {
                const error = "Грешен e-mail или парола!";

                res.status(401).send(JSON.stringify(error));
                // handleError(error, res);
                // res.render('user/login', userBody);
                return;
            }
            const token = utils.jwt.createToken({ id: user._id });
            res.cookie(userCookieName, token);
            res.send(user);

            // const { username, email, _id } = user;
            // const resUser = { username, email, _id }
            // resUser.isAdmin = user.roles.includes('Admin');
            // res.send(JSON.stringify(resUser));
            // // res.redirect('/');
        }).catch(err => {
            res.send(err);
        });
    // .catch((err) => {
    //     handleErrors(err, res);
    //     res.render('user/login', userBody);
    // })
}

function registerPost(req, res, next) {
    console.log(req.body)
    const { username, password, repeatPassword, email, phone } = req.body;
    // let userBody = { username, password, repeatPassword, email };

    // if (password !== repeatPassword) {
    //     const error = "Both passwords should match!"
    //     handleError(error, res);
    //     res.render('user/register', userBody);
    //     return;
    // }
    return User.create({ username, password, email, phone, roles: ['User'] }).then((newUser) => {

        res.send(newUser);
        // res.redirect('/user/login');
    }).catch(err => {
        console.log(err);
        if (err.name === 'MongoError' && err.code === 11000) {

            const error = "Потребител с този Е-mail съществува!"
            console.log(error + 'then')
            res.status(401).send(JSON.stringify(error));
            // handleError(error, res);
            // res.render('user/register', userBody);
            return;
        }
        // handleErrors(err, res);
        // res.render('user/register', userBody);
        next(err);
    });
}

function logoutGet(req, res, next) {
    const token = req.cookies[userCookieName];
    TokenBlacklist.create({ token }).then(() => {
        res.clearCookie(userCookieName)
        res.send(JSON.stringify('Успешно излизане!'));
        // res.redirect('/');
    }).catch(next);
}

function authGet(req, res) {
    const token = req.cookies[userCookieName];
    utils.jwt.verifyToken(token)
        .then(({ id }) => User.findById(id))
        .then(user => res.send(user))
        .catch(() => res.status(401).send('HELLO!'));
}

// function calcTotalAndSubTotal(user, states) {
//     user.total = 0;
//     let arrCherry = states.map(function (state) {
//         state.options = options(state);
//         state.subTotal = (Number(state.price) * Number(state.weigth) * Number(state.quantity)).toFixed(2);
//         user.total += Number(state.subTotal);
//         return state;
//     })
//     // console.log(arrCherry);
//     user.total = user.total.toFixed(2);
//     return { user, arrCherry };
// }

// function newProductGet(req, res, next) {

//     const cherryId = req.params.id;
//     Cherry.findById(cherryId).then(currProd => {
//         res.send(currProd);
//     }).catch(err => {
//     });

// }

// function newOrderPost(req, res) {
//     let { user } = req;
//     const { weigth } = req.body;
//     const { quantity } = req.body;
//     State.updateOne({ _id: req.params.id }, { $set: { quantity, weigth } }).then(result => {
//         return State.find({ creatorId: user.id });
//     }).then(states => {
//         res.render('user/new-order', calcTotalAndSubTotal(user, states));
//     }).catch(err => {
//         handleError(err, res);
//         res.render('500', { errorMessage: err.message });
//     });
// }

// function removeProdGet(req, res) {
//     let { user } = req;
//     const stateId = req.params.id;
//     State.findById(stateId).then((state) => {
//         let updateUserStates = user.states.filter(id => id.toString() !== stateId);
//         let updateUserCherries = user.cherries.filter(id => id.toString() !== state.cherryId.toString());
//         return Promise.all([
//             state,
//             User.updateOne({ _id: user.id }, { $set: { states: updateUserStates, cherries: updateUserCherries } }),
//             State.deleteOne({ _id: stateId })
//         ]);
//     }).then(([state, userUpdated, stateDeleted]) => {
//         return State.find({ creatorId: user.id });
//     }).then(states => {
//         res.render('user/new-order', calcTotalAndSubTotal(user, states));
//     }).catch(err => {
//         handleError(err, res);
//         res.render('500', { errorMessage: err.message });
//     });
// }

// function currentStateGet(req, res) {
//     let { user } = req;
//     State.find({ creatorId: user.id }).then(states => {
//         res.render('user/new-order', calcTotalAndSubTotal(user, states));
//     }).catch(err => {
//         handleError(err, res);
//         res.render('500', { errorMessage: err.message });
//     });
// }

module.exports = {
    // loginGet,
    loginPost,
    registerPost,
    logoutGet,
    authGet
    // newProductGet,
    // newOrderPost,
    // removeProdGet,
    // currentStateGet
};