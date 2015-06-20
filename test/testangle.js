var math = require('mathjs')
var numeric = require('numeric')
var planets = require('../src/jpldata.js').planets
var angleAtDate = require('../src/jpl.js').angleAtDate
var stateAtDate = require('../src/jpl.js').stateAtDate

toDeg = function(radians){
    return(180 / math.PI) * radians;
}

toRad = function(radians){
    return (math.PI / 180) * radians;
}

sqr = function(x){
    return x * x;
}

logf = function(f){
    return function(x) {
        var y = f(x);
        console.log("f of " + x +  " is " + y);
        return y;
    }
}


datePlusAngle = function (planet, date, angle){
    var startAngle = angleAtDate(planet, date)
    var scale = 3155692597470;
    var targetAngle = startAngle + angle
    var centuries = angle / toRad(planet.delta.mean_long)

    var guess = date.valueOf() + (centuries * scale)

    var fmin = function(x) {
        return sqr(targetAngle - angleAtDate(planet, new Date(x[0] * scale)))
    }

    var result = numeric.uncmin(fmin, [guess / scale]);
    return new Date(result.solution * scale);
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
