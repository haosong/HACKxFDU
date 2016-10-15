/**
 * Created by HDYA-BackFire on 2016-10-15 with IntelliJ IDEA.
 * Part of Project HACKxFDU
 * Make decision and don't look back
 * Like an angel you fly into my world, my snow white queen
 */
'use strict';

var config = require('../../config');
var _ = require('underscore');

// render
var render;
exports.render = render = function(res, view, locals, cb) {
    locals = locals || {};
    locals = _.extend(locals, {
    });

    res.render(view, locals, cb);
};
