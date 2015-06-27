var math = require('mathjs')
var jplview = require('./jplview.js')
var $ = require('jquery')
var Raphael = require('raphael')
var stateAtDate = require('../src/jpl.js').stateAtDate
var planetAtDate = require('../src/jpl.js').planetAtDate
var datePlusAngle = require('../src/jpl.js').datePlusAngle 
var viewRadius = 500;
var viewAngle = -0.181499134165935;
var date = new Date(Date.now());
var dragState = {laps: 0, startAngle: 0, lastAngle: 0}

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

	function updateWithDate(text, date){
        text.attr('text', dateString(date));
	};


	function dateString(date){
        return ('0' + date.getDate()).slice(-2)
               + ('0' + (date.getMonth() + 1)).slice(-2) +"\n"
               + date.getFullYear();
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

	function angleFromSun(point){
		return Math.atan2(point[1] - 250, point[0] - 250); 
	}

	function drawPlanet(model){
		var point = modelToView(model.planet)

		var color = "#9E9E9E";
		if(model.name == "earth") color = "#266DC9";
		var planet = paper.circle(point[0], point[1], 3).attr({fill: color});
        planet.model = model;

        var update = function(date, circle){
            var newModel = planetAtDate(date, circle.model.data);
            circle.model = newModel;
            var point = modelToView(circle.model.planet);
            circle.attr({cx: point[0], cy: point[1]});
        }

        var move = function(dx, dy){
            var x = this.ox + dx
            var y = this.oy + dy
            var angle = angleFromSun([x,y]);
            if(dragState.lastAngle - angle > (0.8 * 2 * Math.PI)) dragState.laps += 1;
            if(dragState.lastAngle - angle < -(0.8 * 2 * Math.PI)) dragState.laps -= 1;
            var dangle = angle - dragState.startAngle + dragState.laps * 2 * Math.PI
            var dangle = angle - dragState.startAngle + dragState.laps * 2 * Math.PI
            dragState.lastAngle = angle
            dragState.date = datePlusViewAngle(this.model.data, date, dangle)
            updateDateText(dragState.date);
            this.allPlanets.forEach(update.bind(null, dragState.date));
        }
        var start = function(){
            this.ox = this.attr("cx");
            this.oy = this.attr("cy");
            dragState.date = date
            dragState.startAngle = angleFromSun([this.ox,this.oy]);
            this.attr({r: 5});
        } 
        var stop = function(){
            date = dragState.date
            updateDateText(dragState.date);
            this.attr({r: 3});
        }
        planet.drag(move, start, stop);
        return planet;
	}

	function drawPlanets(models){
		return models.map(drawPlanet); 
	}


	var div = $('#paper1');
	var paper = Raphael("paper1");


	paper.setViewBox(0,0, viewRadius, viewRadius, true);
	paper.setSize('100%', '100%');

	var boundary = paper.circle(viewRadius/2, viewRadius/2, viewRadius/2).attr({stroke: "#1E1E1E"});
	var sun = paper.circle(viewRadius/2, viewRadius/2, 3).attr({fill: "yellow", stroke: "yellow", opacity: "0.8"});
	var text = paper.text(viewRadius/2, viewRadius/2, dateString(date)).attr({"font-size": 200, "font-family": "Helvetica", fill: "#282828"});
    var updateDateText =  updateWithDate.bind(null, text);

	var models = stateAtDate(date);

	drawOrbits(models);
	var ps = drawPlanets(models);
    ps.forEach(function(p){ p.allPlanets = ps});
};

main();
