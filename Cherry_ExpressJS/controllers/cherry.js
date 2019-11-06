const Cherry = require('../models/Cherry');
const { handleErrors, handleError } = require('./index');
const User = require('../models/User');

function createGet(req, res) {
    let cherry = {};
    const { user } = req;
    cherry.isPublic = false;
    res.render('cherry/create', { cherry, user });
}

function createPost(req, res) {
    let { sort = null, description = null, imagePath = null, checkBox = null, price = null } = req.body;
    const { user } = req;
    const cherry = { sort, description, imagePath };
    price ? cherry.price = Number(price) : null;
    cherry.isPublic = checkBox === "on";
    // cherry.lectures = [];
    // cherry.usersEnrolled = [];

    Cherry.create(cherry).then(result => {
        console.log('Successfully added!');
        res.redirect('/');
    }).catch(err => {
        handleErrors(err, res);
        // cube.options = options(cube);
        res.render('cherry/create', { cherry, user });
        return;
    })
}

function editGet(req, res) {
    const id = req.params.id;
    const { user } = req;
    Cherry.findById(Object(id), function (err, cherry) {
        if (err) {
            handleErrors(err, res);
            return;
        }
        // cube.options = options(cube);
        res.render('cherry/edit', { cherry, user });
    })
}

function editPost(req, res) {
    let { sort, description, imagePath, checkBox, price } = req.body;
    const { user } = req;
    const cherry = { sort, description, imagePath }
    cherry.price = Number(price);
    cherry.isPublic = checkBox === "on";
    cherry._id = req.params.id;
    Cherry.updateOne({ _id: req.params.id }, { $set: cherry }, { runValidators: true }).then((result) => {
        console.log('Successfully edited!')
        res.redirect('/');
    }).catch((err) => {
        handleErrors(err, res);
        res.render('cherry/edit', { cherry, user });
    })
}

function detailsGet(req, res, next) {
    let courseId = req.params.id;
    const { user } = req;
    Cherry.findById(Object(courseId)).populate('lectures').then(course => {
        course.usersEnrolled.forEach(element => {
            if (element.toString() === user.id) {
                course.isEnrolled = true;
                return;
            }
        });
        res.render('course/details', { course, user });
    }).catch(err => {
        handleErrors(err, res);
    })
}

function removeGet(req, res, next) {
    const cherryId = req.params.id;
    const { user } = req;
    Cherry.deleteOne({ _id: cherryId }).then((result) => {
        res.redirect('/');
    }).catch(err => {
        handleError(err, res);
        res.render('500', { errorMessage: err.message });
    });
}

module.exports = {
    createGet,
    createPost,
    editGet,
    editPost,
    detailsGet,
    removeGet
}