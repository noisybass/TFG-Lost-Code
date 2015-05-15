var TFG = TFG || {};

TFG.AboutPhaser = function() {};


TFG.AboutPhaser.prototype = {

  preload: function() {
    this.w = this.game.width;
    this.h = this.game.height;
    this.txt = [
      'Phaser es un framework de desarrollo de videojuegos para \nmóbiles y navegadores en HTML5 de código abierto.\n\nUtiliza Pixi.js para los gráficos 2D y webGL para \nel renderizado.\n\nPhaser cuenta con una gran comunidad de usuarios, \nmuchos ejemplos y tutoriales y una muy buena documentación.',
      'En Phaser, las diferentes fases por las que pasa un \nvideojuego se representan mediante estados. \n\nAunque Phaser nos proporciona bastante flexibilidad \na la hora de establecer qué estados queremos que tenga \nnuestro juego, hay una convención a la hora de elegir\n cuáles van a ser estos estados.',
      'Como vemos a continuación, esta convención coincide\ncon la estructura general de cualquier videojuego : \n\n# Boot State : estado que define la configuración general \ndel juego. Si se va a mostrar una pantalla de carga, \ncomo ocurre en la mayoría de videojuegos, se aprovecha \npara cargar aquí los assets necesarios.',
      '# Preload State : estado en el que se cargan todos los \nassets del juego (imágenes, spritesheets, audios, \ntexturas, etc). Si hay definida una pantalla de carga, se \nmostrará en este estado.\n# MainMenu State (opcional) : estado que muestra la \npantalla de menú que se muestra antes de empezar a jugar. \nEn este punto todos los recursos ya se han cargado \nen la memoria y están listos para ser utilizados \nen el juego.\n# Game State : estado que contiene el bucle principal \ndel juego.',
      'A su vez, cada estado tiene una serie de métodos \nque son necesarios para el flujo del juego, algunos de \nlos más importantes son los siguientes :\n\n# Init : es la primera función en ser llamada.\n\n# Preload : se utiliza para cargar los recursos \nque utilizará el juego.',
      '# Create : en esta función se crean los objetos que se \nvayan a utilizar en el juego.\n\n#Update: este método es el que llamará el bucle del juego \ncada cierto tiempo.\n\n#Paused: esta función es llamada cuando el bucle \nprincipal del juego está parado.',
      'Nuestra historia comienza ahora. \n\nNuestro objetivo es ayudar a Bersara a descrubrir qué \nha pasado en su mundo.\n\nPara ello, deberemos programar ciertas acciones \nque la ayuden a superar obstáculos.',
      'Todo ello, utilizando las funciones que nos ofrece Phaser.\n\nSi en algún momento te encuentras perdido, utiliza \n el boton "Mostrar documentación" del menu.\n\nAllí encontrarás toda la información sobre las funciones \ny métodos de Phaser.',
      'Mucha suerte.'     

      ];
      this.pos = 0;
  },

  create: function() {
    
    // Menu settings...
    this.game.stage.backgroundColor = '#009DFF';

    // Background
    this.bg = this.game.add.sprite(this.w/2,this.h/2,'menu');
    this.bg.anchor.setTo(0.5,0.5);

    // Game title
    this.title = this.game.add.sprite(this.w/2 - 272, this.h/2-200, 'title');

    // Clouds
    this.clouds = createCloud(this.game, 2);
    
    // Buttons
    var skip = this.game.add.button(0, this.h - 70, 'skip-button', this.skipCredits, this);
    var next = this.game.add.button(this.w - 100, this.h - 70, 'next-button', this.nextCredit, this);

    // About Phaser
    this.showAboutPhaser();
  },

  update: function() {
    
    cloudsMove(this.game);
    this.bg.y+=5;
    if ( this.bg.y > this.h ) {
      this.bg.destroy();
    }
    this.about.y-= 0.5;  
    if ( this.about.y < this.title.y ) {
      this.nextCredit();
    }
  },

  skipCredits: function() {
    $('#button_menu_2').fadeIn(500);
    this.game.state.start('Game');
  },

  nextCredit: function() {

    if ( this.pos < this.txt.length )  {
      this.about.destroy();
      this.about = this.game.add.text(120, this.h/2+300, this.txt[this.pos],
                { font: "22px customFont", fill: "#fff" });
      this.configText();
      this.pos++;  
    }
    else {
      this.skipCredits();
    }
    
  },

  showAboutPhaser: function() {

    this.about = this.game.add.text(120 , this.h/2+300, this.txt[this.pos],
              { font: "22px customFont", fill: "#fff" });
    this.pos++;
    this.configText();
    
  },

  configText: function() {
    this.about.shadowColor = "#000";
    this.about.shadowBlur = 10;
    this.about.shadowOffsetX = 0.2;
  }
}

  
