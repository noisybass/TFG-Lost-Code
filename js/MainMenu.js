var TFG = TFG || {};

TFG.MainMenu = function() {};

  var w;
  var h;
  var clouds;

TFG.MainMenu.prototype = {

  preload: function() {
    this.w = this.game.width;
    this.h = this.game.height;
  },

  create: function() {
    
    // Menu settings...
    this.game.stage.backgroundColor = '#009DFF';

    // Background
    var bg = this.game.add.sprite(this.w/2,this.h/2,'menu');
    bg.anchor.setTo(0.5,0.5);

    // Game title
    var title = this.game.add.sprite(this.w/2 - 250,this.h/2-200,'title');

    // Buttons
    var button_play = this.game.add.button(this.w/2 - 50, this.h/2, 'play-button', this.playGame, this);

    // Clouds
    this.clouds = createCloud(this.game, 5);
  
    var text = "Desarrollado por: \nLaura María de Castro Saturio \nMariano Hernández García \nSamuel García Segador";
    var style = { font: "14px Arial", fill: "#000", align: "left" };
    var t = this.game.add.text(this.w - 110, this.h - 40, text, style);
    t.anchor.set(0.5);
    
  },

  update: function() {
    cloudsMove(this.game);
  },

  playGame: function() {
    this.game.state.start('Game');
  }

}
