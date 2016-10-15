// config of this website goes here
'use strict';

var path = require('path');

// debug mode on ?
exports.debug = true;

// the root dir of the project
exports.projectRoot = path.resolve(__dirname);

// the root dir of static/public files
exports.staticRoot = path.join(exports.projectRoot, 'static');

// the root url for serving static files
exports.staticRootUrl = '/static';

// the root dir of pages
exports.pagesRoot = path.join(exports.projectRoot, 'view');

// listen port
exports.port = 8888;

// host
exports.host = '192.168.23.1';

// peer path
exports.peerPath = '/peer';
