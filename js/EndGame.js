var TFG = TFG || {};

TFG.EndGame = function() {};

  var w;
  var h;

TFG.EndGame.prototype = {

  preload: function() {
    this.w = this.game.width;
    this.h = this.game.height;
  },

  create: function() {
    
    // Menu settings...
    this.game.stage.backgroundColor = '#000';

    loadDialog(8, TFG.game, function(){ TFG.game.state.start('MainMenu'); } );
    $('img#right_person').remove();
    $('img#left_person').css('margin-left', (this.w/2 - 60) + 'px');
  },

  update: function() { }

}

  
