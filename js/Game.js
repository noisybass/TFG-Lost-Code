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

var currentTask = null;

TFG.Game.prototype = {

  submitCode: function() {

    /* 1- Obtener el codigo */
    var text = editor.getValue();

    //habilitamos los eventos para poder lanzar eventos virtuales
    this.game.input.disabled = false;
    clearListeners.call(this);


    /* 2- Testear el codigo */
    // Ejecutar la funcion de test correspondiente y obtener el resultado

    /* 3.1- Si ha acertado ejecutamos su codigo, eliminamos el codigo del editor, currentTask = null y desbloqueamos el juego */
    
    try{
        if (eval(currentTask.test)) {
            eval(currentTask.target + "=" + text);
            editor.getSession().setValue("", -1);
            currentTask = null;
            this.game.paused = false;
        }
        else {
            // volver a deshabilitar los eventos para poder escribir bien en ace
            this.game.input.disabled = true;
        }
    }
    catch(e){
        console.log(e);
        tw = new TWUnit();
        tw.addAssert("Error de compilación", true == false, "", e.message);
        tw.runAsserts();
        // volver a deshabilitar los eventos para poder escribir bien en ace
        this.game.input.disabled = true;
    }

  },

  create: function() {

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
    player.create(150, 480 ,'player_spritesheet', 0);

    var that = this;
    $('#submit-button').click(function() {that.submitCode.call(player)});
    $('#restart-button').click(setTask);
    
  },

  update: function(){

    player.update();
    level.update();
  }
}


var testMoveLeft = function (text) {
    tw = new TWUnit();
    var fakePlayer = player;

    eval("fakePlayer.move =" + text);

    fakePlayer.cursors.left.isDown = true;
        fakePlayer.move();
    fakePlayer.cursors.left.isDown = false;

    
    tw.addAssert("Animación", fakePlayer.sprite.animations.currentAnim === player.sprite.animations._anims["player_animation_moveLeft"], "Cambiar la animación para moverse a la izquierda", "Porque no pruebas con el play...");
    tw.addAssert("Direccion", fakePlayer.direction == State.LOOKINGLEFT, "Cambiar sprite para que mire hacia la izquierda.", "Podrías mirar el objeto State, aver que se te ocurre...");
    tw.addAssert("Velocidad", fakePlayer.sprite.body.velocity.x == fakePlayer.MAX_VELOCITY_X * (-1), "Mover personaje a la izquierda.", "Si ir a la derecha es positivo, a la izquierda será...");
    tw.runAsserts();


    return tw.assertsOk();
}

var testJump = function (text) {

    tw = new TWUnit();
    var fakePlayer = player;

    eval("fakePlayer.jump =" + text);

    fakePlayer.cursors.up.isDown = true;

    fakePlayer.jump();
    tw.addAssert("Animation", fakePlayer.sprite.animations.currentAnim === player.sprite.animations._anims["player_animation_jumpRight"], "Cambiar la animación al saltar cuando el jugador mira a la derecha", "Porque no pruebas con el play....");
    tw.addModule("Si el jugador esta mirando a la derecha");
    fakePlayer.cursors.up.isDown = false;

    /*fakePlayer.cursors.up.isDown = true;
    fakePlayer.direction = State.LOOKINGLEFT;
    fakePlayer.jump();
    tw.addAssert("Animation", fakePlayer.sprite.animations.currentAnim === player.sprite.animations._anims["player_animation_jumpLeft"], "Cambiar la animación al saltar cuando el jugador mira a la izquierda", "Porque no pruebas con el play....");
    tw.addModule("Si el jugador esta mirando a la izquierda");
    fakePlayer.cursors.up.isDown = false;*/

    tw.runModules();

    return tw.modulesOk();

}

/*
Suposicion: al deshabilitar los eventos, si pulsas las teclas quedan registrados
como pulsada, pero no se ejecuta, y por lo tanto cuando lo habilitas siguen estando 
ahí los eventos, por lo tanto lo que se me ha ocurrido es coger todos las teclas que 
se pueden pulsar y ponerlas a false como voy a hacer a continuacion.

Probablemente lo mejor es que esta función la tenga la clase Player, pero lo dejo
aquí ahora para que lo veais.
*/
var clearListeners = function (){
    this.cursors.left.isDown = false;
    this.cursors.down.isDown = false;
    this.cursors.up.isDown = false;
    this.cursors.right.isDown = false;
    this.runButton.isDown = false;
}