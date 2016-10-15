/**
 * Created by HDYA-BackFire on 2016-10-15 with IntelliJ IDEA.
 * Part of Project HACKxFDU
 * Make decision and don't look back
 * Like an angel you fly into my world, my snow white queen
 */

var EVENT_EMPTY, EVENT_JUMP, EVENT_MOVE, EVENT_SHOOT;

EVENT_EMPTY = EVENT_EMPTY = 0;
EVENT_SHOOT = EVENT_SHOOT = 1;
EVENT_MOVE = EVENT_MOVE = 2;
EVENT_JUMP = EVENT_JUMP = 3;

var MOVE_LEFT, MOVE_RIGHT, MOVE_FORWARD, MOVE_BACK;

MOVE_FORWARD = MOVE_FORWARD = 0;
MOVE_BACK = MOVE_BACK = 1;
MOVE_LEFT = MOVE_LEFT = 2;
MOVE_RIGHT = MOVE_RIGHT = 3;

function ConnectionBean(event, additionalInfo1, additionalInfo2, additionalInfo3) {
    obj = {};
    obj.event = event;
    if (event == EVENT_SHOOT) {
        obj.alpha = additionalInfo1;
        obj.beta = additionalInfo2;
        obj.speed = additionalInfo3;
    } else if (event == EVENT_MOVE) {
        obj.direction = additionalInfo1;
    }
    return obj;
};
