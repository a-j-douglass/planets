var div = $('#paper1');
var paper = Raphael("paper1");

var viewRadius = 500;

paper.setViewBox(0,0, viewRadius, viewRadius, true);
paper.setSize('100%', '100%');

var boundary = paper.circle(viewRadius/2, viewRadius/2, viewRadius/2);
//var sun = paper.circle(width/2, height/2, 10).attr({fill: "yellow"});
drawOrbits(planets);


function drawOrbits(planets){
	planets.forEach(drawOrbit)
}

function drawOrbit(orbit){
	paper.path(toPathString(getPoints(orbit))).attr({stroke: "blue"});
	planetPoint = getPlanetPoint(orbit, 0);
	drawPlanet(planetPoint);
	//planetPoint2 = getPlanetPoint(orbit, math.pi);
	//drawPlanet(planetPoint2);
}

function drawPlanet(point)
{
	var x = point.subset(math.index(0, 0))
	var y = point.subset(math.index(1, 0))
	paper.circle(x, y, 3).attr({fill: "blue"});
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
	var unitPoint = math.matrix([[orbit.semimajor * Math.cos(angle)],[-orbit.semiminor * Math.sin(angle)]]);
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

function getPlanetPoint(orbit, offset){
	var J2000 = new Date(2000, 1, 1, 12, 0, 0, 0);
 	var millis = (Date.now() - J2000);
 	var centuries = millis / 3155692597470;
	var angle = orbit.base_angle + centuries * orbit.angle_rate + offset;

 return getPoint(orbit.base_angle, orbit); 
}

