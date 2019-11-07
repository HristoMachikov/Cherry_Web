// Require Controllers...
const homeController = require('../controllers/home');
const cherryController = require('../controllers/cherry');
const userController = require('../controllers/user');
const orderController = require('../controllers/order');
const { auth } = require('../utils');

module.exports = (app) => {

    app.get('/admin/pending-orders', auth(), orderController.pendingOrdersGet);
    app.post('/order/edit/:id', auth(), orderController.editOrderPost);
    app.get('/order/create', auth(), orderController.createOrderPost);
    app.get('/order/my-orders', auth(), orderController.myOrdersGet);
   

    app.get('/cherry/details/:id', auth(), cherryController.detailsGet);
    // app.post('/cherry/details/:id', auth(), cherryController.detailsPost);
    app.get('/cherry/remove/:id', auth(), cherryController.removeGet);
    app.get('/cherry/edit/:id', auth(), cherryController.editGet);
    app.post('/cherry/edit/:id', auth(), cherryController.editPost);
    app.get('/cherry/create', auth(), cherryController.createGet);
    app.post('/cherry/create', auth(), cherryController.createPost);

    app.get('/user/remove/:id', auth(), userController.removeProdGet);
    app.get('/user/new-order/:id', auth(), userController.newOrderGet);
    app.post('/user/new-order/:id', auth(), userController.newOrderPost);

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