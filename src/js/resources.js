"use strict";

// Encompass all the application within var
var app = app || {};

// The various resources available for the game
app.resources = {
	burgerLoaded	: false,
	friesLoaded		: false,
	icecreamLoaded	: false,
	pizzaLoaded		: false,
	hotdogLoaded	: false,
	sodaLoaded		: false,
	donutLoaded		: false,
	tacoLoaded		: false,
	chickenLoaded	: false,

	homeScreenLoaded	: false,

	playButtonLoaded	: false,
	rulesButtonLoaded	: false,
	
	// various food types available
	food : {

		burger		: new Image(),
		fries		: new Image(),
		icecream	: new Image(),
		pizza		: new Image(),
		hotdog		: new Image(),
		chicken		: new Image(),
		soda		: new Image(),
		donut		: new Image(),
		taco        : new Image()
	},

	// screens available
	screens : {
		homeScreen	: new Image()
	},

	// ui elements available
	ui : {
		playButton	: new Image(),
		rulesButton : new Image()
	}
	
	doneLoaded		: false,
	
	/*
	 * Initializes the loading of all the assets for the game
	 */
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
		this.food.hotdog.addEventListener("load", function(){
			app.resources.hotdogLoaded = true;
		});
		this.food.chicken.addEventListener("load", function(){
			app.resouces.chickenLoaded = true;
		});
		this.food.soda.addEventListener("load", function(){
			app.resources.sodaLoaded = true;
		});
		this.food.taco.addEventListener("load", function(){
			app.resources.tacoLoaded = true;
		});
		this.food.donut.addEventListener("load", function(){
			app.resources.donutLoaded = true;
		});

		this.screens.homeScreen.addEventListener("load", function(){
			app.resources.homeScreenLoaded = true;
		});

		this.ui.playButton.addEventListener("load", function(){
			app.resources.playButtonLoaded = true;
		});
		this.ui.rulesButton.addEventListener("load", function(){
			app.resources.rulesButtonLoaded = true;
		});
		
		// Load the images
		this.food.burger.src	= "assets/art/1_burger.png";
		this.food.fries.src		= "assets/art/1_fries.png";
		this.food.icecream.src	= "assets/art/1_icecream.png";
		this.food.pizza.src		= "assets/art/1_pizza.png";
		this.food.hotdog.src    = "assets/art/Soda.png";
		this.food.chicken.src   = "assets/art/Chicken.png";
		this.food.soda.src 		= "assets/art/Soda.png";
		this.food.taco.src  	= "assets/art/Taco.png";
		this.food.donut.src 	= "assets/art/Donut.png";

		this.screens.homeScreen.src = "assets/art/homescreen.png";

		this.ui.playButton.src 		= "assets/art/Play.png";
		this.ui.rulesButton.src 	= "assets/art/Rules.png";
	},
	
	/*
	 * Updates done loaded to be true when all the art has been
	 * loaded
	 */
	update : function()
	{
		this.doneLoaded = this.burgerLoaded && this.friesLoaded &&
				this.icecreamLoaded && this.pizzaLoaded &&
				this.hotdogLoaded && this.chickenLoaded && 
				this.sodaLoaded && this.tacoLoaded &&
				this.donutLoaded && this.homeScreenLoaded &&
				this.playButtonLoaded && this.rulesButtonLoaded;
	}
};