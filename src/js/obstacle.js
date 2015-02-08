"use strict";

var app = app || {};

/*
 * Obstacle for Balloon
 */
app.Obstacle = (function()
{
	var BASE_X		= app.canvas.width + (app.canvas.height / 10.0);
	var BASE_Y		= app.canvas.height / 2;
	var BASE_SPEED	= -5;

	/*
	 * Creates an obstacle with the given parameters
	 *
	 * @param	image	Path of the image to use for the obstacle
	 * @param	x		[Optional] x-position of the obstacle
	 * @param	y		[Optional] y-position of the obstacle
	 * @param	speed	[Optional] speed of the obstacle 
	 */
	var Obstacle = function(image, x, y, speed)
	{
		this.image	= image;
		
		this.x		= ( x === undefined ? BASE_X : x );
		this.y		= ( y === undefined ? BASE_Y : y );
		this.speed	= ( speed === undefined ? BASE_SPEED : speed );
	}
	
	/*
	 * Updates the obstacle
	 */
	Obstacle.prototype.update = function(timeElapsed)
	{
		//this.x += this.speed * (timeElapsed/app.FRAME_RATE);
	};
	
	/*
	 * Draws the obstacle on the canvas
	 */
	Obstacle.prototype.draw = function()
	{
		app.ctx.save();
		
		app.ctx.drawImage(this.image, this.x, this.y, 50, 50);
		
		app.ctx.restore();
	};
	
	return Obstacle;
	
})();