"use strict";

var app = app || {};

app.game = {
	currentState	: app.GAME_STATE.GAME,
	foodObstacle	: undefined,
	obstacles		: undefined,
	startTime		: undefined,
	previousTime	: undefined,
	player			: undefined,
	timeElapsed		: undefined,
	totalTime		: 0,
	difficulty		: 0,

	// functions ------------------------------
	
	/*
	 * Grabs the data from the API to set the difficulty for the game
	 */
	init : function(jsonData)
	{
		// show canvas api
		app.canvas.style.display = "block";

		this.previousTime = new Date().getTime();
		
		// TODO: grab API data
		this.obstacles = new Array();

		this.difficulty = jsonData.total;
		console.log("difficulty: " + this.difficulty);
		
		// Create obstacles
		var foodObstacle = new app.Obstacle(app.resources.food.burger, 600, 30);
		var test = new app.Obstacle(app.resources.food.burger, 900, 30);
		this.player			= new app.Player();
		
		// populate array
		this.obstacles.push(foodObstacle);
		this.obstacles.push(test);
		
		// Start game
		this.loop();
	},
	
	/*
	 * Main loop for the game
	 */
	loop : function()
	{
		this.update();
		this.draw();
		
		app.animationID = requestAnimationFrame(this.loop.bind(this));
	},
	
	/*
	 * Updates the game
	 */
	update : function()
	{
		// check time elapsed
		var timeNow = new Date().getTime();
		this.timeElapsed = timeNow - this.previousTime;
		
		// set previous time
		this.previousTime = timeNow;
		
		// update obstacles
		for(var key in this.obstacles){
			this.obstacles[key].update(this.timeElapsed);
		}

		// update player
		this.player.update(this.timeElapsed);

		this.handleCollisions();
	},
	
	/*
	 * Draws all the objects on the screen
	 */
	draw : function()
	{
		app.ctx.save();

		// clear screen
		app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);
		
		// draw scrolling background
		this.totalTime += this.timeElapsed;

		var velocityX	= 5;
		var bgPosX		= this.totalTime * velocityX % app.resources.bg.background.width;
		var numImages 	= Math.ceil(app.canvas.width / app.resources.bg.background.width);

		app.ctx.save(); 
		app.ctx.translate(-bgPosX, 0);

		for(var i = 0; i < numImages; i++)
		{
			app.ctx.drawImage(app.resources.bg.background, i * app.resources.bg.background.width, -1000);
		}
		//app.ctx.drawImage(app.resources.bg.background, 0, 0, app.canvas.width, app.canvas.height);


		app.ctx.restore();
	
		// draw obstacles
		for(var key in this.obstacles)
		{
			this.obstacles[key].draw();
		}
		
		// draw player
		this.player.draw();
		
		app.ctx.restore();
	},
	
	/*
	 * Changes the state of the game
	 */
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
	},

	handleCollisions : function()
	{
		for(var i=0; i < this.obstacles.length; i++)
		{
			if( app.utility.intersects(this.player.x, this.player.y, 50, 100,
						this.obstacles[i].x, this.obstacles[i].y, 50, 50) )
			{
				//console.log("intersected!");
				console.log("player:[" + this.player.x + "," + this.player.y + "]");
				console.log("obstacle:[" + this.obstacles[i].x + "," + this.obstacles[i].y + "]");

				this.obstacles.splice(i, 1);
				this.player.hp -= 1;

				if(this.player.hp <= 0)
				{
					// Game Over

				}
			}

			// remove collision


			// lose hp
			
		}
	}
};