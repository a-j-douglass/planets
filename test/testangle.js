var math = require('mathjs')
var planets = require('../src/jpldata.js').planets
var angleAtDate = require('../src/jpl.js').angleAtDate

exports.angle_test = function( assert ) {
    console.log((188 / math.PI) * angleAtDate(planets[2], new Date(2015, 4, 15)))
    console.log((188 / math.PI) * angleAtDate(planets[2], new Date(2015, 5, 15)))
    assert.done();
};
