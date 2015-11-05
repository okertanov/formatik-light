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

                    var payload = {
                        'name': req.body['sender.name'],
                        'company': req.body['sender.company']
                    };

                    var template = that._templateEngine.Load('./Pdf/Templates/template.html');
                    var processed = that._templateEngine.Process(template, payload);

                    res.send(processed);
                }
            },
            //
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
