var math = require('math')

function main(){

	function toPointString(point){
		return point[0] + "," + point[1] + " ";
	};

	function toPathString(points){
		result = "M" + toPointString(points[0]);
		for(i = 1; i < points.length; ++i) {
			result += "L" + toPointString(points[i]);
		}
		result += "L" + toPointString(points[0]);
		return result;
	};

	function logScale(point) {
		var x = point[0];
		var y = point[1];
		var magnitude = math.sqrt(x * x + y * y);

		var newMagnitude = math.log(magnitude + 1) * 10;
		var scale = newMagnitude/magnitude;

		return point.map(function(n) {return n * scale;});
	};

	function rotate(point, angle) {
		return [math.cos(angle) * point[0] - math.sin(angle) * point[1],
				math.sin(angle) * point[0] + math.cos(angle) * point[1]]
	};


	function viewRotate(point) {
		//var angle = 0.1722738292751436;
		//var dx = 250 - 257.72523964215253;
		//var dy = 250 - 207.90489755492604;
		//var angle = math.atan(dx/dy);
		var angle = -0.181499134165935;
		return rotate(point, angle);
	};

	function viewScale(point) {
		var scale = viewRadius / 80;
		return point.map(function(n) {return n * scale;});
	};

	function viewInvert(point) {
		return [-point[0], -point[1]];
	};

	function centerPoint(point) {
		return point.map(function(n) {return n + viewRadius/2;});
	}

	function projectFlat(point) {
		return point.slice(0, 2);
	}

	function pointToView(point){
		return centerPoint(viewRotate(viewScale(logScale(viewInvert(projectFlat(point))))));
	}

	function pointsToView(points){
		return points.map(pointToView)
	}

	function drawOrbit(model){
		paper.path(toPathString(pointsToView(model.orbit))).attr({stroke: "#4E4E4E"});
	}

	function drawOrbits(models){
		models.forEach(drawOrbit); 
	}

	function drawPlanet(model){
		var point = pointToView(model.planet)

		var color = "#9E9E9E";
		if(model.name == "earth") color = "#266DC9";
		var planet = paper.circle(point[0], point[1], 3).attr({fill: color});
	}

	function drawPlanets(models){
		models.forEach(drawPlanet); 
	}

    var $ = require('jquery')
    var Raphael = require('raphael')
    var computeAll = require('./jpl.js')

	var div = $('#paper1');
	var paper = Raphael("paper1");

	var viewRadius = 500;

	paper.setViewBox(0,0, viewRadius, viewRadius, true);
	paper.setSize('100%', '100%');

	var boundary = paper.circle(viewRadius/2, viewRadius/2, viewRadius/2).attr({stroke: "#1E1E1E"});;
	var sun = paper.circle(viewRadius/2, viewRadius/2, 3).attr({fill: "yellow", stroke: "yellow", opacity: "0.8"});


	var models = computeAll();

	drawOrbits(models);
	drawPlanets(models);
};

main();
