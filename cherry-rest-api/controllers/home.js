const Cherry = require('../models/Cherry')
const { handleError } = require('./index');

module.exports = {
    homeGet: (req, res, next) => {
        Cherry.find().then(cherrys => {
            let cherryPublic = cherrys
                .filter(obj => obj.isPublic === true);
            res.send(cherryPublic);
        }).catch(next);
    },
    // homeGetAdmin: (req, res, next) => {

    //     Cherry.find().then(cherrys => {
    //         console.log(cherrys)
    //         res.send(cherrys);
    //     }).catch(next);
    // }
}