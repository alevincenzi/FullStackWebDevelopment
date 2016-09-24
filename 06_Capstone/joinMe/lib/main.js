var http    = require("http");
var express = require("express");
var cfEnv   = require("cfenv");
var appEnv  = cfEnv.getAppEnv();
var port    = process.env.VCAP_APP_PORT || 8080;

process.on("exit", function(status) {
  return log("process exiting with Error status  " + status);
});

Server = (function()
{
  function Server(options) {
    if (options == null) {
      options = {};
    }
    if (options.port == null) {
      options.port = appEnv.port;
    }
    if (options.verbose == null) {
      options.verbose = false;
    }
    this.port = options.port, this.verbose = options.verbose;
  }

  Server.prototype.start = function() {
    var app;
    app = express();
    app.use(express["static"]("dist"));
    app.use(express.json());


    app.use(function(req, res, next) {
      req.tx = tx.tx(req, res, todoDB);
      return next();
    });

    app.listen(port, appEnv.bind, (function(_this) {
      return function() {

        // print a message when the server starts listening
        console.log("To view your app, open this link in your browser: http://localhost:" + port);
      };
    })(this));
  };

  return Server;

})();
