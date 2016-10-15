/**
 * Created by HDYA-BackFire on 2016-10-15 with IntelliJ IDEA.
 * Part of Project HACKxFDU
 * Make decision and don't look back
 * Like an angel you fly into my world, my snow white queen
 */
(function ($, pp) {
    'use strict';

    var id;
    var peer;

    function showQRCode(peerId) {
        var $qrcodeArea = $('#qrcodeArea');
        var $scanNotification = $('#scanNotification');
        var $loadingContent = $('#centerPopup').find('p');
        var uri = 'http://' +
            pp.config.host + ':' +
            pp.config.port +
            pp.config.mobileClientPath +
            '?peer_id=' + encodeURIComponent(peerId);

        console.log(uri);

        // draw qrcode
        $qrcodeArea.qrcode({
            render: 'canvas',
            width: 400,
            height: 400,
            typeNumber: -1,
            correctLevel: 0,
            background: '#ffffff',
            foreground: '#000000',
            text: uri,
        });
        $scanNotification.html($scanNotification.html() + peerId);


        $loadingContent.hide(1000);
        $qrcodeArea.fadeIn(1000);
        $scanNotification.fadeIn(1000);
    }

    function hideLayers() {
        var $shader = $('#shader');
        var $layerWrapper = $('#layerWrapper');
        var $scanNotification = $('#scanNotification');

        $scanNotification.fadeOut(200);
        $scanNotification.html("Mobile Device Connected!");
        $scanNotification.fadeIn(800);

        setTimeout(function () {
            $shader.fadeOut(1000);
            $layerWrapper.fadeOut(1000);
        }, 2000)
    }

    function load(){
        id = pp.utils.generateId();
        peer = pp.peer.createPeer(id);

        showQRCode(id);

        peer.on('connection', function(conn) {
            hideLayers();
            init();
            animate();

            var cameraSpeed = camera.getWorldDirection().multiplyScalar(20);
            var initialAlpha = Math.atan(cameraSpeed.z / cameraSpeed.x) / Math.PI * 180;

            conn.on('data', function(data) {
                // TODO: data
                console.log(data);
                switch (data.event) {
                    case EVENT_SHOOT:
                        data.alpha += initialAlpha;
                        var templateSpeed = Math.cos(data.beta / 180 * Math.PI) * data.speed;
                        var speed = {
                            x: Math.cos(data.alpha / 180 * Math.PI) * templateSpeed,
                            y: Math.sin(data.beta / 180 * Math.PI) * data.speed,
                            z: Math.sin(data.alpha / 180 * Math.PI) * templateSpeed,
                        };
                        console.log(speed);
                        AddBullet(camera.position, speed);
                        break;
                    default:
                        break;
                }
            });
        });
    }

    $(function() {
        if (pp.utils.hasWebRTC()) {
            load();
        }
        // here goes fallbacks on web rtc not support
        else {
            // TODO
            alert("Sorry, no WebRTC support found");
        }
    });

})(jQuery, window.pp);
