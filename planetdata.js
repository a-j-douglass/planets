var mercury = {
	semimajor: 0.387,
	semiminor: 0.371,
	base_angle: 3.0661949705625084, //radians
	angle_rate: 2608.7903050105, //radians per century
	matrix: math.matrix([[0.2121112069585902,-0.9738769422244237],[0.9714379096251882,0.21915471285651017]]) 
}

var venus = {
	semimajor: 0.720,
	semiminor: 0.720,
	base_angle: 0.884457890382625, //radians
	angle_rate: 1021.3285495824, //radians per century
	matrix: math.matrix([[-0.6693586501781152,-0.7428167134218309],[0.742172555692515,-0.6677316934713341]])
}

var earth = {
	semimajor: 1.00,
	semiminor: 1.00,
	base_angle: -0.043885015156143244, //radians
	angle_rate: 628.3075779009, //radians per century
	matrix: math.matrix([[-0.2249510543438648,-0.9743700647852352],[0.9743700647852352,-0.2249510543438648]])
}

var mars = {
	semimajor: 1.52,
	semiminor: 1.51,
	base_angle: 0.3724050021345747, //radians
	angle_rate: 334.0613016814, //radians per century
	matrix: math.matrix([[0.9134500769497048,0.40641256728253994],[-0.4068487150108243,0.9131646698736894]])
}

var jupiter = {
	semimajor: 5.20,
	semiminor: 5.19,
	base_angle: 0.35955596700876324, //radians
	angle_rate: 52.9663118914, //radians per century
	matrix: math.matrix([[0.9668266937439053,-0.2553959966727278],[0.25542875446738095,0.9665673890987301]])
}

var saturn = {
	semimajor: 9.54,
	semiminor: 9.51,
	base_angle: -0.7822554707742165, //radians
	angle_rate: 21.3365387887, //radians per century
	matrix: math.matrix([[-0.04152145079561657,-0.9989825912366544],[0.9983272772846056,-0.04219063537084038]])
}

var uranus = {
	semimajor: 19.2,
	semiminor: 19.2,
	base_angle: 2.5111785724978377, //radians
	angle_rate: 7.4784221716, //radians per century
	matrix: math.matrix([[-0.9876854293280716,-0.15641005042117037],[0.1564447532399273,-0.9876020611605455]])
}

var neptune = {
	semimajor: 30.1,
	semiminor: 30.1,
	base_angle: -1.755266905321827, //radians
	angle_rate: 3.8128367413, //radians per century
	matrix: math.matrix([[0.7071234900839468,-0.7067879564313724],[0.7070882240759869,0.7067526904234127]])
}


var pluto = {
	semimajor: 39.4,
	semiminor: 37.0,
	base_angle: 0.3430758631696345, //radians
	angle_rate: 2.5343542995, //radians per century
	matrix: math.matrix([[-0.7254895279881566,0.6808458560087125],[-0.6777621326061852,-0.6813902287806027]])
}

var planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto];

