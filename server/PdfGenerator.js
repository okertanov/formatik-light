//
// PdfGenerator.js
//

(function() {

    "use strict";

    var fs = require('fs');
    var generator = require('html-pdf');

    //
    // PdfGenerator
    //
    var PdfGenerator = function() {
        var DefaultOptions = {
            // Allowed units: A3, A4, A5, Legal, Letter, Tabloid
            'format': 'A4',
            // Allowed file types: png, jpeg, pdf
            'type': 'pdf',
            // Only used for types png & jpeg
            'quality': '75',
            // Array of strings used as phantomjs args,
            // e.g. ["--ignore-ssl-errors=yes"]
            'phantomArgs': [],
            // Timeout that will cancel phantomjs, in milliseconds
            'timeout': 5000,
        };

        return {
            //
            // Initialize
            //
            Initialize: function() {
            },
            //
            // Generate
            //
            Generate: function(filenameFrom, filenameTo, options) {
                 var promise = new Promise(function(resolve, reject) {
                     try {
                        var options = options || DefaultOptions;

                        var config = {
                            format: options.format,
                            type: options.type,
                            timeout: options.timeout
                        };

                        fs.readFile(filenameFrom, 'utf8', function(err, data) {
                            if (err) {
                                reject(err);
                            };

                            try {
                                generator.create(data, config)
                                    .toFile(filenameTo, function(err, res) {
                                      if (err) {
                                          reject(e);
                                      };

                                      resolve(res.filename);
                                    });
                            }
                            catch(e) {
                                reject(e);
                            }
                        });
                     }
                     catch(e) {
                         reject(e);
                     }
                 });
                 return promise;
            },
        };
    };

    //
    // Module Exports
    //
    module.exports = PdfGenerator;

})();
