var TFG = TFG || {};

TFG.ClosingCredits = function() {};

  var w;
  var h;
  var box;
  var txt;

TFG.ClosingCredits.prototype = {

  preload: function() {
    this.w = this.game.width;
    this.h = this.game.height;
    this.txt = "Este proyecto ha sido desarrollado por :" +  
              "\n# Laura María de Castro Saturio" + 
              "\n[github.com/lauradcs4]" +
              "\n# Mariano Hernández García" + 
              "\n[github.com/mariano2AA3]" +
              "\n# Samuel García Segador" +
              "\n[github.com/ZaruWright]" +
              "\n\nCoordinador del proyecto :" +
              "\n# Guillermo Jiménez Díaz   " +
              "\n\nUniversidad Complutense de Madrid" +
              "\nCurso 2014/2015" +
              "\n\nTecnología utilizada :" +
              "\n# Phaser v2.1.2  " +
              "\n# Ace editor vXX " + 
              "\n# Boostrap v3.3.2" + 
              "\n# TWUnit v1.0.0  " + 
              "\n# Dialogs v1.0.4 " + 
              "\n# JQuery v2.1.0  " +
              "\n\nAssets : " + 
              "\n# Kenney.com" +
              "\n\nAgradecimientos :" +
              "\n# Padres y madres" +
              "\n# Hermanos y hermanas" +
              "\n# Abuelos y abuelas" +
              "\n# Tios y tias" +
              "\n# Primos y primas" +
              "\n..." +
              "\n# Familia entera" +
              "\n\n\nTodos los derechos reservados";
  },

  create: function() {
    
    // Menu settings...
    this.game.stage.backgroundColor = '#009DFF';

    // Background
    this.bg = this.game.add.sprite(this.w/2, this.h/2, 'menu');
    this.bg.anchor.setTo(0.5, 0.5);

    // Game title
    var title = this.game.add.sprite(this.w/2 - 272, this.h/2-200, 'title');

    // Clouds
    this.clouds = createCloud(this.game, 2);
    
    // Buttons
    var close = this.game.add.button(20, this.h - 70, 'back-button', this.closeCredits, this);

    // Credits
    this.showCredits();
  },

  update: function() {

    cloudsMove(this.game);
    this.bg.y+=5;
    if ( this.bg.y > this.h ) {
      this.bg.destroy();
    }
    this.credits.y--;    
  },

  closeCredits: function() {

    this.game.state.start('MainMenu');
  },

  showCredits: function() {

    this.credits = this.game.add.text(this.w/2 - 200 , this.h/2+300, this.txt,
              { font: "24px customFont", fill: "#fff", align: "center" });
    this.credits.shadowColor = "#000";
    this.credits.shadowBlur = 10;
    this.credits.shadowOffsetX = 0.2;
  }
}

  
