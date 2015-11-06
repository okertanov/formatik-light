//
// FileManager.js
//

(function() {

    "use strict";

    var fs = require('fs');

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
                        var fullname = require.resolve(filename);
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
            }
        };
    };

    //
    // Module Exports
    //
    module.exports = FileManager;

})();