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

function createOrderPost(req, res, next) {
    const { total, creatorId, productsJson } = req.body;
    // let { total = null } = req.body;
    // let { user } = req;

    // State.find({ _id: { $in: user.states } }).then(states => {
    //     user.total = 0;
    //     states.forEach(function (state) {
    //         state.options = options(state);
    //         state.subTotal = (Number(state.price) * Number(state.weigth) * Number(state.quantity)).toFixed(2);
    //         user.total += Number(state.subTotal);
    //     });
    //     user.total = user.total.toFixed(2);
    //     const cherryArrayJson = JSON.stringify(calcSubTotal(states));
    //     return 
    Promise.all([
        // states,
        Order.create({ total, creatorId, productsJson }),
        User.findById({ _id: creatorId }),
        // State.deleteMany({ _id: { $in: user.states } })
    ]).then(([newOrder, user]) => {
        user.orders.push(newOrder._id);
        return User.updateOne({ _id: user._id }, { $set: { orders: user.orders } })
    }).then(updatedUser => {
        res.send(updatedUser)
        // myOrdersGet(req, res);
        // res.redirect('/');
    }).catch(err => {
        next(err);
        // handleError(err, res);
        // res.render('500', { errorMessage: err.message });
    });
}

function myOrdersGet(req, res, next) {
    // console.log(req.params);
    let userId = req.params.id;
    User.findById({ _id: userId }).then((user) => {
        return Order.find({ _id: { $in: user.orders } }).sort({ date: -1 })
    }).then(orders => {
        // let orders = addDateToString(ordersResult);
        // console.log(orders)
        res.send(orders);
        // res.render('user/my-orders', { orders, user });

    }).catch(err => {
        next(err);
        // handleError(err, res);
        // res.render('500', { errorMessage: err.message });
    })
}

function pendingOrdersGet(req, res, next) {
    // let { user } = req;
    Order.find({ status: "Pending" }).then(pendingOrdersResult => {
        res.send(pendingOrdersResult);
        // let pendingOrders = addDateToString(pendingOrdersResult);
        // res.render('admin/pending-orders', { pendingOrders, user });
    }).catch(err => {
        next(err);
        // handleError(err, res);
        // res.render('500', { errorMessage: err.message });
    })
}

function approveOrderGet(req, res, next) {
    // let { user } = req;

    const orderId = req.params.id;
    console.log(orderId)
    Order.updateOne({ _id: orderId }, { $set: { status: "Approve" } }).then(updatedOrder => {
        res.send(updatedOrder);
        // pendingOrdersGet(req, res);
    }).catch(err => {
        next(err);
        // handleError(err, res);
        // res.render('500', { errorMessage: err.message });
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
    createOrderPost,
    pendingOrdersGet,
    approveOrderGet,
    removeOrderGet,
    myOrdersGet
}