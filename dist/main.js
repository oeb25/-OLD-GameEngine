!function e(t,s,i){function r(n,a){if(!s[n]){if(!t[n]){var h="function"==typeof require&&require;if(!a&&h)return h(n,!0);if(o)return o(n,!0);throw new Error("Cannot find module '"+n+"'")}var p=s[n]={exports:{}};t[n][0].call(p.exports,function(e){var s=t[n][1][e];return r(s?s:e)},p,p.exports,e,t,s,i)}return s[n].exports}for(var o="function"==typeof require&&require,n=0;n<i.length;n++)r(i[n]);return r}({1:[function(e){!function(){var t=e("./object.js"),s=e("./gamepad.js"),i=e("./player.js"),r=e("./keys.js"),o=window.requestAnimationFrame,n=document.getElementById("gameContainer"),a=document.createElement("canvas"),h=a.getContext("2d");a.pos={x:0,y:0},a.width=1280,a.height=720;var p=new i(100,100,32,32,r.a,r.d,r.w);a.inner=[p,new t(160,680,600,10),new t(200,675,20,5),new t(220,678,20,2)],n.appendChild(a);var u=function(e){e.inner.forEach(function(t){t.familly=e,t.update&&t.update(e),t.inner&&u(t)})},d=function(e){e.inner.forEach(function(e){c.push(e),e.inner&&d(e)})},c=[];s.init();var l=[new i(0,100,100,100,r.left,r.right,r.up),new t(500,500,500,20)];p.inner=l,t.init(["canvas","ctx"],a,h),i.init(["canvas","keys","gamepad","ctx"],a,r,s,h),o(function v(){o(v),c=[],s.update(),u(a),d(a),h.clearRect(0,0,a.width,a.height),c.forEach(function(e){return e.draw()})})}()},{"./gamepad.js":2,"./keys.js":3,"./object.js":4,"./player.js":5}],2:[function(e,t){var s;t.exports={init:function(){s=navigator.getGamepads();var e=s[0];if(e){var t=e.buttons;this.buttons={a:t[0],b:t[1],x:t[2],y:t[3]},this.dpad={up:t[12],down:t[13],right:t[15],left:t[14]},this.trigger={lb:t[4],rb:t[5],lt:t[6],rt:t[7]},this.back=t[8],this.start=t[9],this.special=t[16]}else setTimeout(this.init,20)},update:function(){if(s=navigator.getGamepads(),s[0]){var e=s[0].axes;this.stick={left:{x:Math.round(100*e[0])/100,y:Math.round(100*e[1])/100},right:{x:Math.round(100*e[2])/100,y:Math.round(100*e[3])/100}}}},buttons:{a:{pressed:!1,value:0},x:{pressed:!1,value:0},b:{pressed:!1,value:0},y:{pressed:!1,value:0}},dpad:{up:{pressed:!1,value:0},down:{pressed:!1,value:0},right:{pressed:!1,value:0},left:{pressed:!1,value:0}},trigger:{lb:{pressed:!1,value:0},rb:{pressed:!1,value:0},lt:{pressed:!1,value:0},rt:{pressed:!1,value:0}},back:{pressed:!1,value:0},start:{pressed:!1,value:0},special:{pressed:!1,value:0},stick:{left:{x:0,y:0},right:{x:0,y:0}}}},{}],3:[function(e,t){var s=function(e){for(var t in i)t=i[t],e.keyCode===t.code&&(t.pressed="keydown"===e.type)};window.addEventListener("keydown",s),window.addEventListener("keyup",s);var i={w:{code:87,pressed:!1},a:{code:65,pressed:!1},s:{code:83,pressed:!1},d:{code:68,pressed:!1},space:{code:32,pressed:!1},right:{code:39,pressed:!1},left:{code:37,pressed:!1},up:{code:38,pressed:!1}};t.exports=i},{}],4:[function(e,t){var s=function(){function e(e,t,s,i){this.pos={x:e,y:t},this.width=s,this.height=i}function t(){var t=e.canvas;return this.overlap(t)}function s(){return this.pos.y==this.move(0,1).y?!0:(this.move(0,-1),!1)}var i=Object.defineProperty;return Object.defineProperties(e.prototype,{onScreen:{get:t,configurable:!0,enumerable:!0},onGround:{get:s,configurable:!0,enumerable:!0}}),i(e,"prototype",{configurable:!1,enumerable:!1,writable:!1}),e.prototype.move=function(){var t=arguments[0];void 0===t&&(t=0);var s=arguments[1];void 0===s&&(s=0);for(var i=this,r=(e.objects,{x:this.pos.x,y:this.pos.y}),o=Math.sqrt(Math.pow(t,2)+Math.pow(s,2)),n=0;o>n;n++)this.pos.x+=t/o,this.familly.inner.forEach(function(e){e!=i&&!e.player&&i.overlap(e)&&(i.pos.x-=t/o)}),this.pos.y+=s/o,this.familly.inner.forEach(function(e){e!=i&&!e.player&&i.overlap(e)&&(i.pos.y-=s/o,i.vspeed&&0>s&&(i.vspeed=0,console.log(s)))});return{x:this.pos.x,y:this.pos.y,dist:{x:r.x-this.pos.x,y:r.y-this.pos.y}}},e.prototype.is=function(e){return is={onLeftSide:this.pos.x+this.width<=e.pos.x,onRightSide:this.pos.x>=e.pos.x+e.width,over:this.pos.y+this.height<=e.pos.y,under:this.pos.y>=e.pos.y+e.height}},e.prototype.overlap=function(e){var t=this.is(e);return!(t.onLeftSide||t.onRightSide||t.over||t.under)},e.prototype.draw=function(){var t=e.ctx,s=e.canvas;if(!this.onScreen)return!1;t.strokeStyle="#999";var i=this.familly;return i?t.strokeRect(i.pos.x+this.pos.x*i.width/s.width,i.pos.y+this.pos.y*i.height/s.height,this.width*(i.width/s.width),this.height*(i.height/s.height)):t.strokeRect(this.pos.x,this.pos.y,this.width,this.height),!0},e}();s.init=function(e){var t=Array.prototype.slice,s=t.call(arguments,1),i=this;e.forEach(function(e,t){return i[e]=s[t]})},t.exports=s},{}],5:[function(e,t){var s=e("./object.js"),i=!0,r=function(e){function t(t,s,i,r,o,n,a){e.call(this,t,s,i,r),this.gravity=8,this.looking=1,this.vspeed=0,this.jumpingPower=20,this.player=!0,this.leftKey=o,this.rightKey=n,this.jump=a}var r=Object.defineProperty,o=function(e,t){for(var s in t)t.hasOwnProperty(s)&&r(e,s,Object.getOwnPropertyDescriptor(t,s));return e};return o(t,e),t.prototype=Object.create(e.prototype,{constructor:{value:t,configurable:!0,writable:!0}}),r(t,"prototype",{configurable:!1,enumerable:!1,writable:!1}),t.prototype.shoot=function(e,t){var i=new s(this.pos.x+this.width/2,this.pos.y+this.height/2,6,6),r=Math.sqrt(Math.pow(e,2)+Math.pow(t,2));return i.vel={x:e/r*25,y:t/r*25},i.timeLeft=200,i},t.prototype.update=function(){var e=t.keys,s=t.gamepad,r=t.canvas;this.vspeed<0&&(this.vspeed=0),(this.jump.pressed||s.buttons.a.pressed)&&this.onGround&&(this.vspeed=this.jumpingPower),this.move(0,-this.vspeed+this.gravity),this.vspeed-=1,this.vspeed<0&&(this.vspeed=0),this.pos.y>r.height&&(this.pos.y=-this.height),this.rightKey.pressed?(this.move(5,0),this.looking=1):s.stick.left.x>.2&&(this.move(5*s.stick.left.x,0),this.looking=1),this.leftKey.pressed?(this.move(-5,0),this.looking=-1):s.stick.left.x<-.2&&(this.move(5*s.stick.left.x,0),this.looking=-1),s.trigger.rt.pressed||s.buttons.x.pressed||e.space.pressed?i&&(i=!1,s.stick.right.x<-.2||s.stick.right.x>.2||s.stick.right.y<-.2||s.stick.right.y>.2):i=!0},t}(s);t.exports=r},{"./object.js":4}]},{},[1]);