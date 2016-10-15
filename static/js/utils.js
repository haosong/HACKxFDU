/**
 * Created by HDYA-BackFire on 2016-10-15 with IntelliJ IDEA.
 * Part of Project HACKxFDU
 * Make decision and don't look back
 * Like an angel you fly into my world, my snow white queen
 */
(function($, pp) {
    var PATT_IPV4 = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    var PATT_IPV6 = /[a-f0-9]{0,4}:[a-f0-9]{0,4}:.*/;

    // peer
    pp.peer = {};

    pp.peer.createPeer = function(id) {
        var peer = new Peer(id, {
            host: pp.config.host,
            port: pp.config.port,
            path: pp.config.peerPath,
        });

        return peer;
    };

    // some utils
    pp.utils = {};

    // generate id
    pp.utils.generateId = function() {
        var date = new Date();
        return '' + parseInt(Math.random() * 100000);
        // return '' + date.getTime() + '-' + parseInt(Math.random() * 100000);
    };

    // test if the client support the web rtc
    pp.utils.hasWebRTC = function hasWebRTC() {
        var RTCPeerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

        return RTCPeerConnection ? true : false;
    };

    // uri helpers
    pp.uri = {};

    pp.uri.parseURI = function parseURI(text) {
        // parseUri 1.2.2
        // (c) Steven Levithan <stevenlevithan.com>
        // MIT License

        function parseUri (str) {
            var o   = parseUri.options,
                m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
                uri = {},
                i   = 14;

            while (i--) uri[o.key[i]] = m[i] || "";

            uri[o.q.name] = {};
            uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
                if ($1) uri[o.q.name][$1] = $2;
            });

            return uri;
        };

        parseUri.options = {
            strictMode: false,
            key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
            q: {
                name:   "queryKey",
                parser: /(?:^|&)([^&=]*)=?([^&]*)/g
            },
            parser: {
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
            }
        };

        return parseUri(text);
    };

    pp.uri.getQueries = function getQueries() {
        return this.parseURI(window.location.href).queryKey;
    };
})(jQuery, window.pp);
