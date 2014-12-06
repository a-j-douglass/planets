function computeAll() {
		function toRadians(degrees) {
			return math.pi * degrees / 180;
		};

		function modRadians(angle) {
			while(angle > math.pi) {angle = angle - math.pi * 2}
			while(angle < -math.pi) {angle = angle + math.pi * 2}
			return angle;
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

		function addArgPeriapsis(elements) {
			elements.arg_periapsis = modRadians(elements.long_periapsis - elements.long_ascending);
			return elements;
		};

		function addMeanAnomaly(elements) {
			elements.mean_anomaly = modRadians(elements.mean_long - elements.long_periapsis);
			return elements;
		};

		function addEccentricAnomaly(elements) {
			var deltaE = 1;
			var ePrime = 180 * elements.eccentricity / math.pi;

			var guess = elements.mean_anomaly + ePrime * math.sin(elements.mean_anomaly);

			while(deltaE > 0.001) {
				var deltaM = elements.mean_anomaly - (guess - ePrime * math.sin(guess));
				deltaE = deltaM / (1 - elements.eccentricity * math.cos(guess));
				guess = guess + deltaE;
			}
			elements.eccentric_anomaly = guess;
			return elements;
		};

		function orbitPoint(angle, elements) {
			return [ orbitX(angle, elements),
					 orbitY(angle, elements),
					 0];
		};

		function orbitX(angle, elements) {
			return elements.semimajor * (math.cos(angle) - elements.eccentricity);
		};


		 function orbitY(angle, elements) {
		//	return elements.semimajor * math.sqrt(1 - elements.eccentricity * elements.eccentricity) * math.sin(angle);
					return elements.semimajor * math.sin(angle);
		};

		function eclipticPoint(angle, elements) {
			var point = orbitPoint(angle, elements);
			return [ eclipticX(point, elements),
					 eclipticY(point, elements),
					 eclipticZ(point, elements)]
		};

		function eclipticX(orbitPoint, elements){
			return elements.eclipticXX * orbitPoint[0] + elements.eclipticXY * orbitPoint[1]; 
		};

		function addEclipticXX(elements){
			elements.eclipticXX = math.cos(elements.arg_periapsis) * math.cos(elements.long_ascending) - math.sin(elements.arg_periapsis) * math.sin(elements.long_ascending)  * math.cos(elements.inclination);
			return elements;
		};

		function addEclipticXY(elements){
			elements.eclipticXY = - math.sin(elements.arg_periapsis) * math.cos(elements.long_ascending) - math.cos(elements.arg_periapsis) * math.sin(elements.long_ascending)  * math.cos(elements.inclination);
			return elements;
		};

		function eclipticY(orbitPoint, elements){
			return elements.eclipticYX * orbitPoint[0] + elements.eclipticYY * orbitPoint[1];
		};

		function addEclipticYX(elements){
			elements.eclipticYX = math.cos(elements.arg_periapsis) * math.cos(elements.long_ascending) + math.sin(elements.arg_periapsis) * math.cos(elements.long_ascending)  * math.cos(elements.inclination);
			return elements;
		};

		function addEclipticYY(elements){
			elements.eclipticYY = - math.sin(elements.arg_periapsis) * math.sin(elements.long_ascending) + math.cos(elements.arg_periapsis) * math.cos(elements.long_ascending)  * math.cos(elements.inclination);
			return elements;
		};

		function eclipticZ(orbitPoint, elements){
			return elements.eclipticZX * orbitPoint[0] + elements.eclipticZY * orbitPoint[1];
		};

		function addEclipticZX(elements){
			elements.eclipticZX = math.sin(elements.arg_periapsis) * math.sin(elements.inclination);
			return elements;
		};

		function addEclipticZY(elements){
			elements.eclipticZY = math.cos(elements.arg_periapsis) * math.sin(elements.inclination);
			return elements;
		};

		function addAll(elements){
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

		function computePlanet(elements){
			return eclipticPoint(elements.eccentric_anomaly, elements);
		};

		function computePlanets(planets, centuries){
			var results = [];
			planets.forEach(function(planet) {
					results[results.length] = compute(planet, centuries);
				});
			return results;
		};

	var J2000 = new Date(2000, 1, 1, 12, 0, 0, 0);
	var millis = (Date.now() - J2000);
	var centuries = millis / 3155692597470;

	return computePlanets(planets, centuries);
};

