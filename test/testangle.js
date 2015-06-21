var math = require('mathjs')
var planets = require('../src/jpldata.js').planets
var angleAtDate = require('../src/jpl.js').angleAtDate
var stateAtDate = require('../src/jpl.js').stateAtDate
var datePlusAngle = require('../src/jpl.js').datePlusAngle

toDeg = function(radians){
    return(180 / math.PI) * radians;
}

toRad = function(radians){
    return (math.PI / 180) * radians;
}
logf = function(f){
    return function(x) {
        var y = f(x);
        console.log("f of " + x +  " is " + y);
        return y;
    }
}

exports.angle_test = function( assert ) {
    var date1 = new Date(2015, 4, 15)
    var date2 = new Date(2015, 5, 15)
    var a1 = angleAtDate(planets[2], date1)
    var a2 = angleAtDate(planets[2], date2)
    var da = a2 - a1;
    var result = datePlusAngle(planets[2], date1, da)
    var error = (date2 - result)
    assert.ok(error < 1000, "error")
    assert.done();
};
