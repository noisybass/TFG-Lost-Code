var TFG = TFG || {};

TFG.ClosingCredits = function() {};

  var w;
  var h;
  var box;

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

    // Game title
    var title = this.game.add.sprite(this.w/2 - 272,this.h/2-200,'title');

    // Credits box
    this.box = this.game.add.sprite(this.w/2,this.h/2 + 300,'credits');
    this.box.anchor.setTo(0.5,0.5);


    // Clouds
    this.clouds = createCloud(this.game, 2);
    
    // Buttons
    var close = this.game.add.button(20, this.h - 70, 'back-button', this.closeCredits, this);

    // Credits
    this.showCredits();
  },

  update: function() {
    cloudsMove(this.game);
    
    if ( this.box.y > 305 ) {
      this.box.y--;  
      this.credits.y--;
    }
    
  },

  closeCredits: function() {
    this.game.state.start('MainMenu');
  },

  showCredits: function() {

    this.credits = this.game.add.text(this.box.x, this.box.y, 
              "Este juego ha sido desarrollado por:" +  
              "\n Laura María de Castro Saturio" + 
              "\n Mariano Hernández García" + 
              "\n Samuel García Segador" +
              "\n con la ayuda de nuestro coordinador" +
              " Guillermo Jiménez Díaz",
              { font: "20px Indie Flower", fill: "#000", align: "left" });

    this.credits.anchor.set(0.5);
  }
}

  
