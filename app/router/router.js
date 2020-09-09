module.exports = function (app) {
    const controller = require('../controller/controller.js');
    const apiMocker = require('connect-api-mocker');

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');

        next();
    });


    app.post('/define', controller.define);
    app.use('/', apiMocker('./app/data-routes'));



}