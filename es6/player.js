let GameObject = require('./object.js');

let goAgain = true;

class Player extends GameObject {
	constructor(x, y, width, height, leftKey, rightKey, upKey) {
		super(x, y, width, height);
		this.gravity = 8;
		this.looking = 1;
		this.vspeed = 0;
		this.jumpingPower = 20;
		this.player = true;
		this.leftKey = leftKey;
		this.rightKey = rightKey;
		this.jump = upKey;
	}

	shoot(x, y) {
		let bullet = new GameObject(this.pos.x + this.width / 2, this.pos.y + this.height / 2, 6, 6);

		let mag = Math.sqrt( Math.pow(x, 2) + Math.pow(y, 2) );

		bullet.vel = { x: x/mag * 25, y: y/mag * 25 };

		bullet.timeLeft = 200;

		return bullet;
	}

	update() {
		let { keys, gamepad, canvas } = Player;

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
};

module.exports = Player;