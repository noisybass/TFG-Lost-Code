var TFG = TFG || {};

TFG.ClosingCredits = function() {};

  var w;
  var h;

TFG.ClosingCredits.prototype = {

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

    // Clouds
    this.clouds = createCloud(this.game, 2);
    
    // Buttons
    var close = this.game.add.button(20, this.h - 70, 'back-button', this.closeCredits, this);

    // Credits
    this.showCredits();
  },

  update: function() {
    cloudsMove(this.game);
  },

  closeCredits: function() {
    this.game.state.start('MainMenu');
  },

  showCredits: function() {

    this.credits = this.game.add.text(this.w/2, this.h/2, 
              "ESTE JUEGO HA SIDO DESARROLLADO POR:" +  
              "\nLaura María de Castro Saturio" + 
              "\nMariano Hernández García" + 
              "\nSamuel García Segador" +
              "\nCOORDINADOR DEL PROYECTO:" +
              "\nGuillermo Jiménez",
              { font: "30px Indie Flower", fill: "#000", align: "center", fontWeight: "bold" });

    this.credits.anchor.set(0.5);
  }
}

  
