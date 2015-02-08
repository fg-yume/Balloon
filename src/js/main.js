"use strict";

// encompass the entire app within this variable
var app = app || {};

Modernizr.load(
{
		load : [
			"js/maps.js",
			"js/globals.js",	
			"js/button.js",
			"js/utility.js",
			"js/mouse.js",
			"js/controls.js",
			"js/obstacle.js",
			"js/resources.js",
			"js/player.js",
			"js/game.js",
			"js/balloon.js"
		],
		
		/*
		 * Function that is invoked on load completion.
		 *
		 * Entry point for the application
		 */
		complete : function()
		{
			// Event listeners --------------------------
			
			/*
			 * Set the pause screen in the game if we're currently in-game
			 */
			window.addEventListener('blur', function(){
				// stop updating
				cancelAnimationFrame(app.animationID);
			
				// 'pause' the game if we're in that state
				if( app.main.currentState == app.APP_STATE.GAME )
				{
					app.game.currentState == app.GAME_STATE.PAUSED;
					app.game.changeState();
				}
			});
			
			/*
			 * Start up functionality once we resume focus
			 */
			window.addEventListener('focus', function(){
				// start updating again
				if(app.main.currentState == app.APP_STATE.GAME)
				{
					app.game.loop();
				}
				
				else
				{
					app.main.loop();
				}
			});
			
			/*
			 * Mark the keydown array with the keys being pressed
			 */
			window.addEventListener('keydown', function(e){
				app.input.keydown[e.keyCode] = true;

				
				if(app.main.currentState == app.APP_STATE.GAME)
				{
					e.preventDefault();
					app.input.keydown[e.keyCode] = true;

					app.game.player.move(e.keyCode);
				}
				
				if(app.main.currentState == app.APP_STATE.MAP)
				{
					if(app.input.keydown[app.KEYS.ENTER])
						app.maps.mainSearch();
				}
			});
			
			/*
			 * Remove the values from the keydown array that are no longer pressed
			 */
			window.addEventListener('keyup', function(e){
				if(app.input.keydown[e.keyCode])
				{
					app.input.keydown[e.keyCode] = false;
				}
			});
			
			/*
			 * Update position of mouse and set state to MOUSE_STATE.DRAG
			 * if mouse is already down
			 */
			document.querySelector('#canvas').addEventListener('mousemove', function(e){
				// Only dragging if mouse is down
				if(app.input.mouse.currentState == app.MOUSE_STATE.DOWN)
				{
					app.input.mouse.setState(app.MOUSE_STATE.DRAG);
				}
				
				app.input.mouse.update(e);
			});
			
			/*
			 * Update position of mouse and set state to MOUSE_STATE.DOWN
			 */
			document.querySelector('#canvas').addEventListener('mousedown', function(e){
				app.input.mouse.setState(app.MOUSE_STATE.DOWN);
				
				app.input.mouse.update(e);
			});
			
			/*
			 * Update position of mouse and set state to MOUSE_STATE.UP
			 * This will cause a click
			 */
			window.addEventListener('mouseup', function(e){
				app.input.mouse.setState(app.MOUSE_STATE.UP);
				
				app.input.mouse.update(e);
			});

			document.querySelector("#startButton").addEventListener('click', function(e){
				if(app.main.currentState == app.APP_STATE.MAP)
				{
					app.main.currentState = app.APP_STATE.GAME;
					app.maps.sendData();
				}
			});
			
			// start up the game
			app.main.init();
		}

});

