var div = $('#paper1');
var paper = Raphael("paper1");

var viewRadius = 500;

paper.setViewBox(0,0, viewRadius, viewRadius, true);
paper.setSize('100%', '100%');

var boundary = paper.circle(viewRadius/2, viewRadius/2, viewRadius/2);
//var sun = paper.circle(width/2, height/2, 10).attr({fill: "yellow"});

var mercury = {
	semimajor: 0.387,
	semiminor: 0.371,
	matrix: math.matrix([[0.2121112069585902,-0.9738769422244237],[0.9714379096251882,0.21915471285651017]]) 
}

var venus = {
	semimajor: 0.720,
	semiminor: 0.720,
	matrix: math.matrix([[-0.6693586501781152,-0.7428167134218309],[0.742172555692515,-0.6677316934713341]])
}

var earth = {
	semimajor: 1.00,
	semiminor: 1.00,
	matrix: math.matrix([[-0.2249510543438648,-0.9743700647852352],[0.9743700647852352,-0.2249510543438648]])
}

var mars = {
	semimajor: 1.52,
	semiminor: 1.51,
	matrix: math.matrix([[0.9134500769497048,0.40641256728253994],[-0.4068487150108243,0.9131646698736894]])
}

var jupiter = {
	semimajor: 5.20,
	semiminor: 5.19,
	matrix: math.matrix([[0.9668266937439053,-0.2553959966727278],[0.25542875446738095,0.9665673890987301]])
}

var saturn = {
	semimajor: 9.54,
	semiminor: 9.51,
	matrix: math.matrix([[-0.04152145079561657,-0.9989825912366544],[0.9983272772846056,-0.04219063537084038]])
}

var uranus = {
	semimajor: 19.2,
	semiminor: 19.2,
	matrix: math.matrix([[-0.9876854293280716,-0.15641005042117037],[0.1564447532399273,-0.9876020611605455]])
}

var neptune = {
	semimajor: 30.1,
	semiminor: 30.1,
	matrix: math.matrix([[0.7071234900839468,-0.7067879564313724],[0.7070882240759869,0.7067526904234127]])
}


var pluto = {
	semimajor: 39.4,
	semiminor: 37.0,
	matrix: math.matrix([[-0.7254895279881566,0.6808458560087125],[-0.6777621326061852,-0.6813902287806027]])
}

var planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto];

drawOrbits(planets);


function drawOrbits(planets){
	planets.forEach(drawOrbit)
}

function drawOrbit(orbit){
	paper.path(toPathString(getPoints(orbit))).attr({stroke: "blue"});
}


function toPathString(points){
	result = "M" + toPointString(points[0]);
	for(i = 1; i < points.length; ++i) {
		result += "L" + toPointString(points[i]);
	}
	result += "L" + toPointString(points[0]);
	return result;
}

function toPointString(point){
	var x = point.subset(math.index(0, 0))
	var y = point.subset(math.index(1, 0))

	return x + "," + y + " ";
}

function getPoints(orbit){
	var n_points = 100;
	var points = [];
	for(i = 0; i < n_points; ++i) {
		angle = (i/n_points) * 2 * Math.PI;
		points[points.length] = getPoint(angle, orbit);
	}
	return points;
}

function getPoint(angle, orbit) {
	var unitPoint = math.matrix([[orbit.semimajor * Math.cos(angle)],[orbit.semiminor * Math.sin(angle)]]);
	var orbitPoint = math.multiply(orbit.matrix, unitPoint);

	return centerPoint(viewScale(logScale(orbitPoint)));
}

function logScale(point) {
	var x = point.subset(math.index(0, 0))
	var y = point.subset(math.index(1, 0))
	var magnitude = math.sqrt(x * x + y * y)

	var newMagnitude = math.log(magnitude + 1) * 10;
	var scale = newMagnitude/magnitude;

	return math.multiply(scale, point);
}

function viewScale(orbitPoint) {
	var scale = viewRadius / 80;
	return math.multiply(scale, orbitPoint);
}

function centerPoint(viewPoint) {
	var center = math.matrix([[viewRadius/2],[viewRadius/2]]);
	return math.add(center, viewPoint);
}

