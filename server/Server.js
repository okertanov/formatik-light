//
// Server.js
//

(function() {

    "use strict";

    var express = require('express');
    var body_parser = require('body-parser');
    var multer = require('multer');
    var logger = require('morgan');

    var AuthMiddleware = require('./AuthMiddleware');
    var RequestMiddleware = require('./RequestMiddleware');

    //
    // Server
    //
    var Server = function() {
        var DefaultOptions = {
            logger: true,
            host: '127.0.0.1',
            port: 8080
        };

        return {
            _app: express(),
            _server: null,
            _options: DefaultOptions,
            _amiddleware: new AuthMiddleware(),
            _bmiddleware: new RequestMiddleware(),
            Initialize: function(options) {
                options = options || DefaultOptions;

                if ('logger' in options) {
                    this._options.logger = options.logger;
                }

                if ('host' in options) {
                    this._options.host = options.host;
                }

                if ('port' in options) {
                    this._options.port = options.port;
                }

                var that = this;
                this._app.use(
                    logger('combined', {
                        skip: function(req, res) { return that._options.logger !== true; }
                    })
                );

                this._app.use(body_parser.json());
                this._app.use(body_parser.urlencoded({ extended: true }));
                this._app.use(multer());

                this._amiddleware.Initialize(this);
                this._bmiddleware.Initialize(this);
            },
            InitRoutes: function() {
                this._app.all('*', this._amiddleware.AllRequests());
                this._app.get('/', this._bmiddleware.GetRoot());
                this._app.get('/status', this._bmiddleware.GetStatus());
                this._app.get('/admin', this._bmiddleware.GetAdmin());
                this._app.post('/generate', this._bmiddleware.PostGenerate());
                this._app.use(express.static(__dirname + '/../wwwroot/'));
                this._app.use(this._amiddleware.OnError());
                this._app.use(this._bmiddleware.OnError());
            },
            Listen: function(host, port) {
                host = host || this._options.host;
                port = port || this._options.port;
                var that = this;
                this._server = this._app.listen(port, host, function() {
                    var bind_host = that._server.address().address;
                    var bind_port = that._server.address().port;
                    that.Log('App listening at %s:%s', bind_host, bind_port);
                });
            },
            Log: function() {
                if (this._options.logger === true) {
                    console.log.apply(console, arguments);
                }
            }
        };
    };

    //
    // Module Exports
    //
    module.exports = Server;

})();
