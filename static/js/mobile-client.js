/**
 * Created by HDYA-BackFire on 2016-10-15 with IntelliJ IDEA.
 * Part of Project HACKxFDU
 * Make decision and don't look back
 * Like an angel you fly into my world, my snow white queen
 */
(function($, pp){

    'use strict';

    var $state;
    var id;
    var peer, conn, peerId;

    $(function() {
        $state = $('#state');

        if(pp.utils.hasWebRTC()) {
            load();
        } else {
            $state = $('WebRTC is not supported , consider using Chrome');
        }
    });

    function setState(text) {
        $state.html(text);
    }

    function load() {
        try {
            peerId = pp.uri.getQueries().peer_id;

            id = pp.utils.generateId();
            peer = pp.peer.createPeer(id);
            conn = peer.connect(peerId);
        } catch (e) {
            setState(e.message);
        }
        conn.on('open', function() {
            setState('Player Connected: ' + peerId);
            process();
        });
    }

    function process() {

    }

})(jQuery, window.pp);
