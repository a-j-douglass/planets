var testDate = 2451544.5
var centuries = (testDate - 2451545) / 36525
var results = planets.map(function(jpl){
	addAll(atDate(jpl, centuries));
});

function getResults(index) {
	var testDate = 2451544.5
	var centuries = (testDate - 2451545) / 36525
	return addAll(atDate(planets[index], centuries));
}

function toDegrees(radians) {
	return radians * 180 / math.pi;
}

function toRadians(radians) {
	return radians * math.pi / 180;
}


QUnit.test( "Alan is cool", function( assert ) {
assert.ok("Alan is cool", "Passed!" );
});

QUnit.test( "semimajor test", function( assert ) {
	assert.equal(getResults(0).semimajor, 0.387099269994935);
	assert.equal(getResults(1).semimajor, 0.723335659946612);
	assert.equal(getResults(2).semimajor, 1.0000026099230663);
	assert.equal(getResults(3).semimajor, 1.5237103397471596);
	assert.equal(getResults(4).semimajor, 5.202887001588912);
	assert.equal(getResults(5).semimajor, 9.536675957119781);
	assert.equal(getResults(6).semimajor, 19.18916466685503);
	assert.equal(getResults(7).semimajor, 30.06992275640096);
	assert.equal(getResults(8).semimajor, 39.48211675432526);
});

QUnit.test( "eccentricity test", function( assert ) {
	assert.equal(getResults(0).eccentricity, 0.20563592973908282);
	assert.equal(getResults(1).eccentricity, 0.006776720562217659);
	assert.equal(getResults(2).eccentricity, 0.016711230601232033);
	assert.equal(getResults(3).eccentricity, 0.093394098921013);
	assert.equal(getResults(4).eccentricity, 0.04838624181423682);
	assert.equal(getResults(5).eccentricity, 0.05386179698028747);
	assert.equal(getResults(6).eccentricity, 0.047257440601916494);
	assert.equal(getResults(7).eccentricity, 0.008590479301163585);
	assert.equal(getResults(8).eccentricity, 0.24882729929226557);
});

QUnit.test( "inclination test", function( assert ) {
	assert.equal(getResults(0).inclination, toRadians(7.004979101416701));
	assert.equal(getResults(1).inclination, toRadians(3.3946760607994526));
	assert.equal(getResults(2).inclination, toRadians(-0.000015132769609856263));
	assert.equal(getResults(3).inclination, toRadians(1.8496915313115676));
	assert.equal(getResults(4).inclination, toRadians(1.304396975149076));
	assert.equal(getResults(5).inclination, toRadians(2.485991843496372));
	assert.equal(getResults(6).inclination, toRadians(0.7726378632565366));
	assert.equal(getResults(7).inclination, toRadians(1.7700434651578372));
	assert.equal(getResults(8).inclination, toRadians(17.140012059340453));
});

QUnit.test( "mean_long test", function( assert ) {
	assert.equal(getResults(0).mean_long, toRadians(250.20415410764204));
	assert.equal(getResults(1).mean_long, toRadians(181.17803426540328));
	assert.equal(getResults(2).mean_long, toRadians(99.97176710901013));
	assert.equal(getResults(3).mean_long, toRadians(-4.8154485138602325));
	assert.equal(getResults(4).mean_long, toRadians(34.35489709962697));
	assert.equal(getResults(5).mean_long, toRadians(49.93750920437358));
	assert.equal(getResults(6).mean_long, toRadians(313.23223891071393));
	assert.equal(getResults(7).mean_long, toRadians(-55.12302023693019));
	assert.equal(getResults(8).mean_long, toRadians(238.92705054348187));
});

QUnit.test( "long_periapsis test", function( assert ) {
	assert.equal(getResults(0).long_periapsis, toRadians(77.4577940831911));
	assert.equal(getResults(1).long_periapsis, toRadians(131.60246714326775));
	assert.equal(getResults(2).long_periapsis, toRadians(102.93767750462504));
	assert.equal(getResults(3).long_periapsis, toRadians(-23.94363567365339));
	assert.equal(getResults(4).long_periapsis, toRadians(14.728476920668308));
	assert.equal(getResults(5).long_periapsis, toRadians(92.5988840454163));
	assert.equal(getResults(6).long_periapsis, toRadians(170.95427071406147));
	assert.equal(getResults(7).long_periapsis, toRadians(44.96476668361588));
	assert.equal(getResults(8).long_periapsis, toRadians(224.06891684618645));
});

QUnit.test( "long_ascending test", function( assert ) {
	assert.equal(getResults(0).long_ascending, toRadians(48.33076764582218));
	assert.equal(getResults(1).long_ascending, toRadians(76.67984635142615));
	assert.equal(getResults(2).long_ascending, toRadians(0));
	assert.equal(getResults(3).long_ascending, toRadians(49.559542915111976));
	assert.equal(getResults(4).long_ascending, toRadians(100.47390628793211));
	assert.equal(getResults(5).long_ascending, toRadians(113.66242843178563));
	assert.equal(getResults(6).long_ascending, toRadians(74.016924449495));
	assert.equal(getResults(7).long_ascending, toRadians(131.78422580963232));
	assert.equal(getResults(8).long_ascending, toRadians(110.30393700200986));
});

QUnit.test( "mean_anomaly test", function( assert ) {
	assert.equal(getResults(0).mean_anomaly.toFixed(6), toRadians(172.74636002445095).toFixed(6));
	assert.equal(getResults(1).mean_anomaly.toFixed(6), toRadians(49.57556712213554).toFixed(6));
	assert.equal(getResults(2).mean_anomaly.toFixed(6), toRadians(-2.9659103956149124).toFixed(6));
	assert.equal(getResults(3).mean_anomaly.toFixed(6), toRadians(19.128187159793157).toFixed(6));
	assert.equal(getResults(4).mean_anomaly.toFixed(6), toRadians(19.62642017895866).toFixed(6));
	assert.equal(getResults(5).mean_anomaly.toFixed(6), toRadians(-42.661374841042715).toFixed(6));
	assert.equal(getResults(6).mean_anomaly.toFixed(6), toRadians(142.27796819665247).toFixed(6));
	assert.equal(getResults(7).mean_anomaly.toFixed(6), toRadians(-100.08778692054607).toFixed(6));
	assert.equal(getResults(8).mean_anomaly.toFixed(6), toRadians(14.858133697295415).toFixed(6));
});


QUnit.test( "eccentric_anomaly test", function( assert ) {
	assert.equal(getResults(0).eccentric_anomaly.toFixed(6), toRadians(173.98167031844903).toFixed(6));
	assert.equal(getResults(1).eccentric_anomaly.toFixed(6), toRadians(49.87244858402797).toFixed(6));
	assert.equal(getResults(2).eccentric_anomaly.toFixed(6), toRadians(-3.016293085497048).toFixed(6));
	assert.equal(getResults(3).eccentric_anomaly.toFixed(6), toRadians(21.050223808427937).toFixed(6));
	assert.equal(getResults(4).eccentric_anomaly.toFixed(6), toRadians(20.601927748017772).toFixed(6));
	assert.equal(getResults(5).eccentric_anomaly.toFixed(6), toRadians(-44.83734045620804).toFixed(6));
	assert.equal(getResults(6).eccentric_anomaly.toFixed(6), toRadians(143.8742884293573).toFixed(6));
	assert.equal(getResults(7).eccentric_anomaly.toFixed(6), toRadians(-100.57163070863608).toFixed(6));
	assert.equal(getResults(8).eccentric_anomaly.toFixed(6), toRadians(19.65300769726593).toFixed(6));
});

QUnit.test( "mercury position test", function( assert ) {
	assert.equal(computePlanet(getResults(0))[0].toFixed(6), -0.14072306704031023.toFixed(6));
	assert.equal(computePlanet(getResults(0))[1].toFixed(6), -0.44390571592858674.toFixed(6));
	assert.equal(computePlanet(getResults(0))[2].toFixed(6), -0.023346080595162643.toFixed(6));
});

QUnit.test( "venus position test", function( assert ) {
	assert.equal(computePlanet(getResults(1))[0].toFixed(6), -0.7186446369848263.toFixed(6));
	assert.equal(computePlanet(getResults(1))[1].toFixed(6), -0.022556262100460023.toFixed(6));
	assert.equal(computePlanet(getResults(1))[2].toFixed(6), 0.041173292952343635.toFixed(6));
});

QUnit.test( "earth position test", function( assert ) {
	assert.equal(computePlanet(getResults(2))[0].toFixed(6), -0.16856286531223225.toFixed(6));
	assert.equal(computePlanet(getResults(2))[1].toFixed(6), 0.968758969709345.toFixed(6));
	assert.equal(computePlanet(getResults(2))[2].toFixed(6), -0.00.toFixed(6));
});

QUnit.test( "mars position test", function( assert ) {
	assert.equal(computePlanet(getResults(3))[0].toFixed(6), 1.3903123445822982.toFixed(6));
	assert.equal(computePlanet(getResults(3))[1].toFixed(6), -0.02098486910302877.toFixed(6));
	assert.equal(computePlanet(getResults(3))[2].toFixed(6), -0.03461160316974063.toFixed(6));
});

QUnit.test( "jupiter position test", function( assert ) {
	assert.equal(computePlanet(getResults(4))[0].toFixed(6), 4.000605672562916.toFixed(6));
	assert.equal(computePlanet(getResults(4))[1].toFixed(6), 2.9424922446563553.toFixed(6));
	assert.equal(computePlanet(getResults(4))[2].toFixed(6), -0.10175564758406577.toFixed(6));
});

QUnit.test( "saturn position test", function( assert ) {
	assert.equal(computePlanet(getResults(5))[0].toFixed(6), 6.41692506330357.toFixed(6));
	assert.equal(computePlanet(getResults(5))[1].toFixed(6), 6.543720277069578.toFixed(6));
	assert.equal(computePlanet(getResults(5))[2].toFixed(6), -0.36919797141789834.toFixed(6));
});

QUnit.test( "uranus position test", function( assert ) {
	assert.equal(computePlanet(getResults(6))[0].toFixed(6), 14.424124258131279.toFixed(6));
	assert.equal(computePlanet(getResults(6))[1].toFixed(6), -13.738978288718398.toFixed(6));
	assert.equal(computePlanet(getResults(6))[2].toFixed(6), -0.23802068662353193.toFixed(6));
});

QUnit.test( "neptune position test", function( assert ) {
	assert.equal(computePlanet(getResults(7))[0].toFixed(6), 16.803470361250653.toFixed(6));
	assert.equal(computePlanet(getResults(7))[1].toFixed(6), -24.993594553704998.toFixed(6));
	assert.equal(computePlanet(getResults(7))[2].toFixed(6), 0.1274512099942044.toFixed(6));
});

QUnit.test( "pluto position test", function( assert ) {
	assert.equal(computePlanet(getResults(8))[0].toFixed(6), -9.884547315137103.toFixed(6));
	assert.equal(computePlanet(getResults(8))[1].toFixed(6), -27.962822782088043.toFixed(6));
	assert.equal(computePlanet(getResults(8))[2].toFixed(6), 5.851509895930623.toFixed(6));
});

