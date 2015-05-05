var TFG = TFG || {};

TFG.MainMenu = function() {};

  var w;
  var h;
  

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

    // Clouds
    createCloud(this.game, 2);

    // Game title
    var title = this.game.add.sprite(this.w/2 - 250,this.h/2-200,'title');

    // Buttons
    var button_play    = this.game.add.button(this.w/2 - 50, this.h/2,     'play-button',    this.playGame, this); // admite 3 paramatros mas, int frame: over, out down 
    var button_credits = this.game.add.button(this.w/2 - 75, this.h/2+100, 'credits-button', this.showCredits, this);
  
  },

  update: function() {
    cloudsMove(this.game);
  },

  playGame: function() {
    $('#button_menu_1').fadeIn(500);
    $('#button_menu_2').fadeIn(500);
    this.game.state.start('Game');
  },

  showCredits: function() {
    this.game.state.start('ClosingCredits');
  }
 
}
