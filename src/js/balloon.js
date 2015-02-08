"use strict";

var app = app || {};

// main method to handle updating the game
app.main = {
	// variables ----------------------------
	currentState 	: undefined,
	timeElapsed		: 0,

	init : function()
	{
		console.log("MAIN INIT!");
		this.currentState = app.APP_STATE.LOADING;
		app.resources.init();
		
		this.loop();
	},
	
	loop : function()
	{
		this.update();
		
		app.animationID = requestAnimationFrame(this.loop.bind(this));
	},
	
	/*
	 * Updates the various elements of the game
	 */
	update : function()
	{
		// Update input
	
		// Update based on the current app states
		switch(this.currentState)
		{
			case app.APP_STATE.LOADING:
			{
				console.log("loading");
				app.resources.update();
				
				if(app.resources.doneLoaded == true)
				{
					this.currentState = app.APP_STATE.MAP;
					console.log(" DONE LOADING ");
					
					this.changeAppState();
				}
				break;
			}
			case app.APP_STATE.MAP:
			{
				console.log("map state");
				break;
			}
			case app.APP_STATE.GAME:
			{
				// Update the game
				app.game.update();
				
				break;
			}
			default:
			{
				console.log("Warning! Should not happen!");
				break;
			}
		}
	},
	
	changeAppState : function()
	{
		switch(this.currentState)
		{
			case app.APP_STATE.MAP:
			{
				app.maps.initialize();
				break;
			}
		
			// When switching to game
			case app.APP_STATE.GAME:
			{
				// Game Setup
				app.game.init();
				break;
			}
			
			default:
			{
				break;
			}
		}
	}
};