//
// PdfGenerator.js
//

(function() {

    "use strict";

    //
    // PdfGenerator
    //
    var PdfGenerator = function() {
        return {
            //
            // Initialize
            //
            Initialize: function() {
            },
            //
            // Generate
            //
            Generate: function(name, options) {
                 var promise = new Promise(function(resolve, reject) {
                     try {
                        resolve(true);
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
    module.exports = PdfGenerator;

})();
