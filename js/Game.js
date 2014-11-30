var TFG = TFG || {};

TFG.Game = function() {};

var hud    = null;
var player = null;
var level  = null;

var coins = null;
var hearts = null;

var goombas = null;
var throwers = null;
var throwers_hammer = null;

TFG.Game.prototype = {

  create: function(){

    // Set background color
    this.game.stage.backgroundColor = '#009DFF';

    // Creates the HUD
    hud = new HUD(this.game);
    hud.create();

    // Creates the level
    level = new Level(this.game);
    level.create();

    // Creates player
    player = new Player(this.game);
    player.create(0, 490  , 'player_large_spritesheet',0);
     
  },

  update: function(){

    player.update();
    level.update();
  },

  render: function(){
    
    player.render();
  }

}
