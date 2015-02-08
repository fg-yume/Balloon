"use strict";

// encompass the entire app within this variable
var app = app || {};

// different states that the app can be in
app.APP_STATES = {
	MAP			: 0,
	GAME		: 1,
	
	NUM_STATES	: 2
};

// main method to handle updating the game
app.main = {
	
	// variables ----------------------------
	currentState : app.APP_STATES.GAME,

	update : function()
	{
		// Update input
	
		// Update based on the current app states
		switch(currentState)
		{
			case app.APP_STATES.MAP:
			{
				console.log("map state");
				break;
			}
			case app.APP_STATES.GAME:
			{
				// Update the game
				app.game.update();
				
				console.log("game state");
				
				break;
			}
			default:
			{
				console.log("Warning! Should not happen!");
				break;
			}
		}
	}
};