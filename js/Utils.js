/* 
 *	Functions and methods for use in all classes.
 *
 *
 */

var TFG = TFG || {};

TFG.Utils = function(){};


var generateInteger = function(game) {
	return game.rnd.integer();
}

var generateInteger = function(game, min, max) {
	return game.rnd.integer(min, max);
};