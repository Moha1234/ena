process.env.NODE_ENV = "development";

// Setup server port
var port = process.env.PORT || 9000;

var mongoose = require("./config/mongoose");
          express = require("./config/express"),
           db = mongoose(),
          app = express();

app.get('*', function (req, res) {
    res.render("page-not-found");
});

app.listen(port);
module.exports = app;
console.log('Server running at ' + port);

