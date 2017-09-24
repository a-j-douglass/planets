var math = require('math')
var numeric = require('numeric')
var positionAtDate = require('./jpl.js').positionAtDate

function sqr(x){
    return x * x;
}

function toRadians(degrees) {
	return math.PI * degrees / 180;
};

function modRadians(angle) {
    var result = angle;
	while(result > math.PI) {result -= math.PI * 2}
	while(result < -math.PI) {result += math.PI * 2}
	return result;
};

function logScale(point) {
    var x = point[0];
    var y = point[1];
    var magnitude = math.sqrt(x * x + y * y);

    var newMagnitude = math.log(magnitude + 1) * 10;
    var s = magnitude == 0 ? 0 : newMagnitude/magnitude;

    return scale(s, point);
};

function logScale_i(point) {
    var x = point[0];
    var y = point[1];
    var magnitude = math.sqrt(x * x + y * y);

    var newMagnitude = math.pow(math.e, magnitude / 10) - 1;
    var s = magnitude == 0 ? 0 : newMagnitude/magnitude;

    return scale(s, point);
};

function rotate(angle, point) {
    return [math.cos(angle) * point[0] - math.sin(angle) * point[1],
            math.sin(angle) * point[0] + math.cos(angle) * point[1]]
};


function viewRotate(point) {
    //var angle = 0.1722738292751436;
    //var dx = 250 - 257.72523964215253;
    //var dy = 250 - 207.90489755492604;
    //var angle = math.atan(dx/dy);
    var angle = -0.181499134165935;
    return rotate(angle, point);
};

function viewRotate_i(point) {
    var angle = 0.181499134165935;
    return rotate(angle, point);
};

function viewScale(point) {
    var s= viewRadius / 80;
    return scale(s, point);
};

function viewScale_i(point) {
    var s = 80 / viewRadius;
    return scale(s, point);
};

function scale(s, point) {
    return point.map(function(n) {return n * s;});
};

function viewInvert(point) {
    return [-point[0], -point[1]];
};

function centerPoint(viewRadius, point) {
    return point.map(function(n) {return n + viewRadius/2;});
}

function centerPoint_i(viewRadius, point) {
    return point.map(function(n) {return n - viewRadius/2;});
}

function projectFlat(point) {
    return point.slice(0, 2);
}

function modelToView(size, angle, point){
    return centerPoint(size, rotate(angle, scale(size/80, logScale(viewInvert(point)))));
}

function viewToModel(size, angle, point) {
    return viewInvert(logScale_i(scale(80/size, rotate(-angle, centerPoint_i(size, point)))));
}

function pointsToView(points){
    return points.map(modelToView)
}

function dateToViewAngle(planet, date){
    var viewRadius = 500;
    var viewAngle = -0.181499134165935;
    var point = modelToView(viewRadius, viewAngle, positionAtDate(planet, date));
    return math.atan2(point[1] - 250, point[0] - 250);
}

datePlusViewAngle = function (planet, date, angle){
    var startAngle = dateToViewAngle(planet, date);
    var scale = 3155692597470;
    var targetAngle = startAngle + angle

    var adjust = 0;
    if(modRadians(targetAngle) > math.PI /2) adjust = - math.PI /2;
    if(modRadians(targetAngle) < -math.PI /2) adjust = math.PI /2;

    var centuries = angle / toRadians(planet.delta.mean_long)

    var guess = date.valueOf() + (centuries * scale)

    var fmin = function(x) {
        return sqr(modRadians(targetAngle + adjust - modRadians(dateToViewAngle(planet, new Date(x[0] * scale)) + adjust)))
    }

    var result = numeric.uncmin(fmin, [guess / scale]);
    return new Date(result.solution * scale);
}


module.exports = { 
    viewInvert: viewInvert,
    centerPoint: centerPoint,
    centerPoint_i: centerPoint_i,
    scale: scale,
    logScale: logScale,
    logScale_i: logScale_i,
    modelToView: modelToView,
    viewToModel: viewToModel,
    datePlusViewAngle: datePlusViewAngle,
    rotate: rotate
}
