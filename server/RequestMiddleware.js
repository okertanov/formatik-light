;//
// RequestMiddleware.js
//

(function() {

    "use strict";

    //
    // RequestMiddleware
    //
    var RequestMiddleware = function() {
        return {
            _server: null,
            //
            // Initializer
            //
            Initialize: function(server) {
                this._server = server;
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
                    var responseText = '/generate: ' + JSON.stringify(req.body);
                    res.send(responseText);
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
