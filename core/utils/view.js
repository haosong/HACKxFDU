/**
 * Created by HDYA-BackFire on 2016-10-15 with IntelliJ IDEA.
 * Part of Project HACKxFDU
 * Make decision and don't look back
 * Like an angel you fly into my world, my snow white queen
 */
'use strict';

var render = require('./template').render;

// a shortcut to call a static web page
var staticPage;
exports.staticPage = staticPage = function(url, page) {
    app.get(url, function(req, res) {
        render(res, page);
    });
};