//
// PdfGenerator.js
//

(function () {

    "use strict";

    var fs = require('fs');
    var pdf = require('html-pdf');

    //
    // PdfGenerator
    //
    var PdfGenerator = function () {
        return {
            //
            // Initialize
            //
            Initialize: function () {
            },
            //
            // Generate
            //
            Generate: function (filename, options) {
                var promise = new Promise(function (resolve, reject) {
                    try {
                        var fullname = require.resolve(filename);
                        var html = fs.readFileSync(fullname, 'utf8');

                        pdf.create(html, options).toFile('./generated.pdf', function (err, pdf) {
                            if (err) {
                                reject(err);
                            }
                            resolve(pdf);
                        });
                    }
                    catch (e) {
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
