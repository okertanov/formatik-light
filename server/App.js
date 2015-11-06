//
// App.js
//

(function() {

    "use strict";

    var Server = require('./Server');

    var server = new Server();
    server.Initialize();
    server.InitRoutes();
    server.Listen();

})();
