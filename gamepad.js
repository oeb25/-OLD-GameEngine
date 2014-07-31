var gamepads;
module.exports = {
	init: function () {
		gamepads = navigator.getGamepads();

		var gamepad = gamepads[0];

		if (gamepad) {
			var buttons = gamepad.buttons;

			this.buttons = {
				a: buttons[0],
				b: buttons[1],
				x: buttons[2],
				y: buttons[3],
			};

			this.dpad = {
				up: buttons[12],
				down: buttons[13],
				right: buttons[15],
				left: buttons[14],
			}

			// 10 = left stick down
			// 11 = right stick down

			this.trigger = {
				lb: buttons[4],
				rb: buttons[5],
				lt: buttons[6],
				rt: buttons[7]
			}

			this.back = buttons[8];
			this.start = buttons[9];
			this.special = buttons[16];
		} else {
			setTimeout(this.init, 20);
		}
	},
	update: function () {
		gamepads = navigator.getGamepads();
		if (gamepads[0]) {
			var axes = gamepads[0].axes;

			this.stick = {
				left: {
					x: Math.round(axes[0] * 100) / 100,
					y: Math.round(axes[1] * 100) / 100,
				},
				right: {
					x: Math.round(axes[2] * 100) / 100,
					y: Math.round(axes[3] * 100) / 100,
				}
			};
		}
	},
	buttons: {
		a: { pressed: false, value: 0 },
		x: { pressed: false, value: 0 },
		b: { pressed: false, value: 0 },
		y: { pressed: false, value: 0 },
	},
	dpad: {
		up: { pressed: false, value: 0 },
		down: { pressed: false, value: 0 },
		right: { pressed: false, value: 0 },
		left: { pressed: false, value: 0 },
	},
	trigger: {
		lb: { pressed: false, value: 0 },
		rb: { pressed: false, value: 0 },
		lt: { pressed: false, value: 0 },
		rt: { pressed: false, value: 0 }
	},
	back: { pressed: false, value: 0 },
	start: { pressed: false, value: 0 },
	special: { pressed: false, value: 0 },
	stick: {
		left: { x: 0, y: 0 },
		right: { x: 0, y: 0 }
	}
};