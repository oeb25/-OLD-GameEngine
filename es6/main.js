(function(){
let GameObject = require('./object.js'),
	gamepad = require('./gamepad.js'),
	Player = require('./player.js'),
	keys = require('./keys.js'),
	raf = window.requestAnimationFrame;

let canvasContainer = document.getElementById('gameContainer'),
	canvas = document.createElement('canvas'),
	ctx = canvas.getContext('2d');

canvas.pos = {
	x: 0,
	y: 0
};

canvas.width = 1280;
canvas.height = 720;

let player = new Player(100, 100, 32, 32, keys.a, keys.d, keys.w);

canvas.inner = [
	player,
	new GameObject(160, 680, 600, 10),
	new GameObject(200, 680 - (2 * 2) - 1, 20, (2 * 2) + 1),
	new GameObject(220, 680 - 2, 20, 2)
];

canvasContainer.appendChild(canvas);

let update = function (object) {
	object.inner.forEach((a) => {
		a.familly = object;
		if (a.update)
			a.update(object);

		if (a.inner)
			update(a);
	});
};

let addToDrawQueue = function (object, inner) {
	object.inner.forEach((a) => {
		drawQueue.push(a);

		if (a.inner)
			addToDrawQueue(a);
	});
};

let drawQueue = [];

gamepad.init();

let inner = [
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

	drawQueue.forEach((a) => a.draw());
});})();