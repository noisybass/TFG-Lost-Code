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

  submitCode: function() {
    /*
    var text1 = $('#id-code-js-1').text();
    var text2 = $('#id-code-js-textarea').val();
    var text3 = $('#id-code-js-2').text();
    //send to server and process response
    //console.log(this);
    console.log(text1 + text2 + text3);
    console.log(blocks.getChildAt(0).data.target);
    //eval(text1 + text2 + text3);
    eval("this." + blocks.getChildAt(0).data.target + " = function(){" + text1 + text2 + text3 + "};");
    blocks.getChildAt(0).destroy();
    this.game.paused=false;*/
    var text = editor.getValue();
    console.log(text);
    eval("this." + blocks.getChildAt(0).data.target + "=" + text);

    //Activar Evento flecha Izquierda
    this.cursors.left.isDown = true;

    var x = this.sprite.body.velocity.x;
    this.move();
    var that = this;


    /*module( "Aprendiendo a Mover a la izquierda" );
    test( 'Problemas con la función move()', function() {
        
        ok( that.sprite.animations.currentAnim === that.sprite.animations._anims["player_animation_moveLeft"], "Cambiar la animación para moverse a la izquierda");
        ok( that.sprite.body.velocity.x == that.MAX_VELOCITY_X * (-1) , "Mover personaje a la izquierda.");
        ok( that.direction == State.LOOKINGLEFT , "Cambiar sprite para que mire hacia la izquierda.");
    } );*/

    tw = new TWUnit();
    tw.addAssert("Animation", that.sprite.animations.currentAnim === that.sprite.animations._anims["player_animation_moveLeft"], "Cambiar la animación para moverse a la izquierda", "Porque no pruebas con el play...");
    tw.addAssert("Direccion",that.direction == State.LOOKINGLEFT, "Cambiar sprite para que mire hacia la izquierda.", "Podrías mirar el objeto State, aver que se te ocurre...");
    tw.addAssert("Velocidad", that.sprite.body.velocity.x == that.MAX_VELOCITY_X * (-1), "Mover personaje a la izquierda.", "Si ir a la derecha es positivo, a la izquierda será...");
    /*tw.addModule("Move");
    tw.addAssert("PruebaSegundoModulo", true === true, "es una tonteria", "lo es");
    tw.addModule("Prueba");
    tw.runModules();*/
    tw.runAsserts();
    if (/*tw.modulesOk()*/ tw.assertsOk()){
        blocks.getChildAt(0).destroy();
        this.game.paused=false;
    }

    //Desactivar Evento flecha Izquierda
    this.cursors.left.isDown = false;
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
    $('#submit-button').click(function() {that.submitCode.call(player)});
    
    //console.log(player.move);
  },

  update: function(){

    player.update();
    level.update();
  }
}
