jsc = require('jsverify')
jplview = require('../src/jplview.js')
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

