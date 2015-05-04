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

    // Game title
    var title = this.game.add.sprite(this.w/2 - 250,this.h/2-200,'title');

    // Buttons
    var close = this.game.add.button(this.w/2 - 50, this.h/2, 'close-button', this.closeCredits, this);
    

    // Clouds
    this.clouds = createCloud(this.game, 2);
  
  
  },

  update: function() {
    
  },

  closeCredits: function() {
    this.game.state.start('MainMenu');
  }

 
}


/*

	,

  showCredits: function() {
    var text = "This game has been develop by:" +  
               "\n* Laura María de Castro Saturio" + 
               "\n* Mariano Hernández García" + 
               "\n* Samuel García Segador" +
               "\n with our [COODINADOR EN INGLES]" +
               " Guillermo Jiménez";
    var style = { font: "14px Arial", fill: "#000", align: "left" };
    this.credits = this.game.add.text(this.w - 110, this.h - 40, text, style);
    this.credits.anchor.set(0.5);
  }

*/