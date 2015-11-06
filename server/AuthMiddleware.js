//
// AuthMiddleware.js
//

(function() {

    "use strict";

    //
    // AuthMiddleware
    //
    var AuthMiddleware = function() {
        return {
            _server: null,
            //
            // Initializer
            //
            Initialize: function(server) {
                this._server = server;
            },
            //
            // Request handler: '*'
            //
            AllRequests: function() {
                var that = this;
                return function(req, res, next) {
                    that._server.Log('Auth: ', req.path, req.ip);
                    next();
                }
            },
            //
            // Auth Error handler
            //
            OnError: function() {
                var that = this;
                return function(err, req, res, next) {
                    that._server.Log('Unexpected auth error with request: ', req.path, err, err.stack);
                    res.sendStatus(500);
                }
            }
        };
    };

    //
    // Module Exports
    //
    module.exports = AuthMiddleware;

})();
