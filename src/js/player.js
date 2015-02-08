"use strict";

// Encompass application in this variable
var app = app || {};

app.player = (function()
{
	var STANDARD_WIDTH = 50;
	var STANDARD_HEIGHT = 100;
	var MIN_SIZE = 0.5;
	var MAX_SIZE = 1.5;
	var MIN_Z 	 = 0;
	var MAX_Z 	 = 100;
	var TIME_FOR_ANIMATION = 2;

	/*
	 * Creates a player object with default variables
	 */
	var Player = function()
	{
		this.hp		= 10;
		this.speed	= 3;
		this.x		= 50;
		this.y		= app.ctx.height - 10.0;
		this.z		= app.player.MAX_Z;			// "z axis for depth"
		this.image 	= app.resources.player;

		// time tracking purposes
		this.timeElapsed	= 0;

		// animation
		this.currentFrame	= 1;
	};

	Player.prototype.update = function()
	{
		
	};

	/*
	 * Moves the player in the specified direction
	 */
	Player.prototype.move = function(keyCode, dt)
	{
		this.timeElapsed += dt;

		if(this.timeElapsed >= app.player.TIME_FOR_ANIMATION)
		{
			if(this.currentFrame == 0)
				this.currentFrame = 1;

			else if(this.currentFrame == 1)
				this.currentFrame = 0;
		}

		switch(keyCode)
		{
			case app.KEYS.LEFT:
			{
				this.x -= this.speed * (dt/app.FRAME_RATE);

				break;
			}
			case app.KEYS.UP:
			{
				this.z -= this.speed * (dt/app.FRAME_RATE);

				break;
			}
			case app.KEYS.RIGHT:
			{
				this.x += this.speed * (dt/app.FRAME_RATE);

				break;
			}
			case app.KEYS.DOWN:
			{
				this.z += this.speed * (dt/app.FRAME_RATE);

				break;
			}
		}
	};

	Player.prototype.draw = function()
	{
		app.ctx.save();

		app.ctx.drawImage(this.image, this.currentFrame * app.player.STANDARD_WIDTH, 0, app.player.STANDARD_WIDTH, app.player.STANDARD_HEIGHT,
			this.x, this.y, app.player.STANDARD_WIDTH, app.player.STANDARD_HEIGHT);

		console.log(this.x + " " + this.y);

		app.ctx.restore();
	};

	return Player;

})();