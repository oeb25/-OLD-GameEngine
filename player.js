var GameObject = require('./object.js');

var goAgain = true;

var Player = (function(super$0){var DP$0 = Object.defineProperty;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,Object.getOwnPropertyDescriptor(s,p));}}return t};"use strict";MIXIN$0(Player, super$0);
	function Player(x, y, width, height, leftKey, rightKey, upKey) {
		super$0.call(this, x, y, width, height);
		this.gravity = 8;
		this.looking = 1;
		this.vspeed = 0;
		this.jumpingPower = 20;
		this.player = true;
		this.leftKey = leftKey;
		this.rightKey = rightKey;
		this.jump = upKey;
	}Player.prototype = Object.create(super$0.prototype, {"constructor": {"value": Player, "configurable": true, "writable": true} });DP$0(Player, "prototype", {"configurable": false, "enumerable": false, "writable": false});

	Player.prototype.shoot = function(x, y) {
		var bullet = new GameObject(this.pos.x + this.width / 2, this.pos.y + this.height / 2, 6, 6);

		var mag = Math.sqrt( Math.pow(x, 2) + Math.pow(y, 2) );

		bullet.vel = { x: x/mag * 25, y: y/mag * 25 };

		bullet.timeLeft = 200;

		return bullet;
	}

	Player.prototype.update = function() {
		var keys = Player.keys, gamepad = Player.gamepad, canvas = Player.canvas;

		if (this.vspeed < 0)
			this.vspeed = 0;

		if ((this.jump.pressed || gamepad.buttons.a.pressed) && this.onGround)
			this.vspeed = this.jumpingPower;

		this.move(0, -this.vspeed + this.gravity);

		this.vspeed -= 1;

		if (this.vspeed < 0)
			this.vspeed = 0;

		if (this.pos.y > canvas.height)
			this.pos.y = -this.height;

		if (this.rightKey.pressed) {
			this.move(5,0);
			this.looking = 1;
		} else if (gamepad.stick.left.x > 0.2) {
			this.move(gamepad.stick.left.x * 5,0);
			this.looking = 1;
		}

		if (this.leftKey.pressed) {
			this.move(-5,0);
			this.looking = -1;
		} else if (gamepad.stick.left.x < -0.2) {
			this.move(gamepad.stick.left.x * 5,0);
			this.looking = -1;
		}


		if (gamepad.trigger.rt.pressed || gamepad.buttons.x.pressed || keys.space.pressed) {
			if (goAgain) {
				goAgain = false;
				if (gamepad.stick.right.x < -0.2 || gamepad.stick.right.x > 0.2 || gamepad.stick.right.y < -0.2 || gamepad.stick.right.y > 0.2) {
					//bullets.push(this.shoot(gamepad.stick.right.x, gamepad.stick.right.y));
				} else {
					//bullets.push(this.shoot(this.looking, 0));
				}
			}
			
		} else goAgain = true;
	}
;return Player;})(GameObject);;

module.exports = Player;