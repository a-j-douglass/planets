var math = require('mathjs')
var jplview = require('./jplview.js')
var viewRadius = 500;
var viewAngle = -0.181499134165935;

var modelToView = jplview.modelToView.bind(null, viewRadius, viewAngle)
var viewToModel = jplview.viewToModel.bind(null, viewRadius, viewAngle)


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

	function projectFlat(point) {
		return point.slice(0, 2);
	}

	function pointsToView(points){
		return points.map(modelToView)
	}

	function drawOrbit(model){
		paper.path(toPathString(pointsToView(model.orbit))).attr({stroke: "#4E4E4E"});
	}

	function drawOrbits(models){
		models.forEach(drawOrbit); 
	}

	function drawPlanet(model){
		var point = modelToView(model.planet)

		var color = "#9E9E9E";
		if(model.name == "earth") color = "#266DC9";
		var planet = paper.circle(point[0], point[1], 3).attr({fill: color});
        planet.model = model;


        var move = function(dx, dy){
            console.log("move dx " + dx + ' dy ' + dy )
            var x = this.ox + dx
            var y = this.oy + dy
            var angle = Math.atan((y - 250) / (x - 250))
            console.log('angle', (180 / Math.PI) *angle)
            this.attr({cx: x, cy: y});
        }
        var start = function(){
            console.log(this)
            console.log("planet", this.model.planet)
            console.log((180 / Math.PI) * this.model.elements.eccentric_anomaly)
            this.ox = this.attr("cx");
            this.oy = this.attr("cy");
            console.log("inverse", viewToModel([this.ox, this.oy]))
            console.log("start x " + this.ox + ' y ' + this.oy)
        } 
        var stop = function(){
            this.transform("s1")
            console.log("stop")
        }
        planet.drag(move, start, stop);
	}

	function drawPlanets(models){
		models.forEach(drawPlanet); 
	}

    var $ = require('jquery')
    var Raphael = require('raphael')
    var stateNow = require('./jpl.js').stateNow

	var div = $('#paper1');
	var paper = Raphael("paper1");


	paper.setViewBox(0,0, viewRadius, viewRadius, true);
	paper.setSize('100%', '100%');

	var boundary = paper.circle(viewRadius/2, viewRadius/2, viewRadius/2).attr({stroke: "#1E1E1E"});;
	var sun = paper.circle(viewRadius/2, viewRadius/2, 3).attr({fill: "yellow", stroke: "yellow", opacity: "0.8"});


	var models = stateNow();

	drawOrbits(models);
	drawPlanets(models);
};

main();
