/**
 * Created by HDYA-BackFire on 2016-10-16 with IntelliJ IDEA.
 * Part of Project HACKxFDU
 * Make decision and don't look back
 * Like an angel you fly into my world, my snow white queen
 */
$(function(){
    document.title = pp.uri.getQueries().name + ' got ' + pp.uri.getQueries().score + ' point at SlingShot, come and beat him!';
    $('#title').html(pp.uri.getQueries().name + ' got ' + pp.uri.getQueries().score + ' point at SlingShot')
    $('#link').html('Use you computer or Smart TV to visit <a href=http://' + pp.config.host + ':' + pp.config.port + '>here</a> to have a try!');
});