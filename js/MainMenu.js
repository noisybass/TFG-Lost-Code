var TFG = TFG || {};

TFG.MainMenu = function{};

TFG.MainMenu.prototype = function{

  preload:function(){

  },

  create: function(){

  },

  update: function(){
    this.game.state.start('Game');
  }
}
