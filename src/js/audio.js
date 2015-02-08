"use strict";

var app = app || {};

app.audio = {

	initialize : function() {
		var track = document.getElementById("track");
	},
	
	bite : function() {
		var bite = document.getElementById("bite");
		bite.play();
	},

	drink : function() {
		var drink = document.getElementById("drink");
		drink.play();
	},

	gameOver : function() {
		var gameOver = document.getElementById("gameOver");
		gameOver.play();
	}

}