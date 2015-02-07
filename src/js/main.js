"use strict";

// encompass the entire app within this variable
var app = app || {};

// Globals ------------------------------
app.GAME_STATE = {
	MAIN : 0,
	INSTRUCTION : 1,
	GAME : 2,
	CREDITS : 3,
	PAUSE : 4,
	
	NUM_STATES : 5
};

// main method to handle updating the game
app.main = {
	
	// variables ----------------------------
	currentState : app.GAME_STATE.GAME,

	update : function()
	{
		// Update input
	
		// Update player and obstacles
		switch(currentState)
		{
			case app.GAME_STATE.GAME:
			{
				updatePlayer();
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