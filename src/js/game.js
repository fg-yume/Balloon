"use strict";

var app = app || {};

app.game = {
	BUTTON_WIDTH	: 200,
	BUTTON_HEIGHT	: 75,

	currentState	: app.GAME_STATE.MAIN,
	foodObstacle	: undefined,
	obstacles		: undefined,
	startTime		: undefined,
	previousTime	: undefined,
	player			: undefined,
	timeElapsed		: undefined,
	totalTime		: 0,
	difficulty		: 0,
	score			: 0,

	// buttons
	buttonBack		: undefined,
	buttonPlay		: undefined,
	buttonInstruction: undefined,


	// functions ------------------------------
	
	/*
	 * Grabs the data from the API to set the difficulty for the game
	 */
	init : function(jsonData)
	{
		// show canvas api
		app.canvas.style.display = "block";

		this.previousTime = new Date().getTime();
		
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

		// setup buttons
		this.buttonBack = new app.Button((app.canvas.width / 2) - this.BUTTON_WIDTH/2, 500, app.resources.ui.backButton);
		this.buttonPlay = new app.Button( (app.canvas.width / 2) - this.BUTTON_WIDTH/2, 500, app.resources.ui.playButton);
		this.buttonInstruction = new app.Button( (app.canvas.width / 2) - this.BUTTON_WIDTH/2, 400, app.resources.ui.rulesButton);
		

		this.currentState = app.GAME_STATE.MAIN;
		// Start game
		this.loop();
	},

	reset : function()
	{
		score = 0;
		this.previousTime = new Date().getTime();
		
		this.obstacles = new Array();
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
		// update mouse
		app.input.mouse.updateClick();

		// check time elapsed
		var timeNow = new Date().getTime();
		this.timeElapsed = timeNow - this.previousTime;
		
		// set previous time
		this.previousTime = timeNow;
		
		switch(this.currentState)
		{
			// Main Menu
			case app.GAME_STATE.MAIN:
			{

				if(app.input.mouse.clicked)
				{
					this.checkButtons();
				}

				break;
			}

			// Instructions
			case app.GAME_STATE.INSTRUCTION:
			{
				if(app.input.mouse.clicked)
				{
					this.checkButtons();
				}

				break;
			}

			// Credits
			case app.GAME_STATE.CREDITS:
			{
				if(app.input.mouse.clicked)
				{
					this.checkButtons();
				}

				break;
			}


			// GAME
			case app.GAME_STATE.GAME:
			{

				// update obstacles
				for(var key in this.obstacles){
					this.obstacles[key].update(this.timeElapsed);
				}

				// update player
				this.player.update(this.timeElapsed);

				this.handleCollisions();

				break;
			}
		}	
	},
	
	/*
	 * Draws all the objects on the screen
	 */
	draw : function()
	{
		app.ctx.save();

		// clear screen
		app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);

		switch(this.currentState)
		{
			case app.GAME_STATE.MAIN:
			{
				// background
				app.ctx.drawImage(app.resources.screens.homeScreen, 0, 0, app.canvas.width, app.canvas.height);

				// buttons
				this.buttonPlay.draw();
				this.buttonInstruction.draw();

				break;
			}

			case app.GAME_STATE.INSTRUCTION:
			{
				this.buttonBack.draw();

				break;
			}

			case app.GAME_STATE.GAME:
			{
				// draw scrolling background
				this.totalTime += this.timeElapsed;

				//ctx.drawImage(app.resources.bg.background, 0, 0, 565, 130);
    			//ctx.drawImage(app.resources.bg.background, 565, 0, 565, 130);
    			//ctx.drawImage(app.resources.bg.background, 0, 0, 1190, 755, 450, 15, 100, 60);

				//app.ctx.save(); 
				//app.ctx.translate(-bgPosX, 0);

				//app.ctx.drawImage(app.resources.bg.background, 0, 0, app.canvas.width, app.canvas.height);

				//app.ctx.restore();

				// draw obstacles
				for(var key in this.obstacles)
				{
					this.obstacles[key].draw();
				}
		
				// draw player
				this.player.draw();
		
		
				break;
			}
		}
	
		app.ctx.restore();
		
	},

	checkButtons : function()
	{
		console.log("mouse click: " + app.input.mouse.clicked);
		console.log("check buttons!");
		switch(this.currentState)
		{
			case app.GAME_STATE.MAIN:
			{
				var t = app.utility.intersects(app.input.mouse.x, app.input.mouse.y, 0, 0, 
						this.buttonPlay.x, this.buttonPlay.y, this.BUTTON_WIDTH, this.BUTTON_HEIGHT);

				console.log("collisions: " + t);
				if(t == true)
				{
					this.currentState = app.GAME_STATE.GAME;
				}
			}
		}
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