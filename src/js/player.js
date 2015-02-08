"use strict";

// Encompass application in this variable
var app = app || {};

app.Player = (function()
{
	var STANDARD_WIDTH = 50;
	var STANDARD_HEIGHT = 100;
	var MIN_SIZE = 0.5;
	var MAX_SIZE = 1.5;
	var MIN_Z 	 = 0;
	var MAX_Z 	 = 100;
	var TIME_FOR_ANIMATION = 600;

	/*
	 * Creates a player object with default variables
	 */
	var Player = function()
	{
		this.hp		= 3;
		this.speed	= 10;
		this.x		= 300;
		this.y		= 40; //app.canvas.height - 100.0;
		this.z		= app.Player.MAX_Z;			// "z axis for depth"
		this.image 	= app.resources.player;

		// time tracking purposes
		this.timeElapsed	= 0;

		// animation
		this.currentFrame	= 1;
	};

	Player.prototype.update = function(dt)
	{
		this.timeElapsed += dt;

		if(this.timeElapsed >= TIME_FOR_ANIMATION)
		{
			this.currentFrame++;

			if(this.currentFrame == 3)
			{
				this.currentFrame = 0;
				
			}

			this.timeElapsed = 0;
				
		}
	};

	/*
	 * Moves the player in the specified direction
	 */
	Player.prototype.move = function(keyCode)
	{
		if(app.input.keydown[app.KEYS.LEFT])
		{
			this.x -= this.speed * (app.game.timeElapsed/app.FRAME_RATE);
		}

		if(app.input.keydown[app.KEYS.UP])
		{
			this.y -= this.speed * (app.game.timeElapsed/app.FRAME_RATE);
		}

		if(app.input.keydown[app.KEYS.DOWN])
		{
			this.y += this.speed * (app.game.timeElapsed/app.FRAME_RATE);
		}

		if(app.input.keydown[app.KEYS.RIGHT])
		{
			this.x += this.speed * (app.game.timeElapsed/app.FRAME_RATE);
		}
	};

	Player.prototype.draw = function()
	{
		app.ctx.save();

		// offset the image based on the amount of hp the player has left
		app.ctx.drawImage(app.resources.player, this.currentFrame * 300, 0, 150, 150);

		app.ctx.restore();
	};

	return Player;

})();