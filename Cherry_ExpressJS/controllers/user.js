const User = require('../models/User');
const TokenBlacklist = require('../models/TokenBlacklist');
const { handleError, handleErrors } = require('./index');
const utils = require('../utils');
const encryption = require('../utils/encryption');
const { userCookieName } = require('../app-config');
const Cherry = require('../models/Cherry');
const { options } = require('./index');
const State = require('../models/State');

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

function newOrderGet(req, res) {
    let { user } = req;
    const cherryId = req.params.id;

    const alreadyAdded = user.cherries.includes(cherryId);
    if (alreadyAdded) {
        State.find({ _id: { $in: user.states } }).then(states => {
            user.total = 0;
            let arrCherry = states.map(function (state) {
                state.options = options(state);
                state.subTotal = Number(state.weigth) * Number(state.quantity);;
                user.total += Number(state.subTotal);
                return state;
            })
            // console.log(arrCherry);
            res.render('user/new-order', { user, arrCherry });
        }).catch(err => {
            handleError(err, res);
            res.render('500', { errorMessage: err.message });
        });

    } else {

        //state->create/update
        Cherry.findById(cherryId).then(currProd => {
            const { sort, description, imagePath, price } = currProd;
            console.log(currProd);
            console.log(user);
            // currProd.weigth = 0;
            // currProd.quantity = 0;
            // currProd.subTotal = 0;
            // currProd.options = options(currProd);
            user.cherries.push(cherryId);
            console.log(user.cherries);
            return Promise.all([
                currProd,
                State.create({ sort, description, imagePath, price, creatorId: user.id, cherryId: currProd._id }),
                User.updateOne({ _id: user.id }, { $set: { cherries: user.cherries } })
                // User.updateOne({ _id: user.id }, { $set: { expenses: user.expenses.filter(id => id.toString() !== expenseId) } }),
                // Expense.deleteOne({ _id: expenseId })
            ]);
        }).then(([currProd, newStateProd, updatedUser]) => {
            // console.log(newStateProd);
            // console.log("Hi");
            user.states.push(newStateProd._id);
            return Promise.all([
                State.find({ creatorId: user.id }),
                User.updateOne({ _id: user.id }, { $set: { states: user.states } })
            ])
        }).then(([states, updatedUser]) => {

            user.total = 0;
            let arrCherry = states.map(function (state) {
                state.options = options(state);
                state.subTotal = Number(state.weigth) * Number(state.quantity);;
                user.total += Number(state.subTotal);
                return state;
            })
            // console.log(arrCherry);
            res.render('user/new-order', { user, arrCherry });
        }).catch(err => {
            handleError(err, res);
            res.render('500', { errorMessage: err.message });
        });

        //     currProd.weigth = 0;
        //     currProd.quantity = 0;
        //     currProd.subTotal = 0;
        //     currProd.options = options(currProd);

        //     res.locals.arrCherry.push(currProd)
        //     user.arrCherry = res.locals.arrCherry;
        //     console.log(res.locals.arrCherry);
        //     res.render('user/new-order', { user });

        // }).catch(err => {

        //     handleErrors(err, res);
        //     res.render('500', { errorMessage: err.message })
        // })
    }
}

function newOrderPost(req, res) {
    let { user } = req;
    const { weigth } = req.body;
    const { quantity } = req.body;
    console.log(req.body);
    console.log(weigth);
    console.log(quantity);
    State.updateOne({ _id: req.params.id }, { $set: { quantity, weigth } }).then(result => {
        return State.find({ creatorId: user.id });
    }).then(states => {

        user.total = 0;
        let arrCherry = states.map(function (state) {
            state.options = options(state);
            state.subTotal = Number(state.weigth) * Number(state.quantity);;
            user.total += Number(state.subTotal);
            return state;
        })
        // console.log(arrCherry);
        res.render('user/new-order', { user, arrCherry });
    }).catch(err => {
        handleError(err, res);
        res.render('500', { errorMessage: err.message });
    });

}

function removeProdGet(req, res) {
    let { user } = req;
    console.log(user)
    let prodId = req.params.id;
    let newArrCherry = user.arrCherry.filter(elem => elem.id !== prodId)
    console.log(newArrCherry);

    user.arrCherry = newArrCherry;
    newOrderPost();
}

module.exports = {
    loginGet,
    loginPost,
    registerGet,
    registerPost,
    logoutPost,
    newOrderGet,
    newOrderPost,
    removeProdGet
};