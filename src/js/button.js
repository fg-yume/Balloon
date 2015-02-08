"use strict";

var app = app || {};

app.Button = (function(){
	var BUTTON_WIDTH = 200;
	var BUTTON_HEIGHT = 75;

	var Button = function(x, y, image)
	{
		this.x = x;
		this.y = y;
		this.image = image;
	}

	Button.prototype.draw = function()
	{
		app.ctx.save();

		// draw button
		app.ctx.drawImage(this.image, this.x, this.y, BUTTON_WIDTH, BUTTON_HEIGHT);

		app.ctx.restore();
	}

	return Button;
})();