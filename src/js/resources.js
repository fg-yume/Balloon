"use strict";

// Encompass all the application within var
var app = app || {};

// The various resources available for the game
app.resources = {
	doneLoading	: false,
	
	food : {
		burger		: new Image(),
		fries		: new Image(),
		icecream	: new Image(),
		pizza		: new Image()
	},
	
	doneLoaded		: false,
	
	init : function()
	{
		// Event listeners for the images
		this.food.burger.addEventListener("load",function(){
			app.resources.burgerLoaded = true;
		});
		this.food.fries.addEventListener("load",function(){
			app.resources.friesLoaded = true;
		});
		this.food.icecream.addEventListener("load",function(){
			app.resources.icecreamLoaded = true;
		});
		this.food.pizza.addEventListener("load",function(){
			app.resources.pizzaLoaded = true;
		});
		
		// Load the images
		this.food.burger.src	= "assets/art/1_burger.png";
		this.food.fries.src		= "assets/art/1_fries.png";
		this.food.icecream.src	= "assets/art/1_icecream.png";
		this.food.pizza.src		= "assets/art/1_pizza.png";
	},
	
	update : function()
	{
		this.doneLoaded = this.burgerLoaded && this.friesLoaded &&
				this.icecreamLoaded && this.pizzaLoaded;
				
		console.log(this.burgerLoaded);
		console.log(this.friesLoaded);
		console.log(this.icecreamLoaded);
		console.log(this.pizzaLoaded);
	}
};