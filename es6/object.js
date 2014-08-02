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
			this.familly.inner.forEach((other) => {
				if (other != this && !other.player && this.overlap(other)) {
					this.pos.x -= x/diagonal;
				}
			});

			this.pos.y += y/diagonal;
			this.familly.inner.forEach((other) => {
				if (other != this && !other.player && this.overlap(other)) {
					this.pos.y -= y/diagonal;
					if (this.vspeed && y < 0) {
						this.vspeed = 0;
						console.log(y);
					}
				}
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

	draw(widthin) {
		let { ctx, canvas } = GameObject;

		if (!this.onScreen)
			return false;
		
		ctx.strokeStyle = '#999';

		let fam = this.familly

		if (fam) {
			ctx.strokeRect(
/*X*/			fam.pos.x + this.pos.x * fam.width / canvas.width,
/*Y*/			fam.pos.y + this.pos.y * fam.height / canvas.height,
/*WIDHT*/		this.width * (fam.width / canvas.width),
/*HEIGHT*/		this.height * (fam.height / canvas.height))
		} else {
			ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
		}

		return true;
	}
}

GameObject.init = function(arr, ...keys) {
	arr.forEach((a, i) => this[a] = keys[i]);
};

module.exports = GameObject;