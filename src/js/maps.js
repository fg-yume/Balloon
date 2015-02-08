"use strict";

var app = app || {};

app.maps = {

	// Markers are stored after creation so they can be deleted properly later
	markers : [],
	// Simple array of search terms
	fastFood : ["McDonald's","Wendy's","Burger King","Taco Bell", "Five Guys",
	"In-N-Out", "Subway", "KFC", "Pizza Hut", "Domino;s", "Dunkin' Donuts", "Dairy Queen",
	"Papa John's", "Arby's", "Au Bon Pain", "Baskin-Robbins", "Buffalo Wild Wings",
	"Carl's Jr.", "Chipotle", "Denny's", "Hardee's", "Little Caesars", "Olive Garden", 
	"Long John Silver's", "Nando's", "Panera Bread", "Sonic", "White Castle", "Johnny " +
	"Rockets", "Waffle House", "IHOP", "Quiznos", "Red Lobster"],
	// The map declared globally since only one is used, and it's accessed and
	// mutated by the entire document
	map : undefined,
	// hitMap stores the number of hits of each of the fastFood restaurants
	hitMap : [],
	// Stores images that need to be painted and repainted
	img : [],
	// Used by mainSearch
	searchBox : undefined,
	service : undefined,

	/*
	 * Initializes the map using the google maps API
	 */
	initialize : function()
	{
		// Set up the map settings
        var mapCanvas = document.querySelector('#mapCanvas');
        var mapOptions = {
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(mapCanvas, mapOptions)
        // Map bounds
        var defaultBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(32, -102),
          new google.maps.LatLng(45, -92));
        this.map.fitBounds(defaultBounds);

        // Set up the search box
        var input = document.getElementById('pac-input');
        this.map.controls[google.maps.ControlPosition.TOP].push(input);
        this.searchBox = new google.maps.places.SearchBox(input);

        // Set up the radar search
        this.service = new google.maps.places.PlacesService(this.map);

        this.draw();

        for(var element in this.fastFood) {
        	this.hitMap[this.fastFood[element]] = 0;
        }
        this.hitMap['total'] = 0

        // Set up the search listener
        google.maps.event.addListener(this.searchBox, 'places_changed', app.maps.mainSearch);
	},

	// Invoked every time a player selects a location
	mainSearch : function() 
	{
	    this.clearMarkers();
	    var places = this.searchBox.getPlaces();
	    if(places.length===0) 
	    {
	      return;
	    }

	    // Loads image for the main location marker
	    var image = {
	      url: places[0].icon,
	      size: new google.maps.Size(71, 71),
	      origin: new google.maps.Point(0, 0),
	      anchor: new google.maps.Point(17, 34),
	      scaledSize: new google.maps.Size(25, 25)
	    };

	    // Generates the main search marker
	    var marker = new google.maps.Marker(
	    {
	      map: this.map,
	      icon: image,
	      title: places[0].name,
	      position: places[0].geometry.location
	    });

	    this.markers.push(marker);

	    // Snaps and zooms the camera to the selected location
	    this.map.setCenter(marker.getPosition());
	    this.map.setZoom(14);

	    // Clears hitmap
	    console.log("hitmap before clear: ");
	    console.log(this.hitMap);

	    for(element in this.hitMap) {
	      this.hitMap[element] = 0;
	    }

	    // Iterates and tracks hits
	    for(var element in this.fastFood) {
	      var request = {
	        location: places[0].geometry.location,
	        radius: document.getElementById('slider').value * 8 + 200,
	        name: this.fastFood[element]
	      }
	      this.service.radarSearch(request, function(results, status) { app.maps.callback(results, status, app.maps.fastFood[element])})
	    }
  	},

  	// Invoked repeatedly by radarSearch (above)
  	callback : function(results, status, name) 
  	{
  		console.log(name);

	    // Creates a marker for each hit
	    for(var element in results)
	    {
	      var marker = new google.maps.Marker({
	        map: this.map,
	        position: results[element].geometry.location
	      });

	      // Stores the marker and updates the hitMap
	      this.markers.push(marker);

	      if(this.hitMap[name] === undefined)
	      	this.hitMap[name] = 1;

	  	  else
	  	  {
	  	  	this.hitMap[name] = this.hitMap[name] + 1;
	  	  }

	      if(this.hitMap['total'] === undefined)
	      	this.hitMap['total'] = 1;

	      else
	      	this.hitMap['total'] = this.hitMap['total'] + 1;
	    }

	    console.log(this.hitMap);
	},

	// Accessor for hitMap
	getHitMap : function() 
	{
	    return this.hitMap;
	},

	// Deletes all markers
	clearMarkers : function() 
	{
	    for(var element in this.markers) {
	      this.markers[element].setMap(null);
	      delete this.markers[element];
	    }
	},

	// Used to move the cityscape at the bottom
    draw : function() 
    {
        var canvas = document.querySelector("#scrolling");
        var ctx = canvas.getContext("2d");
        var xPos = [0, 565, 1130];

        this.img['cityscape'] = new Image();
        this.img['cityscape'].onload = function() {
        	ctx.drawImage(app.maps.img['cityscape'], 0, 0, 565, 130);
        };
        this.img['cityscape'].src = "assets/art/bkgd.png";

        this.img[2] = new Image();
        this.img[2].onload = function() {
        	ctx.drawImage(app.maps.img[2], 565, 0, 565, 130);
        }
        this.img[2].src = "assets/art/bkgd.png";

        this.img[3] = new Image();
        this.img[3].onload = function() {
        	ctx.drawImage(app.maps.img[3], 1130, 0, 565, 130);
        }
        this.img[3].src = "assets/art/bkgd.png";

        window.setInterval(function() {app.maps.update(ctx, xPos)}, 100);
    },

    update : function(ctx, xPos)
    {
    	ctx.clearRect(0,0,1000,130);
    	ctx.drawImage(app.maps.img['cityscape'], xPos[0], 0, 565, 130);
    	ctx.drawImage(app.maps.img[2], xPos[1], 0, 565, 130);
    	ctx.drawImage(app.maps.img[3], xPos[2], 0, 565, 130);
    	for(var element in xPos) {
    		xPos[element] -= 1;
    		if (xPos[element]==-565) {
    			xPos[element]+= 1695;
    		}
    	}
    },

    // Used to hide all elements of the map screen
    hide : function() 
    {
        var array = ["pac-input", "mapCanvas", "slider", "sliderShell", "labelShell", "label1",
          "label2", "label3", "cityscape-canvas", "scrolling", "buttonShell", "mapShell"];
        for(element in array) {
          document.getElementById(array[element]).className += " invisible";
        }
    },

    /*
     * sends data from maps over to the game
     */
    sendData : function()
    {
    	console.log(this.hitMap);

    	var jsonString = JSON.stringify(this.hitMap);

    	console.log(jsonString);

    	// hide map
    	document.querySelector("#mapShell").style.display = "none";

    	app.game.init(this.hitMap);
    }
};