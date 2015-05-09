var TFG = TFG || {};

TFG.AboutPhaser = function() {};

  var w;
  var h;
  var box;
  var txt;

TFG.AboutPhaser.prototype = {

  preload: function() {
    this.w = this.game.width;
    this.h = this.game.height;
    this.txt = [
      'Phaser es un motor de videojuegos en 2D \npara crear videojuegos en HTML5 para navegadores,\nya sea para teléfonos móviles o para escritorio.\nSoporta el renderizado de Canvas y de WebGL',
      'En Phaser, las diferentes fases por las que va a pasar\nun juego se representan mediante estados. \n\nAunque Phaser nos proporciona bastante flexibilidad \na la hora de establecer qué estados queremos que tenga \nnuestro juego, hay una convención a la hora de elegir\n cuáles van a ser estos estados.',
      'Como vemos a continuación, esta convención coincide\ncon la estructura general de cualquier videojuego : ',
      '# Boot State : estado que define la configuración general \ndel juego. Si se va a mostrar una pantalla de carga, \ncomo ocurre en la mayoría de videojuegos, se aprovecha \npara cargar aquí los assets necesarios.',
      '# Preload State : estado en el que se cargan todos los \nassets del juego (imágenes, spritesheets, audios, \ntexturas, etc). Si hay definida una pantalla de carga, se \nmostrará en este estado.',
      '# MainMenu State (opcional) : estado que muestra la \npantalla de menú que se muestra antes de empezar a jugar. \nEn este punto todos los recursos ya se han cargado \nen la memoria y están listos para ser utilizados \nen el juego.',
      '# Game State : estado que contiene el bucle principal \ndel juego.',
      'A su vez, cada estado tiene una serie de métodos \nque son necesarios para el flujo del juego, algunos de \nlos más importantes son los siguientes :\n\n# Init : es la primera función en ser llamada.\n# Preload : se utiliza para cargar los recursos \nque utilizará el juego.',
      '# Create : en esta función se crean los objetos que se \nvayan a utilizar en el juego.\n#Update: este método es el que llamará el bucle del juego \ncada cierto tiempo.\n#Paused: esta función es llamada cuando el bucle \nprincipal del juego está parado.'     

      ];
      this.pos = 0;
  },

  create: function() {
    
    // Menu settings...
    this.game.stage.backgroundColor = '#009DFF';

    // Background
    var bg = this.game.add.sprite(this.w/2,this.h/2,'menu');
    bg.anchor.setTo(0.5,0.5);

    // Game title
    var title = this.game.add.sprite(this.w/2 - 272, this.h/2-200, 'title');

    // Credits box
    this.box = this.game.add.sprite(this.w/2 - 250, this.h/2 + 300, 'credits');
    //this.box.anchor.setTo(0.5, 0.5);


    // Clouds
    this.clouds = createCloud(this.game, 2);
    
    // Buttons
    var skip = this.game.add.button(20, this.h - 70, 'skip-button', this.skipCredits, this);
    var next = this.game.add.button(620, this.h - 70, 'next-button', this.nextCredit, this);

    // About Phaser
    this.showAboutPhaser();
  },

  update: function() {
    cloudsMove(this.game);
    
    if ( this.box.y > 285 ) {
      this.box.y--;  
      this.about.y--;
    }
    
  },

  skipCredits: function() {
    $('#button_menu_2').fadeIn(500);
    this.game.state.start('Game');
  },

  nextCredit: function() {


    if ( this.pos < this.txt.length )  {
      this.box.x = this.w/2 - 250;
      this.box.y = this.h/2 + 300
      this.about.destroy();
      this.about = this.game.add.text(this.box.x + 10, this.box.y + 10, this.txt[this.pos],
                { font: "20px customFont", fill: "#fff" });
      this.pos++;  
    }
    else {
      this.skipCredits();
    }
    
  },

  showAboutPhaser: function() {

    this.about = this.game.add.text(this.box.x + 10, this.box.y + 10, this.txt[this.pos],
              { font: "20px customFont", fill: "#fff" });
    this.pos++;

    //this.about.anchor.setTo(0.5, 0.5);
  }
}

  
