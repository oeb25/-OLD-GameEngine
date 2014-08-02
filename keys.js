var handleKeys = function(e)  {
	for (var key in keys) {
		key = keys[key];
		if (e.keyCode === key.code)
			key.pressed = e.type === "keydown";
	}
};

window.addEventListener('keydown', handleKeys);
window.addEventListener('keyup', handleKeys);

var keys = {
	w: {
		code: 87,
		pressed: false
	},
	a: {
		code: 65,
		pressed: false
	},
	s: {
		code: 83,
		pressed: false
	},
	d: {
		code: 68,
		pressed: false
	},
	space: {
		code: 32,
		pressed: false
	},
	right: {
		code: 39,
		pressed: false
	},
	left: {
		code: 37,
		pressed: false
	},
	up: {
		code: 38,
		pressed: false
	}
};

module.exports = keys;