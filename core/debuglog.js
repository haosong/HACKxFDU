/**
 * Created by HDYA-BackFire on 2016-10-15 with IntelliJ IDEA.
 * Part of Project HACKxFDU
 * Make decision and don't look back
 * Like an angel you fly into my world, my snow white queen
 */
'use strict';

var config = require('../config.js');

if(! config.debug) {
    module.exports = function(){};
} else {
    module.exports = function(msg) {
        console.log('[' + new Date().toISOString() + '] ' + msg);
    };
}