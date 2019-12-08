const Cherry = require('../models/Cherry');
const { handleErrors, handleError } = require('./index');
const User = require('../models/User');

// function createGet(req, res) {
//     let cherry = {};
//     const { user } = req;
//     cherry.isPublic = false;
//     res.render('cherry/create', { cherry, user });
// }

function createPost(req, res, next) {
    let { sort = null, description = null, imagePath = null, isPublic = null, price = null, gallery = null } = req.body;
    const { user } = req;
    const cherry = { sort, description, imagePath, isPublic, gallery };
    price ? cherry.price = Number(price) : null;
    // cherry.isPublic = checkBox === "on";

    Cherry.create(cherry).then(result => {
        console.log('Successfully added!');
        res.send(result);
    }).catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
            const error = "Cherry with this name exist!"
    
            res.status(403).send(JSON.stringify(error));
            return;
        }
        
        if (err.name === 'ValidationError') {
            const error = err.errors.description.message
            res.status(403).send(JSON.stringify(error));
            return;
        }
        next(err);
    })
}

function editGet(req, res, next) {
    const id = req.params.id;
    const { user } = req;
    Cherry.find({ _id: id }).then(cherry => {
        res.send(cherry);
        // res.render('cherry/edit', { cherry, user });
    }).catch(next)
}

function editPost(req, res, next) {
    let { sort, description, imagePath, isPublic, price, _id } = req.body;
    const { user } = req;
    const cherry = { sort, description, imagePath, isPublic }
    cherry.price = Number(price);
    // cherry.isPublic = checkBox === "on";
    cherry._id = req.params.id;
    Cherry.updateOne({ _id: req.params.id }, { $set: cherry }, { runValidators: true }).then((result) => {
        res.send(JSON.stringify("Успешна промяна!"));
    }).catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
            const error = "Cherry with this name exist!"
            console.log(error + 'then')
            //status(401) ????
            res.status(401).send(JSON.stringify(error));
            // handleError(error, res);
            // res.render('user/register', userBody);
            return;
        }
        if (err.name === 'ValidationError') {
            const error = err.errors.description.message
            res.status(401).send(JSON.stringify(error));
            return;
        }
        next(err);
    })
    //     console.log('Successfully edited!')
    //     res.redirect('/');
    // }).catch((err) => {
    //     handleErrors(err, res);
    //     res.render('cherry/edit', { cherry, user });
    // })

}

function galleryGet(req, res, next) {
    const cherryId = req.params.id;
    Cherry.findById(cherryId).then(currProd => {
        res.send(currProd);
    }).catch(err => {
        next(err);
    });
}

function homeGetAdmin(req, res, next) {
    Cherry.find().then(cherries => {
        res.send(cherries);
    }).catch(err => {
        next(err);
    });
}



function removeGet(req, res, next) {
    const cherryId = req.params.id;
    const { user } = req;
    Cherry.deleteOne({ _id: cherryId }).then((result) => {
        res.send(result);
        // res.redirect('/');
    }).catch(err => {
        next(err);
        // handleError(err, res);
        // res.render('500', { errorMessage: err.message });
    });
}

module.exports = {
    // createGet,
    createPost,
    editGet,
    editPost,
    galleryGet,
    removeGet,
    homeGetAdmin
}