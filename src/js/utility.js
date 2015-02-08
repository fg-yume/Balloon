"use strict";

var app = app || {};

app.utility = {
	/*
	 * Checks if the sets of points intersect with each other
	 */
	intersects : function(aPosX, aPosY, aWidth, aHeight, bPosX, bPosY, bWidth, bHeight)
	{
		return !( bPosX > (aPosX + aWidth) ||
				  (bPosX + bWidth) < aPosX ||
				  bPosY > (aPosY + aHeight) ||
				  (bPosY + bHeight) < aPosY );
 	}
};