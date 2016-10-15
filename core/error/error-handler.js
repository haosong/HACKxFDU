'use strict';

var render = require('../utils/template').render;
var debuglog = require('../debuglog');

// error handler middleware
module.exports = function() {
  return function(err, req, res, next) {
    debuglog(err.stack);

    res.status(500);
    render(res, '500');
  };
};
