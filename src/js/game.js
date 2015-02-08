"use strict";

var app = app || {};

app.game = {
	currentState	: app.GAME_STATE.GAME,
	foodObstacle	: undefined,
	obstacles		: undefined,
	startTime		: undefined,
	previousTime	: undefined,
	player			: undefined,

	// functions ------------------------------
	
	/*
	 * Grabs the data from the API to set the difficulty for the game
	 */
	init : function()
	{
		this.previousTime = new Date().getTime();
		
		// TODO: grab API data
		this.obstacles = new Array();
		
		// Create obstacles
		this.foodObstacle = new app.Obstacle(app.resources.food.burger, 300, 30);
		this.player			= new app.Player();
		
		// populate array
		this.obstacles.push(this.foodObstacle);
		
		// Start game
		this.loop();
	},
	
	loop : function()
	{
		this.update();
		this.draw();
		
		app.animationID = requestAnimationFrame(this.loop.bind(this));
	},
	
	/*
	 * Updates the 
	 */
	update : function()
	{
		// check time elapsed
		var timeNow = new Date().getTime();
		var timeElapsed = timeNow - this.previousTime;
		
		// set previous time
		this.previousTime = timeNow;
		
		// update obstacles
		for(var key in this.obstacles){
			this.obstacles[key].update(timeElapsed);
		}

		// update player
		pl

		//this.foodObstacle.update(timeElapsed);
	},
	
	draw : function()
	{
		app.ctx.save();

		// clear screen
		app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);
		
		// draw background
		app.ctx.drawImage(app.resources.bg.background, 0, 0, app.canvas.width, app.canvas.height);
	
		// draw obstacles
		for(var key in this.obstacles)
		{
			this.obstacles[key].draw();
		}
		
		// draw player

		
		app.ctx.restore();
	},
	
	changeState : function()
	{
		switch(this.currentState)
		{
			case app.GAME_STATE.PAUSE:
			{
				// Show the pause screen!
				this.update();
				this.draw();
				break;
			}
		}
		
	}
};