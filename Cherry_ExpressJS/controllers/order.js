const Order = require('../models/Order');
const { handleError, handleErrors, options } = require('./index');
const Cherry = require('../models/Cherry');
const State = require('../models/State');
const User = require('../models/User');

// function createLectureGet(req, res) {
//     const { user } = req;
//     const courseId = req.params.id;

//     Course.findById(courseId).then(course => {
//         Promise.all([course, Lecture.find({ 'course': courseId })]).then(([course, lectures]) => {
//             res.render('admin/create-lecture', { user, lectures, course });
//         })
//     }).catch(err => {
//         handleErrors(err, res);
//         // res.render('admin/create-lecture', { lecture, user });
//     })
// }

function calcSubTotal(states) {
    let arrCherry = states.map(function (state) {
        state.options = options(state);
        state.subTotal = (Number(state.price) * Number(state.weigth) * Number(state.quantity)).toFixed(2);
        return state;
    })
    return arrCherry;
}

// function calcTotal(user, states) {
//     user.total = 0;
//     states.forEach(function (state) {
//         state.options = options(state);
//         state.subTotal = (Number(state.price) * Number(state.weigth) * Number(state.quantity)).toFixed(2);
//         user.total += Number(state.subTotal);
//     })

//     user.total = user.total.toFixed(2);
//     return user;
// }

function createOrderPost(req, res) {
    let { total = null } = req.body;
    let { user } = req;
    console.log(req.query);
    console.log(user);
    State.find({ _id: { $in: user.states } }).then(states => {
        user.total = 0;
        states.forEach(function (state) {
            state.options = options(state);
            state.subTotal = (Number(state.price) * Number(state.weigth) * Number(state.quantity)).toFixed(2);
            user.total += Number(state.subTotal);
        });
        user.total = user.total.toFixed(2);
        const cherryArrayJson = JSON.stringify(calcSubTotal(states));
        console.log(cherryArrayJson);
        // let updateUserStates = user.states.filter(id => id.toString() !== stateId);
        // let updateUserCherries = user.cherries.filter(id => id.toString() !== state.cherryId.toString());
        return Promise.all([
            states,
            Order.create({ total:user.total, creatorId: user._id, cherryArray: cherryArrayJson }),
            User.updateOne({ _id: user.id }, { $set: { states: [], cherries: [] } }),
            State.deleteMany({ _id: { $in: user.states } })
        ]);
    }).then(([states, newOrder, updatedUser, deletedStates]) => {
        console.log("Hi");
        user.orders.push(newOrder._id);
        return User.updateOne({ _id: user.id }, { $set: { orders: user.orders } })
    }).then(updatedUser => {
        res.redirect('/');
    }).catch(err => {
        handleError(err, res);
        res.render('500', { errorMessage: err.message });
    });
}

function myOrdersGet(req, res) {
    let { user } = req;
    Order.find({ _id: { $in: user.orders } }).then(orders => {
        console.log("Hi")
        console.log(orders);
        res.render('user/my-orders', {orders,user});
    }).catch(err => {
        handleError(err, res);
        res.render('500', { errorMessage: err.message });
    })
}

function editOrderPost(req, res) { }

function pendingOrdersGet(req, res) { }

// function deleteLectureGet(req, res) {
//     const lectureId = req.params.id
//     let lectureArr = [];
//     Lecture.findById(lectureId).then(lecture => {
//         Promise.all([lecture, Course.findById(lecture.course)]).then(([lecture, course]) => {
//             lectureArr = course.lectures.filter((id) => id.toString() !== lectureId);
//             Promise.all([Lecture.deleteOne({ _id: lectureId }), Course.update({ _id: lecture.course }, { $set: { lectures: lectureArr } })]).then(([result, updatedCourse]) => {
//                 console.log('Successfully deleted lecture!')
//                 res.redirect('/');
//             }).catch(err => {
//                 handleErrors(err, res);
//                 res.render('/');
//             })
//         }).catch(err => {
//             handleErrors(err, res);
//             res.render('/');
//         })
//     }).catch(err => {
//         handleErrors(err, res);
//         res.render('/');
//     })
// }

// function playGet(req, res) {
//     const lectureId = req.params.id
//     const { user } = req;
//     Lecture.findById(lectureId).then(lecture => {
//         Promise.all([lecture, Course.findById(lecture.course).populate('lectures')]).then(([lecture, course]) => {
//             res.render('admin/play-lecture', { lecture, course });
//         }).catch(err => {
//             handleErrors(err, res);
//             res.render('/');
//         })
//     })
// }

module.exports = {
    pendingOrdersGet,
    createOrderPost,
    editOrderPost,
    myOrdersGet
    // deleteLectureGet,
    // playGet
}