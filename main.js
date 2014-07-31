(function(){
var GameObject = require('./object.js'),
	gamepad = require('./gamepad.js'),
	Player = require('./player.js'),
	keys = require('./keys.js'),
	raf = require('raf');

var canvasContainer = document.getElementById('gameContainer'),
	canvas = document.createElement('canvas'),
	ctx = canvas.getContext('2d');

canvas.pos = {
	x: 0,
	y: 0
};

canvas.width = 1280;
canvas.height = 720;

canvasContainer.appendChild(canvas);

var bullets = [];

var gravity = 8;

var objects = [];

objects.push(
	new Player(100, 100, 32, 32, gravity),
	new GameObject(160, 680, 600, 10),
	new GameObject(200, 680 - 100, 20, 100)
);

gamepad.init();

GameObject.init(['canvas', 'objects', 'ctx'], canvas, objects, ctx);
Player.init(['canvas', 'keys', 'gamepad'], canvas, keys, gamepad);

raf(function gameloop() {
	raf(gameloop);

	var drawQueue = [];

	gamepad.update();

	objects.forEach(function(object)  {if (object.update) object.update(bullets)});

	bullets.forEach(function(bullet, i)  {
		if (bullet.timeLeft-- > 0) {
			var moved = bullet.move(bullet.vel.x, bullet.vel.y).dist;

			if (bullet.vel.x !== 0 && moved.x / bullet.vel.x > -0.9) {
				bullet.vel.x = 0;
			}

			if (bullet.vel.y !== 0 && moved.y / bullet.vel.y > -0.9) {
				bullet.vel.y = 0;
			}

			if (bullet.vel.x === 0 || bullet.vel.y === 0)
				bullets.splice(i, 1);

			drawQueue.push(bullet);
		}
	});

	objects.forEach(function(a)  {return drawQueue.push(a)});

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawQueue.forEach(function(a)  {return a.draw()});
});})();