const Order = require('../models/Order');
const Cherry = require('../models/Cherry');
const User = require('../models/User');

function newProductGet(req, res, next) {
    const cherryId = req.params.id;
    Cherry.findById(cherryId).then(currProd => {
        let { sort, imagePath, price, _id } = currProd;
        let result = { sort, imagePath, price, _id };
        res.send(result);
    }).catch(err => {
        next(err);
    });
}

function createOrderPost(req, res, next) {
    const { total, creatorId, productsJson } = req.body;
    Promise.all([
        Order.create({ total, creatorId, productsJson }),
        User.findById({ _id: creatorId }),
    ]).then(([newOrder, user]) => {
        user.orders.push(newOrder._id);
        return User.updateOne({ _id: user._id }, { $set: { orders: user.orders } })
    }).then(updatedUser => {
        res.send(updatedUser)
    }).catch(err => {
        next(err);
    });
}

function myOrdersGet(req, res, next) {
    let userId = req.params.id;
    User.findById({ _id: userId }).then((user) => {
        return Order.find({ _id: { $in: user.orders } }).sort({ date: -1 })
    }).then(orders => {
        let filteredOrders = orders.filter(ord => ord.status !== "Archive")
        res.send(filteredOrders);
    }).catch(err => {
        next(err);
    })
}

// function myOrdersGet(req, res, next) {
//     let userId = req.params.id;
//     User.findById({ _id: userId }).populate('orders').then((user) => {
//         //     return Order.find({ _id: { $in: user.orders } }).sort({ date: -1 })
//         // }).then(orders => {
//         console.log(user);
//         let orders = user.orders;
//         res.send(orders);
//     }).catch(err => {
//         next(err);
//     })
// }

function adminOrdersGet(req, res, next) {

    let { startDate, endDate, status } = req.query;
    let query = {};
    if (status) {
        query = { ...query, status: { $regex: status, $options: 'i' } };
        //  name: `/${search}/i` ???
        // name: { $regex: search }
    }
    if (startDate) {
        query = { ...query, date: { $gte: startDate } };
    }
    if (endDate) {
        query = { ...query, date: { $lte: endDate } };
    }
    if (startDate && endDate) {
        query = { ...query, date: { $gte: startDate, $lte: endDate } };
    }
    Order.find(query).populate("creatorId").lean().sort({ date: -1 }).then(adminOrdersResult => {

        adminOrdersResult.forEach(function (order) {
            let { username, email, phone, address } = order.creatorId;
            delete order.creatorId;
            order.user = { username, email, phone, address };
        });

        res.send(adminOrdersResult);
    }).catch(err => {
        next(err);
    })
}

function approveOrderGet(req, res, next) {
    const orderId = req.params.id;
    // const { status } = req.query;
    Order.updateOne({ _id: orderId }, { $set: req.query }).then(updatedOrder => {
        res.send(updatedOrder);
    }).catch(err => {
        next(err);
    })
}

function removeOrderGet(req, res, next) {
    const orderId = req.params.id;
    Order.findById({ _id: orderId }).select('creatorId').then(order => {
        return User.findById({ _id: order.creatorId }).select('orders').then(result => {
            let orders = result.orders.filter(id => id.toString() !== orderId);
            return Promise.all([
                Order.deleteOne({ _id: orderId }),
                User.updateOne({ _id: order.creatorId }, { $set: { orders } })
            ])
        }).then(([deletedOrder, updatedOrder]) => {
            res.send([deletedOrder, updatedOrder]);
        }).catch(err => {
            next(err);
        })
    })
}

function editAddressGet(req, res, next) {
    const orderId = req.params.id;
    const { address } = req.query;
    Order.findById({ _id: orderId }).select('creatorId').then(order => {
        return User.updateOne({ _id: order.creatorId }, { $set: { address } }).then((updatedUser) => {
            res.send(updatedUser);
        }).catch(err => {
            next(err);
        })
    })
}

function archiveOrderGet(req, res, next) {
    const orderId = req.params.id;
    Order.updateOne({ _id: orderId }, { $set: { status: "Archive" } }).then(updatedOrder => {
        res.send(updatedOrder);
    }).catch(err => {
        next(err);
    })
}

module.exports = {
    newProductGet,
    createOrderPost,
    adminOrdersGet,
    approveOrderGet,
    removeOrderGet,
    myOrdersGet,
    editAddressGet,
    archiveOrderGet
}