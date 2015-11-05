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
            // Load
            //
            Load: function(filename) {
                var fullname = require.resolve(filename);
                var buffer = fs.readFileSync(fullname, 'utf8');
                return buffer;
            },
            //
            // Save
            //
            Save: function(filename, contents) {
                fs.writeFileSync(filename, contents);
            },
            //
            // Process
            //
            Process: function(template, payload) {
                var compiled = Handlebars.compile(template);
                var processed = compiled(payload);
                return processed;
            }
        };
    };

    //
    // Module Exports
    //
    module.exports = TemplateEngine;

})();
