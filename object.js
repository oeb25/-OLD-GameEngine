var GameObject = (function(){var DP$0 = Object.defineProperty;"use strict";
	function GameObject(x, y, width, height) {
		this.pos = {
			x: x,
			y: y
		};

		this.width = width;
		this.height = height;
	}Object.defineProperties(GameObject.prototype, {onScreen: {"get": onScreen$get$0, "configurable": true, "enumerable": true}, onGround: {"get": onGround$get$0, "configurable": true, "enumerable": true}});DP$0(GameObject, "prototype", {"configurable": false, "enumerable": false, "writable": false});

	GameObject.prototype.move = function() {var x = arguments[0];if(x === void 0)x = 0;var y = arguments[1];if(y === void 0)y = 0;var this$0 = this;
		var objects = GameObject.objects;

		var old = {
			x: this.pos.x,
			y: this.pos.y
		};

		var diagonal = Math.sqrt( Math.pow(x, 2) + Math.pow(y, 2) );

		for (var i = 0; i < diagonal; i++) {
			this.pos.x += x/diagonal;
			objects.forEach(function(block)  {
				if (block != this$0 && !block.player && this$0.overlap(block))
					this$0.pos.x -= x/diagonal;
			});

			this.pos.y += y/diagonal;
			objects.forEach(function(block)  {
				if (block != this$0 && !block.player && this$0.overlap(block))
					this$0.pos.y -= y/diagonal;
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

	function onScreen$get$0() {
		var canvas = GameObject.canvas;
		return this.overlap(canvas);
	}

	GameObject.prototype.is = function(other) {
		return is = {
			onLeftSide: this.pos.x + this.width <= other.pos.x,
			onRightSide: this.pos.x >= other.pos.x + other.width,
			over: this.pos.y + this.height <= other.pos.y,
			under: this.pos.y >= other.pos.y + other.height
		};
	};

	function onGround$get$0() {
		if (this.pos.y == this.move(0,1).y)
			return true

		this.move(0,-1);

		return false;
	}

	GameObject.prototype.overlap = function(other) {
		var is = this.is(other);

		return (!is.onLeftSide && !is.onRightSide && !is.over && !is.under);
	}

	GameObject.prototype.draw = function() {
		var ctx = GameObject.ctx;

		if (!this.onScreen)
			return false;

		ctx.fillStyle = '#999';

		ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);

		return true;
	}
;return GameObject;})();

GameObject.init = function(arr) {var SLICE$0 = Array.prototype.slice;var keys = SLICE$0.call(arguments, 1);var this$0 = this;
	arr.forEach(function(a, i)  {return this$0[a] = keys[i]});
};

module.exports = GameObject;