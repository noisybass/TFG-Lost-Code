var TFG = TFG || {};

TFG.Game = function() {};

var hud    = null;
var player = null;
var level  = null;

var coins = null;
var hearts = null;

var goombas = null;
var throwers = null;
var throwers_hammer = null;

TFG.Game.prototype = {

  a: function() {
    var text1 = $('#id-code-js-1').text();
    var text2 = $('#id-code-js-textarea').val();
    var text3 = $('#id-code-js-2').text();
    //send to server and process response
    //console.log(this);
    console.log(text1 + text2 + text3);
    eval(text1 + text2 + text3);
    this.game.paused=false
  },

  create: function(){

    // Set background color
    this.game.stage.backgroundColor = '#009DFF';

    // Creates the HUD
    hud = new HUD(this.game);
    hud.create();

    // Creates the level
    level = new Level(this.game);
    level.create();

    // Creates player
    player = new Player(this.game);
    player.create(100, 100  , 'player_large_spritesheet',0);

    var that = this;
    $('#id-code-js-button').click(function() {that.a.call(that)});
    
    //console.log(player.move);
  },

  update: function(){

    player.update();
    level.update();
  }
}
