const Cherry = require('../models/Cherry')

module.exports = {
    homeGet: (req, res, next) => {
        Cherry.find().then(cherrys => {
            let cherryPublic = cherrys
                .filter(obj => obj.isPublic === true);
            res.send(cherryPublic);
        }).catch(next);
    },
    // search: (req, res) => {
    //     let {
    //         //  from, to, 
    //         search } = req.query;
    //     // from = Number(from);
    //     // to = Number(to);
    //     const { user } = req;

    //     // let errors = hendleQueryErrors(from, to);
    //     // if (errors.length > 0) {
    //     //     res.locals.globalErrors = errors;
    //     // }

    //     let query = {};
    //     if (search) {
    //         query = { ...query, title: { $regex: search, $options: 'i' } };
    //         //  name: `/${search}/i` ???
    //         // name: { $regex: search }
    //     }
    //     // if (from) {
    //     //     query = { ...query, difficulty: { $gte: from } };
    //     // }
    //     // if (to) {
    //     //     query = {
    //     //         ...query,
    //     //         difficulty: { ...query.difficulty, $lte: to }
    //     //     };
    //     // }
    //     Cherry.find(query).then(courses => {
    //         res.render('user/index', { courses, user });
    //     })
    //     // // cubeModel.find()
    //     // //     .where('difficulty')
    //     // //     .gte(from)
    //     // //     .lte(to)
    //     // //     .then((cubes) => {
    //     // //         const filtered = cubes.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    //     // //         res.render('index', { cubes: filtered })
    //     // //     })
    // }
}