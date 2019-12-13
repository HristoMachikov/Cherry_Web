const Cherry = require('../models/Cherry');

function createPost(req, res, next) {
    let { sort = null, description = null, imagePath = null, isPublic = null, price = null, gallery = null } = req.body;
    const cherry = { sort, description, imagePath, isPublic, gallery };
    price ? cherry.price = Number(price) : null;

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
    Cherry.find({ _id: id }).then(cherry => {
        res.send(cherry);
    }).catch(next)
}

function editPost(req, res, next) {
    let { sort, description, imagePath, isPublic, price, _id } = req.body;
    const cherry = { sort, description, imagePath, isPublic }
    cherry.price = Number(price);
    cherry._id = req.params.id;
    Cherry.updateOne({ _id: req.params.id }, { $set: cherry }, { runValidators: true }).then((result) => {
        res.send("Успешна промяна!");
    }).catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
            const error = "Cherry with this name exist!"
            res.status(401).send(error);
            return;
        }
        if (err.name === 'ValidationError') {
            const error = err.errors.description.message
            res.status(401).send(error);
            return;
        }
        next(err);
    })
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
    Cherry.deleteOne({ _id: cherryId }).then((result) => {
        res.send(result);
    }).catch(err => {
        next(err);
    });
}

module.exports = {
    createPost,
    editGet,
    editPost,
    galleryGet,
    removeGet,
    homeGetAdmin
}