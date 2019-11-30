const Order = require('../models/Order');
const { handleError, handleErrors, options, dateToString } = require('./index');
const Cherry = require('../models/Cherry');
const State = require('../models/State');
const User = require('../models/User');


function calcSubTotal(states) {
    let arrCherry = states.map(function (state) {
        state.options = options(state);
        state.subTotal = (Number(state.price) * Number(state.weigth) * Number(state.quantity)).toFixed(2);
        return state;
    })
    return arrCherry;
}

function addDateToString(orders) {
    let ordersArr = orders.map(order => {
        order.dateToStr = dateToString(order.date)
        return order;
    });
    return ordersArr;
}

function newProductGet(req, res, next) {
    const cherryId = req.params.id;
    Cherry.findById(cherryId).then(currProd => {
        res.send(currProd);
    }).catch(err => {
        next(err);
    });
}

function createOrderPost(req, res) {
    let { total = null } = req.body;
    let { user } = req;

    State.find({ _id: { $in: user.states } }).then(states => {
        user.total = 0;
        states.forEach(function (state) {
            state.options = options(state);
            state.subTotal = (Number(state.price) * Number(state.weigth) * Number(state.quantity)).toFixed(2);
            user.total += Number(state.subTotal);
        });
        user.total = user.total.toFixed(2);
        const cherryArrayJson = JSON.stringify(calcSubTotal(states));
        return Promise.all([
            states,
            Order.create({ total: user.total, creatorId: user._id, cherryArray: cherryArrayJson }),
            User.updateOne({ _id: user.id }, { $set: { states: [], cherries: [] } }),
            State.deleteMany({ _id: { $in: user.states } })
        ]);
    }).then(([states, newOrder, updatedUser, deletedStates]) => {
        user.orders.push(newOrder._id);
        return User.updateOne({ _id: user.id }, { $set: { orders: user.orders } })
    }).then(updatedUser => {
        myOrdersGet(req, res);
        // res.redirect('/');
    }).catch(err => {
        handleError(err, res);
        res.render('500', { errorMessage: err.message });
    });
}

function myOrdersGet(req, res) {
    let { user } = req;
    Order.find({ _id: { $in: user.orders } }).sort({ date: -1 }).then(ordersResult => {
        let orders = addDateToString(ordersResult);
        res.render('user/my-orders', { orders, user });
    }).catch(err => {
        handleError(err, res);
        res.render('500', { errorMessage: err.message });
    })
}

function pendingOrdersGet(req, res) {
    let { user } = req;
    Order.find({ status: "Pendding" }).then(pendingOrdersResult => {
        let pendingOrders = addDateToString(pendingOrdersResult);
        res.render('admin/pending-orders', { pendingOrders, user });
    }).catch(err => {
        handleError(err, res);
        res.render('500', { errorMessage: err.message });
    })
}

function approveOrderGet(req, res) {
    let { user } = req;
    const orderId = req.params.id;
    Order.updateOne({ _id: orderId }, { $set: { status: "Approve" } }).then(updatedOrder => {
        pendingOrdersGet(req, res);
    }).catch(err => {
        handleError(err, res);
        res.render('500', { errorMessage: err.message });
    })
}

function removeOrderGet(req, res) {
    let { user } = req;
    const orderId = req.params.id;
    Order.findById({ _id: orderId }).select('creatorId').then(order => {
        return User.findById({ _id: order.creatorId }).select('orders').then(result => {
            let orders = result.orders.filter(id => id.toString() !== orderId);
            return Promise.all([
                Order.deleteOne({ _id: orderId }),
                User.updateOne({ _id: order.creatorId }, { $set: { orders } })
            ])

        }).then(([deletedOrder, updatedOrder]) => {
            pendingOrdersGet(req, res);
        }).catch(err => {
            handleError(err, res);
            res.render('500', { errorMessage: err.message });
        })
    })
}

module.exports = {
    newProductGet,
    pendingOrdersGet,
    approveOrderGet,
    createOrderPost,
    removeOrderGet,
    myOrdersGet
}