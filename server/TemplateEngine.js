//
// TemplateEngine.js
//

(function() {

    "use strict";

    var fs = require('fs');
    var Handlebars = require('handlebars');

    //
    // TemplateEngine
    //
    var TemplateEngine = function() {
        return {
            //
            // Initialize
            //
            Initialize: function() {
            },
            //
            // Process
            //
            Process: function(template, payload) {
                var promise = new Promise(function(resolve, reject) {
                    try {
                        var compiled = Handlebars.compile(template);
                        var processed = compiled(payload);
                        resolve(processed);
                    }
                    catch(e) {
                        reject(e);
                    }
                });
                return promise;
            }
        };
    };

    //
    // Module Exports
    //
    module.exports = TemplateEngine;

})();
