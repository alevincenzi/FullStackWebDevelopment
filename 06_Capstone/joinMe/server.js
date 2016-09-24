var main = require("./lib/main");
var _ = require("underscore");
var express = require("express");
var app = express();
var port = process.env.VCAP_APP_PORT || 8080;
var options;
var shortOptions;
var envOptions = {};

app.use(express.static(__dirname + '/dist'));

app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
