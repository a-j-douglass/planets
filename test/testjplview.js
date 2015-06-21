math = require('mathjs')
jsc = require('jsverify')
positionAtDate = require('../src/jpl.js').positionAtDate
jplview = require('../src/jplview.js')
var planets = require('../src/jpldata.js').planets
console.log(jplview)
viewInvert = jplview.viewInvert
scale = jplview.scale
logScale = jplview.logScale
logScale_i = jplview.logScale_i
centerPoint = jplview.centerPoint
centerPoint_i = jplview.centerPoint_i
rotate = jplview.rotate
modelToView = jplview.modelToView
viewToModel = jplview.viewToModel

logf = function(f){
    return function() {
        var y = f(arguments)
        console.log("f of " + arguments +  " is " + y);
        return y;
    }
}

round6 = function(x){
    return parseFloat(x.toFixed(6));
}

exports.exampletest = function( assert ) {
    var boolFnAppliedThrice =
      jsc.forall("bool -> bool", "bool", function (f, b) {
        return f(f(f(b))) === f(b);
      });

    jsc.assert(boolFnAppliedThrice);
    assert.done();
};

exports.inverse = function( assert ) {
    var roundtrip = function(x){return viewInvert(viewInvert(x));}
    var roundtriptest =
      jsc.forall("number", "number", function (x, y) {
        var result = roundtrip([x,y]);
        return x == result[0] && y == result[1];
      });

    jsc.assert(roundtriptest);
    assert.done();
};

exports.scale = function( assert ) {
    var roundtrip = function(s, x){return s == 0 ? x  : scale(1/s, scale(s, x));}
    var roundtriptest =
      jsc.forall("number", "number", "number", function (s, x, y) {
        var result = roundtrip(s, [x,y]);
        return x.toFixed(6) == result[0].toFixed(6) && y.toFixed(6) == result[1].toFixed(6);
      });

    jsc.assert(roundtriptest);
    assert.done();
};

exports.logscale = function( assert ) {
    var roundtrip = function(x){return logScale_i(logScale(x));}
    var roundtriptest =
      jsc.forall("number", "number", function (x, y) {
        var result = roundtrip([x,y]);
        return x.toFixed(6) == result[0].toFixed(6) && y.toFixed(6) == result[1].toFixed(6);
      });

    jsc.assert(roundtriptest);
    assert.done();
};

exports.center = function( assert ) {
    var roundtrip = function(o, x){return centerPoint_i(o, centerPoint(o, x));}
    var roundtriptest =
      jsc.forall("number", "number", "number", function (o, x, y) {
        var result = roundtrip(o, [x,y]);
        return x.toFixed(6) == result[0].toFixed(6) && y.toFixed(6) == result[1].toFixed(6);
      });

    jsc.assert(roundtriptest);
    assert.done();
};

exports.rotate = function( assert ) {
    var roundtrip = function(a, x){return rotate(-a, rotate(a, x));}
    var roundtriptest =
      jsc.forall("number", "number", "number", function (a, x, y) {
        var result = roundtrip(a, [x,y]);
        return x.toFixed(6) == result[0].toFixed(6) && y.toFixed(6) == result[1].toFixed(6);
      });

    jsc.assert(roundtriptest);
    assert.done();
};

exports.whole = function( assert ) {
    var roundtrip = function(x){return modelToView(500, 0.1, viewToModel(500, 0.1, x));}
    var roundtriptest =
      jsc.forall("number", "number", function (x, y) {
        var result = roundtrip([x,y]);
        return round6(x) == round6(result[0]) && round6(y) == round6(result[1]);
      });

    jsc.assert(roundtriptest);
    assert.done();
};

exports.angle_test = function( assert ) {
    var viewRadius = 500;
    var viewAngle = -0.181499134165935;
    var date1 = new Date(2015, 4, 15)
    var date2 = new Date(2015, 5, 15)
    var p1 = modelToView(viewRadius, viewAngle, positionAtDate(planets[2], date1));
    console.log('p1 ' + p1)
    var a1 = math.atan2(p1[1], p1[0])
    var p2 = modelToView(viewRadius, viewAngle, positionAtDate(planets[2], date2));
    console.log('p2 ' + p2)
    var a1 = math.atan2(p1[1] - 250, p1[0] - 250)
    var a2 = math.atan2(p2[1] - 250, p2[0] -250)
    var da = a2 - a1;
    console.log('date1 ' + date1)
    console.log('date2 ' + date2)
    console.log('angle1 ' + (180 / math.PI) *a1  + ' angle2 ' +(180 / math.PI) * a2 + ' d angle ' + (180 / math.PI) * da)
    var result = datePlusViewAngle(planets[2], date1, da)
    console.log('new date ' + result)
    var error = (date2 - result)
    console.log('error ' + error)
    assert.ok(math.abs(error) < 1000, "error was too big")
    assert.done();
};
