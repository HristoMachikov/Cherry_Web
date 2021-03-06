const User = require('../models/User');
const TokenBlacklist = require('../models/TokenBlacklist');
const { handleError, handleErrors, options } = require('./index');
const utils = require('../utils');
const encryption = require('../utils/encryption');
const { userCookieName } = require('../app-config');
const Cherry = require('../models/Cherry');
// const { options } = require('./index');
const State = require('../models/State');
const Order = require('../models/Order');

function loginGet(req, res) {
    res.render('user/login');
}
function loginPost(req, res, next) {
    const { username, password } = req.body;
    let userBody = { username, password };
    // const regex = /^[a-zA-Z0-9]*[a-zA-Z0-9]$/;
    if (!username || !password) {
        const error = "Pleas fill all fields!";
        handleError(error, res);
        res.render('user/login', userBody);
        return;
    }
    // if (!regex.test(password) || !regex.test(username)) {
    //     const error = "Password and username should consist only with English letters and digits"
    //     handleError(error, res);
    //     res.render('user/login', userBody);
    //     return;
    // }
    // if (username.length < 4 || password.length < 4) {
    //     const error = "Password and username should be at least 4 characters long"
    //     handleError(error, res);
    //     res.render('user/login', userBody);
    //     return;
    // }
    User.findOne({ username })
        // .then((user) => Promise.all([user, user ? user.matchPassword(password) : false]))
        .then((user) => Promise.all([user, user ? user.matchPassword(password) : false]))
        .then(([user, match]) => {
            if (!match) {
                const error = "Wrong password or username!";
                handleError(error, res);
                res.render('user/login', userBody);
                return;
            }
            const token = utils.jwt.createToken({ id: user._id });
            res.cookie(userCookieName, token);
            res.redirect('/');
        })
    // .catch((err) => {
    //     handleErrors(err, res);
    //     res.render('user/login', userBody);
    // })
}
function registerGet(req, res) {
    res.render('user/register');
}
function registerPost(req, res, next) {
    const { username, password, repeatPassword, email } = req.body;
    let userBody = { username, password, repeatPassword, email };

    if (password !== repeatPassword) {
        const error = "Both passwords should match!"
        handleError(error, res);
        res.render('user/register', userBody);
        return;
    }
    return User.create({ username, password, email, roles: ['User'] }).then(() => {
        res.redirect('/user/login');
    }).catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
            const error = "User with this email exist!"
            handleError(error, res);
            res.render('user/register', userBody);
            return;
        }
        handleErrors(err, res);
        res.render('user/register', userBody);
        // next(err);
    });
}

function logoutPost(req, res) {
    const token = req.cookies[userCookieName];
    TokenBlacklist.create({ token }).then(() => {
        res.clearCookie(userCookieName).redirect('/');
    })
}

function calcTotalAndSubTotal(user, states) {
    user.total = 0;
    let arrCherry = states.map(function (state) {
        state.options = options(state);
        state.subTotal = (Number(state.price) * Number(state.weigth) * Number(state.quantity)).toFixed(2);
        user.total += Number(state.subTotal);
        return state;
    })
    // console.log(arrCherry);
    user.total = user.total.toFixed(2);
    return { user, arrCherry };
}

function newOrderGet(req, res) {
    let { user } = req;
    const cherryId = req.params.id;

    const alreadyAdded = user.cherries.includes(cherryId);
    if (alreadyAdded) {
        State.find({ _id: { $in: user.states } }).then(states => {
            res.render('user/new-order', calcTotalAndSubTotal(user, states));
        }).catch(err => {
            handleError(err, res);
            res.render('500', { errorMessage: err.message });
        });
    } else {
        Cherry.findById(cherryId).then(currProd => {
            const { sort, description, imagePath, price } = currProd;
            user.cherries.push(cherryId);
            return Promise.all([
                currProd,
                State.create({ sort, description, imagePath, price, creatorId: user.id, cherryId: currProd._id }),
                User.updateOne({ _id: user.id }, { $set: { cherries: user.cherries } })
            ]);
        }).then(([currProd, newStateProd, updatedUser]) => {
            user.states.push(newStateProd._id);
            return Promise.all([
                State.find({ creatorId: user.id }),
                User.updateOne({ _id: user.id }, { $set: { states: user.states } })
            ]);
        }).then(([states, updatedUser]) => {
            res.render('user/new-order', calcTotalAndSubTotal(user, states));
        }).catch(err => {
            handleError(err, res);
            res.render('500', { errorMessage: err.message });
        });
    }
}

function newOrderPost(req, res) {
    let { user } = req;
    const { weigth } = req.body;
    const { quantity } = req.body;
    State.updateOne({ _id: req.params.id }, { $set: { quantity, weigth } }).then(result => {
        return State.find({ creatorId: user.id });
    }).then(states => {
        res.render('user/new-order', calcTotalAndSubTotal(user, states));
    }).catch(err => {
        handleError(err, res);
        res.render('500', { errorMessage: err.message });
    });
}

function removeProdGet(req, res) {
    let { user } = req;
    const stateId = req.params.id;
    State.findById(stateId).then((state) => {
        let updateUserStates = user.states.filter(id => id.toString() !== stateId);
        let updateUserCherries = user.cherries.filter(id => id.toString() !== state.cherryId.toString());
        return Promise.all([
            state,
            User.updateOne({ _id: user.id }, { $set: { states: updateUserStates, cherries: updateUserCherries } }),
            State.deleteOne({ _id: stateId })
        ]);
    }).then(([state, userUpdated, stateDeleted]) => {
        return State.find({ creatorId: user.id });
    }).then(states => {
        res.render('user/new-order', calcTotalAndSubTotal(user, states));
    }).catch(err => {
        handleError(err, res);
        res.render('500', { errorMessage: err.message });
    });
}

function currentStateGet(req, res) {
    let { user } = req;
    State.find({ creatorId: user.id }).then(states => {
        res.render('user/new-order', calcTotalAndSubTotal(user, states));
    }).catch(err => {
        handleError(err, res);
        res.render('500', { errorMessage: err.message });
    });
}

module.exports = {
    loginGet,
    loginPost,
    registerGet,
    registerPost,
    logoutPost,
    newOrderGet,
    newOrderPost,
    removeProdGet,
    currentStateGet
};