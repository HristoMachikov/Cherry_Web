const Cherry = require('../models/Cherry')
// const path = require('path');

module.exports = {
    homeGet: (req, res, next) => {
        Cherry.find().then(cherrys => {
            let cherryPublic = cherrys
                .filter(obj => obj.isPublic === true);
            res.send(cherryPublic);
        }).catch(next);
    }
}