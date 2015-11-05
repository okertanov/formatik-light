var assert = require("assert");
var should = require('should');

if (typeof describe === 'undefined') { 
    var path = require('path');
    var Mocha = require('mocha');
    var mocha = new Mocha({
        ui: 'tdd',
        reporter: 'list'
    });

    mocha.addFile(__filename);
    console.warn('Adding ' + __filename + ' test suite.');

    // Run self
    mocha.run(function(failures) {
        process.on('exit', function () {
            process.exit(failures);
        });
    });
}


describe('Standalone-test', function() {
    before(function() {
    })

    after(function() {
    })

    describe('Using Hosted Mocha', function() {
        it('Should be hosted', function() {
        })
    })
})
