// Require Controllers...
const homeController = require('../controllers/home');
const cherryController = require('../controllers/cherry');
const userController = require('../controllers/user');
const orderController = require('../controllers/order');
const { auth } = require('../utils');

module.exports = (app) => {

    app.get('/admin/pending-orders', auth(), orderController.pendingOrdersGet);
    app.post('/order/create', auth(), orderController.createOrderPost);
    app.post('/order/edit/:id', auth(), orderController.editOrderPost);
    // app.get('/lecture/play/:id', auth(), orderController.playGet);

    app.get('/cherry/details/:id', auth(), cherryController.detailsGet);
    // app.post('/cherry/details/:id', auth(), cherryController.detailsPost);
    app.get('/cherry/remove/:id', auth(), cherryController.removeGet);
    app.get('/cherry/edit/:id', auth(), cherryController.editGet);
    app.post('/cherry/edit/:id', auth(), cherryController.editPost);
    app.get('/cherry/create', auth(), cherryController.createGet);
    app.post('/cherry/create', auth(), cherryController.createPost);


    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);
    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);
    app.post('/user/logout', userController.logoutPost);

    // app.get('/search', auth(), homeController.search);
    app.get('/about', auth(false), homeController.about);
    app.get('/', auth(false), homeController.homeGet);
    app.all('*', homeController.notFound);
};