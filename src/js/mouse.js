"use strict";

var app = app || {};

app.Mouse = (function()
{
	var Mouse = function(x,y)
	{
		this.pos = {
			x : x,
			y : y
		};
		
		this.currentState	= app.MOUSE_STATE.UP;
		this.clicked		= false;
	};
	
	Mouse.prototype.update = function(e)
	{
		this.pos.x = -(app.OFFSET_LEFT - e.clientX + app.canvas.scrollLeft); //app.canvas.scrollLeft;// +e.clientX;// - app.OFFSET_LEFT;
		this.pos.y =   -(app.OFFSET_TOP - e.clientY + app.canvas.scrollTop); //app.canvas.scrollTop ;//+ e.clientY;// - app.OFFSET_TOP;
		
		//console.log("[" + this.pos.x + "," + this.pos.y + "]");
	};

	Mouse.prototype.updateClick = function()
	{
		if(this.clicked)
			this.clicked = false;
	};
	
	Mouse.prototype.setState = function(state)
	{
		this.currentState = state;
	
		switch(this.currentState)
		{
			case app.MOUSE_STATE.DOWN:
			{
				console.log("mouse down");
				this.clicked = false;

				console.log("[" + this.pos.x + "," + this.pos.y + "]");
				break;
			}
			
			case app.MOUSE_STATE.DRAG:
			{
				console.log("mouse drag");
				this.clicked = false;

				break;
			}
		
			case app.MOUSE_STATE.UP:
			{
				console.log("mouse click");
				this.clicked = true;

				console.log("[" + this.pos.x + "," + this.pos.y + "]");

				if(app.main.currentState == app.APP_STATE.GAME)
				{
					app.game.checkButtons();
				}
				
				break;
			}
			
			default:
			{
				this.clicked = false;
			}
		}
	};
	
	return Mouse;
})();