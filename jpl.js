function toRadians(degrees) {
	return math.pi * degrees / 180;
};

function modRadians(angle) {
	while(angle > math.pi) {angle = angle - math.pi * 2}
	while(angle < -math.pi) {angle = angle + math.pi * 2}
	return angle;
};

function orbitPoint(angle, elements) {
	function orbitX(angle, elements) {
		return elements.semimajor * (math.cos(angle) - elements.eccentricity);
	};

	 function orbitY(angle, elements) {
		return elements.semimajor * math.sqrt(1 - elements.eccentricity * elements.eccentricity) * math.sin(angle);
	};

	return [ orbitX(angle, elements),
			 orbitY(angle, elements),
			 0];
};


function eclipticPoint(angle, elements) {
	function eclipticX(orbitPoint, elements){
		return elements.eclipticXX * orbitPoint[0] + elements.eclipticXY * orbitPoint[1]; 
	};
	function eclipticY(orbitPoint, elements){
		return elements.eclipticYX * orbitPoint[0] + elements.eclipticYY * orbitPoint[1];
	};
	function eclipticZ(orbitPoint, elements){
		return elements.eclipticZX * orbitPoint[0] + elements.eclipticZY * orbitPoint[1];
	};

	var point = orbitPoint(angle, elements);
	return [ eclipticX(point, elements),
			 eclipticY(point, elements),
			 eclipticZ(point, elements)]
};

function computePlanet(elements){
	return eclipticPoint(elements.eccentric_anomaly, elements);
};


function atDate(data, centuries) {
	return jplElements(
		data.constant.semimajor + centuries * data.delta.semimajor,
		data.constant.eccentricity + centuries * data.delta.eccentricity,
		toRadians(data.constant.inclination + centuries * data.delta.inclination),
		toRadians(data.constant.mean_long + centuries * data.delta.mean_long),
		toRadians(data.constant.long_periapsis + centuries * data.delta.long_periapsis),
		toRadians(data.constant.long_ascending + centuries * data.delta.long_ascending))
};

function addAll(elements){

	function addArgPeriapsis(elements) {
		elements.arg_periapsis = modRadians(elements.long_periapsis - elements.long_ascending);
		return elements;
	};

	function addMeanAnomaly(elements) {
		elements.mean_anomaly = modRadians(elements.mean_long - elements.long_periapsis);
		return elements;
	};

	function calculateEccentricAnomaly(elements) {
		var tries = 100;
		var tolerance = 0.000001;
		var M = elements.mean_anomaly;
		var e = elements.eccentricity;
		var ePrime = elements.eccentricity;

		var En = M + ePrime * math.sin(M);

		while(tries > 0) {
			var deltaM = M - (En - ePrime * math.sin(En));
			deltaE = deltaM / (1 - e * math.cos(En));
			En = En + deltaE;
			if(Math.abs(deltaE) < tolerance){return En;}
			--tries;
		}
		throw "numeric method didn't converge"
	};

	function addEccentricAnomaly(elements) {
		elements.eccentric_anomaly = calculateEccentricAnomaly(elements);
		return elements;
	};

	function addEclipticXX(elements){
		elements.eclipticXX = math.cos(elements.arg_periapsis) * math.cos(elements.long_ascending) - math.sin(elements.arg_periapsis) * math.sin(elements.long_ascending)  * math.cos(elements.inclination);
		return elements;
	};

	function addEclipticXY(elements){
		elements.eclipticXY = - math.sin(elements.arg_periapsis) * math.cos(elements.long_ascending) - math.cos(elements.arg_periapsis) * math.sin(elements.long_ascending)  * math.cos(elements.inclination);
		return elements;
	};

	function addEclipticYX(elements){
		elements.eclipticYX = math.cos(elements.arg_periapsis) * math.sin(elements.long_ascending) + math.sin(elements.arg_periapsis) * math.cos(elements.long_ascending)  * math.cos(elements.inclination);
		return elements;
	};

	function addEclipticYY(elements){
		elements.eclipticYY = - math.sin(elements.arg_periapsis) * math.sin(elements.long_ascending) + math.cos(elements.arg_periapsis) * math.cos(elements.long_ascending)  * math.cos(elements.inclination);
		return elements;
	};


	function addEclipticZX(elements){
		elements.eclipticZX = math.sin(elements.arg_periapsis) * math.sin(elements.inclination);
		//return elements;
	};

	function addEclipticZY(elements){
		elements.eclipticZY = math.cos(elements.arg_periapsis) * math.sin(elements.inclination);
		//return elements;
	};

	addArgPeriapsis(elements);
	addMeanAnomaly(elements);
	addEccentricAnomaly(elements);
	addEclipticXX(elements);
	addEclipticXY(elements);
	addEclipticYX(elements);
	addEclipticYY(elements);
	addEclipticZX(elements);
	addEclipticZY(elements);
	return elements;
};

function computeAll() {
		function compute(data, century) {
			var elements = addAll(atDate(data, century));
			var orbit = computeOrbit(elements)
			var planet = computePlanet(elements)
			var result = {
				name: data.name,
				orbit: orbit,
				planet: planet
			}
			return result;
		};

		function computeOrbit(elements){
			var n_points = 100;
			var points = [];
			for(i = 0; i < n_points; ++i) {
				(function(i) {
					angle = (i/n_points) * 2 * math.pi;
					points[points.length] = eclipticPoint(angle, elements);
				})(i)
			}
			return points;
		};
		function computePlanets(planets, centuries){
			var results = [];
			planets.forEach(function(planet) {
					results[results.length] = compute(planet, centuries);
				});
			return results;
		};

		function millisToCenturies(millis) {
			return millis / 3155692597470;
		}

		function centuriesSinceEpoch() {
			var J2000 = new Date(2000, 1, 1, 12, 0, 0, 0);
			var millis = (Date.now() - J2000);
			return millisToCenturies(millis);
		}
		
		return computePlanets(planets, centuriesSinceEpoch());
};

