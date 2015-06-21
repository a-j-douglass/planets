var math = require('mathjs')
var jplview = require('./jplview.js')
var $ = require('jquery')
var Raphael = require('raphael')
var stateAtDate = require('../src/jpl.js').stateAtDate
var planetAtDate = require('../src/jpl.js').planetAtDate
var datePlusAngle = require('../src/jpl.js').datePlusAngle 
var viewRadius = 500;
var viewAngle = -0.181499134165935;
var date = Date.now();

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
            var x = this.ox + dx
            var y = this.oy + dy
            var angle = Math.atan2(y - 250, x - 250)
            //console.log('angle', (180 / Math.PI) *angle)
            var dangle = angle - this.angle
            console.log('angle' + (180 / Math.PI) * angle + ' dangle '+ (180 / Math.PI) * dangle)
            var newDate = datePlusViewAngle(this.model.data, date, dangle)
            console.log('new date', newDate)
            var newModel = planetAtDate(newDate, this.model.data);
            this.model = newModel;
            var point = modelToView(this.model.planet);
            console.log('new point', point)
            this.attr({cx: point[0], cy: point[1]});
        }
        var start = function(){
            console.log(this)
            //console.log("planet", this.model.planet)
            //console.log("angle", (180 / Math.PI) * this.model.elements.eccentric_anomaly)
            this.ox = this.attr("cx");
            this.oy = this.attr("cy");
            //console.log("inverse", inverse)
            this.angle = Math.atan2(this.oy - 250, this.ox - 250)
            //console.log("inverse angle", (180 / Math.PI) * this.angle)
            console.log("start x " + this.ox + ' y ' + this.oy)
            console.log('angle' + (180 / Math.PI) * this.angle)
            this.attr({r: 5});
        } 
        var stop = function(){
            console.log("stop")
            this.attr({r: 3});
        }
        planet.drag(move, start, stop);
	}

	function drawPlanets(models){
		models.forEach(drawPlanet); 
	}


	var div = $('#paper1');
	var paper = Raphael("paper1");


	paper.setViewBox(0,0, viewRadius, viewRadius, true);
	paper.setSize('100%', '100%');

	var boundary = paper.circle(viewRadius/2, viewRadius/2, viewRadius/2).attr({stroke: "#1E1E1E"});;
	var sun = paper.circle(viewRadius/2, viewRadius/2, 3).attr({fill: "yellow", stroke: "yellow", opacity: "0.8"});


	var models = stateAtDate(date);

	drawOrbits(models);
	drawPlanets(models);
};

main();
