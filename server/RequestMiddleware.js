;//
// RequestMiddleware.js
//

(function () {

    "use strict";

    var fs = require('fs');

    var TemplateEngine = require('./TemplateEngine');
    var PdfGenerator = require('./PdfGenerator');

    //
    // RequestMiddleware
    //
    var RequestMiddleware = function () {
        return {
            _server: null,
            _templateEngine: new TemplateEngine(),
            _pdfGenerator: new PdfGenerator(),

            //
            // Initializer
            //
            Initialize: function (server) {
                this._server = server;

                this._templateEngine.Initialize();
                this._pdfGenerator.Initialize();
            },
            //
            // Request handler: 'GET /'
            //
            GetRoot: function () {
                var that = this;
                return function (req, res, next) {
                    that._server.Log('Request: ', req.path, req.ip);
                    res.sendStatus(403);
                }
            },
            //
            // Request handler: 'GET /status'
            //
            GetStatus: function () {
                var that = this;
                return function (req, res, next) {
                    that._server.Log('Request: ', req.path, req.ip);
                    res.send('STATUS: OK');
                }
            },
            //
            // Request handler: 'GET /admin'
            //
            GetAdmin: function () {
                var that = this;
                return function (req, res, next) {
                    that._server.Log('Request: ', req.path, req.ip);
                    res.sendStatus(401);
                }
            },
            //
            // Request handler: 'POST /generate'
            //
            PostGenerate: function () {
                var that = this;
                return function (req, res, next) {
                    that._server.Log('Request: ', req.path, req.ip, req.body);

                    that._templateEngine.Load('./templates/template.html')
                        .then(function (template) {
                            var payload = {
                                'generator': 'Formatik Light',
                                'date': new Date(),
                                'name': req.body['sender.name'],
                                'company': req.body['sender.company']
                            };
                            return that._templateEngine.Process(template, payload);
                        }).then(function (processed) {
                            return that._templateEngine.Save('./generatedHtml/generated.html', processed);
                        })
                        .then(function (fileName) {
                            var options = {format: 'Letter'};
                            return that._pdfGenerator.Generate(fileName, options);
                        }).then(function (generated) {
                            return that._templateEngine.Save('./generatedPdf/generated.pdf', generated);
                        }).then(function (pdfPath) {

                            fs.readFile(pdfPath, function (err, data) {
                                if (err) {
                                    throw err;
                                }
                                res.pipe(data);
                            });
                        })
                        .catch(function (err) {
                            console.error(err);
                            res.sendStatus(500);
                        });
                }
            },
            //
            // Error handler
            //
            OnError: function () {
                var that = this;
                return function (err, req, res, next) {
                    that._server.Log('Unexpected error with request: ', req.path, err, err.stack);
                    res.sendStatus(500);
                }
            }
        };
    };

    //
    // RequestMiddlewareError
    //
    function RequestMiddlewareError(what) {
        this.name = 'RequestMiddlewareError';

        if (!what) {
            this.message = 'Unknown Request Middleware Module Error';
        }
        else if (what instanceof Error && what.message) {
            this.message = what.message;
            this.fileName = what.fileName;
            this.lineNumber = what.lineNumber;
            this.columnNumber = what.columnNumber;
            this.stack = what.stack;
        }
        else {
            this.message = what;
        }
    }

    RequestMiddlewareError.prototype = Object.create(Error.prototype);
    RequestMiddlewareError.prototype.constructor = RequestMiddlewareError;


    //
    // Module Exports
    //
    module.exports = RequestMiddleware;

})();
