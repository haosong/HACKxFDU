/**
 * Created by HDYA-BackFire on 2016-10-15 with IntelliJ IDEA.
 * Part of Project HACKxFDU
 * Make decision and don't look back
 * Like an angel you fly into my world, my snow white queen
 */
'use strict';

var express = require('express');
var config = require('../config');
var debuglog = require('./debuglog');
var fs = require('fs');
var path = require('path');
var ExpressPeerServer = require('peer').ExpressPeerServer;

// the web express app
var app = global.app = express();

// only load static middle-ware in static envirounment
if(config.debug) {
    app.use(config.staticRootUrl, express.static(config.staticRoot));
}

// set engine
app.set('views', config.pagesRoot);
app.set('view cache', false);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// discover pages
fs.readdir(config.pagesRoot, function(err, files) {
    if(err) {
        debuglog('Auto-discover pages failed, ' + err);
        return ;
    }

    files.forEach(function(dname) {
        var viewName = path.join(config.pagesRoot, dname, 'views.js');
        if(! fs.existsSync(viewName)) {
            return;
        }

        require(viewName);
    });

    // 404 handler
    app.use(require('./error/404handler')());
    // Error handler
    app.use(require('./error/error-handler')());
});


exports.start = function() {
    var server = app.listen(config.port, '0.0.0.0');

    // set peer server
    app.use(config.peerPath, ExpressPeerServer(server, {}));

    // only start once
    exports.start = function(){};

    // listen to CTRL-C to stop
    if(config.debug) {
        debuglog('server started on port ' + config.port + ', press CTRL-C to stop');
        process.on('SIGINT', function() {
            debuglog('Terminating service');
            server.close();
            process.exit(0);
        });
    }
};
