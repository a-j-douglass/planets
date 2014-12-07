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

	function viewScale(point) {
		var scale = viewRadius / 80;
		return point.map(function(n) {return n * scale;});
	};

	function viewInvert(point) {
		return [point[0], -point[1]];
	};

	function centerPoint(point) {
		return point.map(function(n) {return n + viewRadius/2;});
	}

	function projectFlat(point) {
		return point.slice(0, 2);
	}

	function pointToView(point){
		return centerPoint(viewScale(logScale(viewInvert(projectFlat(point)))));
		//return centerPoint(viewScale(projectFlat(point)));
	}

	function pointsToView(points){
		return points.map(pointToView)
	}

	function drawOrbit(model){
		paper.path(toPathString(pointsToView(model.orbit))).attr({stroke: "blue"});
	}

	function drawOrbits(models){
		models.forEach(drawOrbit); 
	}

	function drawPlanet(model){
		var point = pointToView(model.planet)
		paper.circle(point[0], point[1], 3).attr({fill: "blue"});
	}

	function drawPlanets(models){
		models.forEach(drawPlanet); 
	}

	var div = $('#paper1');
	var paper = Raphael("paper1");

	var viewRadius = 500;

	paper.setViewBox(0,0, viewRadius, viewRadius, true);
	paper.setSize('100%', '100%');

	var boundary = paper.circle(viewRadius/2, viewRadius/2, viewRadius/2);
	var sun = paper.circle(viewRadius/2, viewRadius/2, 3).attr({fill: "blue"});

	var models = computeAll();

	drawOrbits(models);
	drawPlanets(models);
};

main();
