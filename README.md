Formatik-Light
==============

General info
------------
The main goal is to create configurable, deployable, nodejs-based simple to use "Web form to PDF" solution.
Simple use cases:

 - Client configure the layouts for both web/pdf presentations;
 - Client deploys the solution to be online;
 - User can open an url;
 - User can fill a form;
 - User can see validation warnings/hints;
 - User submits a form;
 - User can see generation progress;
 - User can see generation errors;
 - User can get pdf file preview;
 - User can store pdf file locally;
 - User can get persistent link to that generated pdf;
 - User can get persistent link to html preview page;

MVP (tech perspective)
----------------------
### Tier 0 [+]
 1. Post
 2. Response

### Tier 1 [ ]
 1. Post
 2. *Sync generation*
 3. Response

### Tier 2 [ ]
1. Post
2. Sync generation
3. *Persistence (both html/pdf)*
4. Response
5. Stabilization
6. Initial online deployment via 'git push www'

### Tier 3 [ ]
1. *Form validation*
2. Post
3. *Response*
4. *Async generation/Queue (zmq)*
5. *Generation process notification (websockets)*
6. *Generation process indication (jquery)*
7. Persistence (both html/pdf)

### Tier 4
1. Form validation
2. Post
3. Response
4. Async generation/Queue (zmq)
5. Generation process notification (websockets)
6. Generation process indication (jquery)
7. *Web PDF preview*
8. Persistence (both html/pdf)

### Tier 4
 Stabilization

Deployment & Running
--------------------

### Node et al

    brew install nodejs
    brew install npm
    brew install phantomjs

    npm install bower -g
    npm install mocha -g
    npm install forever -g

    npm install
    bower install

### Run it

    npm start

### Test it

    npm test

### Monitor it

    forever list
    tail -f var/log/forever.log

### Kill it

    forever stop formatik-light
    forever stopall

### Open in a browser

[http://localhost:8080/index.html](http://localhost:8080/index.html)


Links
-----
[A JavaScript PDF generation library for Node and the browser](http://pdfkit.org/)  
[Server side PDF generation with Node](http://www.feedhenry.com/server-side-pdf-generation-node-js/)  
[Recommended way to embed PDF in HTML](http://stackoverflow.com/questions/291813/recommended-way-to-embed-pdf-in-html)  
[How to display pdf file in HTML](http://stackoverflow.com/questions/17784037/how-to-display-pdf-file-in-html)  

[github:coolwanglu/pdf2htmlEX](https://github.com/coolwanglu/pdf2htmlEX)  

[How to run node.js app in supervisor behind nginx](https://scottlinux.com/2014/08/27/how-to-run-node-js-app-in-supervisor-behind-nginx-on-debian-wheezy/)  
[Automatically reload node.js files with Supervisor](http://www.jblotus.com/2011/06/18/automatically-reload-node-js-files-with-supervisor/)  
[Operating Node.js in Production](http://blog.risingstack.com/operating-node-in-production/)  

[Introduction to Object-Oriented JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)  
[Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)  
[MDN:  Object.create()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
[OOP in JS, Part 2 : Inheritance](http://phrogz.net/JS/classes/OOPinJS2.html)  
[brackets: src/filesystem/File.js](https://github.com/adobe/brackets/blob/master/src/filesystem/File.js)  
[Object.create(): the New Way to Create Objects in JavaScript](http://www.htmlgoodies.com/beyond/javascript/object.create-the-new-way-to-create-objects-in-javascript.html)  
