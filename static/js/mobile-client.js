/**
 * Created by HDYA-BackFire on 2016-10-15 with IntelliJ IDEA.
 * Part of Project HACKxFDU
 * Make decision and don't look back
 * Like an angel you fly into my world, my snow white queen
 */
(function ($, pp) {

    'use strict';

    var $state;
    var id;
    var peer, conn, peerId;

    var MotionUpdateThreshold = 500;
    var ZAxisAccelerationThreshold = 2.5;

    var defaultControlBlockLeft;
    var defaultControlBlockTop = 50;

    var ControlBlockDefaultRecoverSpeed = 20;
    var ControlBlockHorizontalMovementThreshold = 1;

    $(function () {
        $state = $('#state');
        if (pp.utils.hasWebRTC()) {
            load();
        } else {
            $state = $('你当前的浏览器不支持WebRTC');
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
        conn.on('open', function () {
            setState('Player Connected: ' + peerId);
            process();
        });
    }

    function process() {
        // Initial position
        var initialDeviceOrientationAlpha;
        // position
        var deviceOrientationAlpha, deviceOrientationBeta;
        // acceleration
        var alphaRate, betaRate, gammaRate;
        var rotateInited = false;

        // Control block position
        var controlX, controlY;

        var motionLastUpdate = 0;

        var sendEvent = function(eventType, para1, para2, para3) {
            console.log('[INFO]' + new Date().toISOString() + ' '+ eventType + ' ' + para1 + ' ' + para2 + ' ' + para3);
            conn.send(ConnectionBean(eventType, para1, para2, para3));
        };

        $('#reset').click(function () {
            rotateInited = false;
        });

        /* Orientation */
        $(window).on('deviceorientation', function (e) {
            var o = e.originalEvent;

            deviceOrientationAlpha = o.alpha;
            deviceOrientationBeta = o.beta;

            if (!rotateInited) {
                rotateInited = true;
                initialDeviceOrientationAlpha = deviceOrientationAlpha;
            }
        });

        /* Jump */
        /*
        $(window).on('devicemotion', function (e) {
            var m = e.originalEvent;

            if ((new Date().getTime() - motionLastUpdate > MotionUpdateThreshold) && (m.acceleration.z > ZAxisAccelerationThreshold)) {
                sendEvent(EVENT_JUMP);
            }
        });

        /* Control block */
        var controlBlock = document.getElementById('control');
        defaultControlBlockLeft = (document.body.clientWidth - controlBlock.scrollWidth) >> 1;
        controlBlock.style.display = "none";

        function resetControlBlock() {
            var currentControlBlockLeft = controlBlock.offsetLeft;
            var currentControlBlockTop = controlBlock.offsetTop;

            var deltaLeft = defaultControlBlockLeft - currentControlBlockLeft;
            var deltaTop = defaultControlBlockTop - currentControlBlockTop;

            var distance = Math.sqrt((deltaLeft * deltaLeft) + (deltaTop * deltaTop));
            var increaseLeft = ControlBlockDefaultRecoverSpeed * deltaLeft / distance;
            var increaseTop = ControlBlockDefaultRecoverSpeed * deltaTop / distance;

            var interval = setInterval(function () {
                controlBlock.style.left = controlBlock.offsetLeft + increaseLeft + 'px';
                controlBlock.style.top = controlBlock.offsetTop + increaseTop + 'px';

                if (((defaultControlBlockLeft > currentControlBlockLeft) ^ (controlBlock.offsetLeft <= defaultControlBlockLeft))
                    || (defaultControlBlockTop > currentControlBlockTop) ^ (controlBlock.offsetTop <= defaultControlBlockTop)) {
                    controlBlock.style.left = defaultControlBlockLeft + "px";
                    controlBlock.style.top = defaultControlBlockTop + "px";
                    clearInterval(interval);
                }
            }, 1);

            return {
                0: deltaLeft,
                1: deltaTop,
                2: distance,
            }
        }

        resetControlBlock();
        controlBlock.style.display = "block";

        var emptyListener = function(e) {
            e.preventDefault();
        };

        document.addEventListener("touchmove", emptyListener, false);

        controlBlock.addEventListener("touchstart", function (e) {
            console.log(e);
            var touches = e.touches[0];
            controlX = touches.clientX - controlBlock.offsetLeft;
            controlY = touches.clientY - controlBlock.offsetTop;
            // document.addEventListener("touchmove", emptyListener, false);
        }, false);

        controlBlock.addEventListener("touchmove", function (e) {
            var touches = e.touches[0];
            var oLeft = touches.clientX - controlX;
            var oTop = touches.clientY - controlY;
            if (oLeft < 0) {
                oLeft = 0;
            } else if (oLeft > document.documentElement.clientWidth - controlBlock.offsetWidth) {
                oLeft = (document.documentElement.clientWidth - controlBlock.offsetWidth);
            }
            if (oTop < defaultControlBlockTop + ControlBlockHorizontalMovementThreshold) {
                oTop = defaultControlBlockTop + ControlBlockHorizontalMovementThreshold;
            }
            controlBlock.style.left = oLeft + "px";
            controlBlock.style.top = oTop + "px";
        }, false);

        controlBlock.addEventListener("touchend", function () {
            // document.removeEventListener("touchmove", emptyListener, false);

            var deltaData = resetControlBlock();

            var controlOrientation = Math.atan(deltaData[0] / (-deltaData[1])) / Math.PI * 180;
            var deviceOrientation = initialDeviceOrientationAlpha - deviceOrientationAlpha;
            sendEvent(EVENT_SHOOT, (controlOrientation + deviceOrientation), deviceOrientationBeta, deltaData[2] * 0.01);
        }, false);
    }
})(jQuery, window.pp);
