var express = require('express');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var session = require('express-session');
var compression = require('compression');
var async = require("async");
var app = express();
var dotenv = require('dotenv');
var multer = require('multer');

function parallel(middlewares) {
    return function (req, res, next) {
        async.each(middlewares, function (mw, cb) {
            mw(req, res, cb);
        }, next);
    };
}

module.exports = function () {

    if (process.env.NODE_ENV == 'development') {
        ///// FOR SESSION SET /////
        app.use(session({ resave: true, saveUninitialized: true, secret: 'MySecretSystem', maxAge: '1h' })); 
    } else if (process.env.NODE_ENV == 'production') {
        var RedisStore = require('connect-redis')(session);
        var redis = require("redis");
        var client = redis.createClient();

        ///// FOR SESSION SET /////
        app.use(session({ resave: true, saveUninitialized: true, secret: 'MySecretSystem', maxAge: '1h', store: new RedisStore({ host: 'localhost', port: 6379, client: client, ttl: 1440 }) }));
    }


    app.use(parallel([
        express.static('./public', {maxAge: '1y'}),
        express.static('./data', {maxAge: '1d'}),
        compression(),
        bodyParser.json({limit: '50mb'}),
        bodyParser.urlencoded({limit: "50mb",extended: true, parameterLimit: 1000000}),
        multer({dest: __dirname + '/data/'}).any()
    ]));
    
   // dotenv.config({ path: 'my_strings.env', silent: true });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.set('views', ['./application/views']);
    app.engine('html', require('ejs').renderFile, cons.swig);
   
    app.set('view engine', 'html');

    require('../application/admin-route/admin-routes')(app);
    return app;
};
