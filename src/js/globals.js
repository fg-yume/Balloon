"use strict";

// Encompass entire app in variable
var app = app || {};

// Canvas element in the HTML page
app.canvas		= document.querySelector("#canvas");
// Drawing context for the game
app.ctx			= app.canvas.getContext("2d");
// Frame rate for the game
app.FRAME_RATE	= 60;
// The animation id for the canvas
app.animationID	= undefined;

// Different states that the game can be in
app.APP_STATE = {
	LOADING		: 0, // Loading assets
	MAP			: 1, // Using the Google map API
	GAME		: 2, // In the game
	
	NUM_STATES	: 3
};

// Various game states for Balloon
app.GAME_STATE = {
	MAIN		: 0, // Main screen
	INSTRUCTION	: 1, // Instruction screen
	GAME		: 2, // Game screen
	CREDITS		: 3, // Credits screen
	PAUSE		: 4, // Pause screen
	
	NUM_STATES	: 5
};

// Various mouse states for Balloon
app.MOUSE_STATE = {
	UP			: 0,
	DOWN		: 1,
	DRAG		: 2,
	
	NUM_STATES	: 3
};

// Offset of the canvas element from the left of the window
app.OFFSET_LEFT = app.canvas.getBoundingClientRect().left;
// Offset of the canvas element from the top of the window
app.OFFSET_TOP	= app.canvas.getBoundingClientRect().top;

// Specific keys that will be used as controls
app.KEYS = {
	LEFT  : 37,
	UP    : 38,
	RIGHT : 39,
	DOWN  : 40,
	PAUSE : 80,
	ENTER : 13
}