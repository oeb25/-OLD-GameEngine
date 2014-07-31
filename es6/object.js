class GameObject {
	constructor(x, y, width, height) {
		this.pos = {
			x: x,
			y: y
		};

		this.width = width;
		this.height = height;
	}

	move(x = 0, y = 0) {
		let { objects } = GameObject;

		let old = {
			x: this.pos.x,
			y: this.pos.y
		};

		let diagonal = Math.sqrt( Math.pow(x, 2) + Math.pow(y, 2) );

		for (let i = 0; i < diagonal; i++) {
			this.pos.x += x/diagonal;
			objects.forEach((block) => {
				if (block != this && !block.player && this.overlap(block))
					this.pos.x -= x/diagonal;
			});

			this.pos.y += y/diagonal;
			objects.forEach((block) => {
				if (block != this && !block.player && this.overlap(block))
					this.pos.y -= y/diagonal;
			});
		};

		return {
			x: this.pos.x,
			y: this.pos.y,
			dist: {
				x: old.x - this.pos.x,
				y: old.y - this.pos.y,
			}
		};
	}

	get onScreen() {
		let { canvas } = GameObject;
		return this.overlap(canvas);
	}

	is(other) {
		return is = {
			onLeftSide: this.pos.x + this.width <= other.pos.x,
			onRightSide: this.pos.x >= other.pos.x + other.width,
			over: this.pos.y + this.height <= other.pos.y,
			under: this.pos.y >= other.pos.y + other.height
		};
	};

	get onGround() {
		if (this.pos.y == this.move(0,1).y)
			return true

		this.move(0,-1);

		return false;
	}

	overlap(other) {
		let is = this.is(other);

		return (!is.onLeftSide && !is.onRightSide && !is.over && !is.under);
	}

	draw() {
		let { ctx } = GameObject;

		if (!this.onScreen)
			return false;

		ctx.fillStyle = '#999';

		ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);

		return true;
	}
}

GameObject.init = function(arr, ...keys) {
	arr.forEach((a, i) => this[a] = keys[i]);
};

module.exports = GameObject;