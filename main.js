(function(){
var GameObject = require('./object.js'),
	gamepad = require('./gamepad.js'),
	Player = require('./player.js'),
	keys = require('./keys.js'),
	raf = window.requestAnimationFrame;

var canvasContainer = document.getElementById('gameContainer'),
	canvas = document.createElement('canvas'),
	ctx = canvas.getContext('2d');

canvas.pos = {
	x: 0,
	y: 0
};

canvas.width = 1280;
canvas.height = 720;

var player = new Player(100, 100, 32, 32, keys.a, keys.d, keys.w);

canvas.inner = [
	player,
	new GameObject(160, 680, 600, 10),
	new GameObject(200, 680 - (2 * 2) - 1, 20, (2 * 2) + 1),
	new GameObject(220, 680 - 2, 20, 2)
];

canvasContainer.appendChild(canvas);

var update = function (object) {
	object.inner.forEach(function(a)  {
		a.familly = object;
		if (a.update)
			a.update(object);

		if (a.inner)
			update(a);
	});
};

var addToDrawQueue = function (object, inner) {
	object.inner.forEach(function(a)  {
		drawQueue.push(a);

		if (a.inner)
			addToDrawQueue(a);
	});
};

var drawQueue = [];

gamepad.init();

var inner = [
	new Player(0, 100, 100, 100, keys.left, keys.right, keys.up),
	new GameObject(500, 500, 500, 20)
];

player.inner = inner;

GameObject.init(['canvas', 'ctx'], canvas, ctx);
Player.init(['canvas', 'keys', 'gamepad', 'ctx'], canvas, keys, gamepad, ctx);

raf(function gameloop() {
	raf(gameloop);

	drawQueue = [];

	gamepad.update();

	update(canvas)

	addToDrawQueue(canvas);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawQueue.forEach(function(a)  {return a.draw()});
});})();