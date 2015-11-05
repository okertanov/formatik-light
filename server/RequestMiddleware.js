;//
// RequestMiddleware.js
//

(function() {

    "use strict";

    var TemplateEngine = require('./TemplateEngine');


    //
    // RequestMiddleware
    //
    var RequestMiddleware = function() {
        return {
            _server: null,
            _templateEngine: new TemplateEngine(),

            //
            // Initializer
            //
            Initialize: function(server) {
                this._server = server;

                this._templateEngine.Initialize();

            },
            //
            // Request handler: 'GET /'
            //
            GetRoot: function() {
                var that = this;
                return function(req, res, next) {
                    that._server.Log('Request: ', req.path, req.ip);
                    res.sendStatus(403);
                }
            },
            //
            // Request handler: 'GET /status'
            //
            GetStatus: function() {
                var that = this;
                return function(req, res, next) {
                    that._server.Log('Request: ', req.path, req.ip);
                    res.send('STATUS: OK');
                }
            },
            //
            // Request handler: 'GET /admin'
            //
            GetAdmin: function() {
                var that = this;
                return function(req, res, next) {
                    that._server.Log('Request: ', req.path, req.ip);
                    res.sendStatus(401);
                }
            },
            //
            // Request handler: 'POST /generate'
            //
            PostGenerate: function() {
                var that = this;
                return function(req, res, next) {
                    that._server.Log('Request: ', req.path, req.ip, req.body);

                    var fs = require('fs');
                    var Handlebars = require('handlebars');

                    var filename = require.resolve("./Pdf/Templates/template.html");

                    fs.readFile(filename, 'utf8', function (err, source) {
                        if (err) {
                            res.send(err);
                        }

                        var template = Handlebars.compile(source);

                        var obj = {
                            "name": req.body['sender.name'],
                            "company": req.body['sender.company']
                        };

                        var html = template(obj);

                        res.send(html);
                    });
                }
            },
            //
            // Error handler
       // Error handler
            //
            OnError: function() {
                var that = this;
                return function(err, req, res, next) {
                    that._server.Log('Unexpected error with request: ', req.path, err, err.stack);
                    res.sendStatus(500);
                }
            }
        };
    };

    //
    // Module Exports
    //
    module.exports = RequestMiddleware;

})();
