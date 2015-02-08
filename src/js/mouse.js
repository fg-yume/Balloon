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
	}
	
	Mouse.prototype.update = function(e)
	{
		this.pos.x = app.canvas.scrollLeft + e.clientX - app.OFFSET_LEFT;
		this.pos.y = app.canvas.scrollTop + e.clientY - app.OFFSET_TOP;
		
		//console.log("[" + this.pos.x + "," + this.pos.y + "]");
	}
	
	Mouse.prototype.setState = function(state)
	{
		this.currentState = state;
	
		switch(this.currentState)
		{
			case app.MOUSE_STATE.DOWN:
			{
				console.log("mouse down");
				this.clicked = false;
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
				break;
			}
			
			default:
			{
				this.clicked = false;
			}
		}
	}
	
	return Mouse;
})();