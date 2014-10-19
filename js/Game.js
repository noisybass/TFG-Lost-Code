var TFG = TFG || {};

TFG.Game = function(){};

var player;
var level;

TFG.Game.prototype = {

  create: function (){
    // Set world dimensions...
    // Set level...
    // Create player...
    // Pongo el background de otro color para diferenciar, pero esto luego se quita

    this.game.stage.backgroundColor = '#000';
    player = new Player(this.game);
    level = new Level(this.game);
    player.create(32, 32, 'player',0)
    level.create(player);
  },

  update: function (){
    player.update();
    level.update();
  },

  render: function (){
    player.render();
  }
}
