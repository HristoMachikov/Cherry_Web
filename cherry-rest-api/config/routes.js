// Require Controllers...
const homeController = require('../controllers/home');
const cherryController = require('../controllers/cherry');
const userController = require('../controllers/user');
const orderController = require('../controllers/order');
const { auth } = require('../utils');

module.exports = (app) => {

    app.get('/admin/remove-order/:id', auth(true, true), orderController.removeOrderGet);
    app.get('/admin/approve-order/:id', auth(true, true), orderController.approveOrderGet);
    app.get('/admin/pending-orders', auth(true, true), orderController.pendingOrdersGet);
    app.post('/order/create', auth(), orderController.createOrderPost);
    app.get('/user/my-orders/:id', auth(), orderController.myOrdersGet);
    app.get('/order/new-product/:id', auth(), orderController.newProductGet);

    app.get('/cherry/gallery/:id', auth(), cherryController.galleryGet);
    app.get('/cherry/remove/:id', auth(true, true), cherryController.removeGet);
    app.get('/cherry/edit/:id', auth(true, true), cherryController.editGet);
    app.post('/cherry/edit/:id', auth(true, true), cherryController.editPost);
    // app.get('/cherry/create', auth(true, true), cherryController.createGet);
    app.post('/cherry/create', auth(true, true), cherryController.createPost);

    app.get('/user/remove/:id', auth(), userController.removeProdGet);
    
    app.post('/user/new-order/:id', auth(), userController.newOrderPost);
    app.get('/user/current-state', auth(), userController.currentStateGet);

    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);
    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);
    app.get('/user/logout', userController.logoutGet);

    // app.get('/search', auth(), homeController.search);
    app.get('/about', auth(false), homeController.about);
    app.get('/', auth(false), homeController.homeGet);
    app.all('*', auth(false), homeController.notFound);
};