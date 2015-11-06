//
// FileManager.js
//

(function() {

    "use strict";

    var fs = require('fs');
    var path = require('path');

    //
    // FileManager
    //
    var FileManager = function() {
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
                var promise = new Promise(function(resolve, reject) {
                    try {
                        var fullname = path.resolve(filename);
                        fs.readFile(fullname, 'utf8', function(err, data) {
                            if (err) {
                                reject(err);
                            }

                            resolve(data);
                        });
                    }
                    catch(e) {
                        reject(e);
                    }
                });
                return promise;
            },
            //
            // Save
            //
            Save: function(filename, contents) {
                var promise = new Promise(function(resolve, reject) {
                    try {
                        fs.writeFile(filename, contents, function(err) {
                            if (err) {
                                reject(err);
                            };
                            resolve(filename);
                        });
                    }
                    catch(e) {
                        reject(e);
                    }
                });
                return promise;
            },
            //
            // GetOutputPathFor
            //
            GetOutputPathFor: function(fileMask, fileExt) {
                var fileName = fileMask + '.' + fileExt.toLowerCase();
                var filePath = path.join(__dirname, '..', 'var', 'generated', fileName);
                var normalizedFilePath = path.normalize(filePath);
                return normalizedFilePath;
            },
            //
            // GetTemplatePathFor
            //
            GetTemplatePathFor: function(templateName) {
                var filePath = path.join(__dirname, 'templates', templateName);
                var normalizedFilePath = path.normalize(filePath);
                return normalizedFilePath;
            }
        };
    };

    //
    // Module Exports
    //
    module.exports = FileManager;

})();
