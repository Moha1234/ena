mongoose = require('mongoose');
mongoose.Promise = global.Promise;


module.exports = function () {
    var db = mongoose.connect("mongodb://localhost:27017/Badeeco", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

    require("../application/model/admin");
   return db;
};