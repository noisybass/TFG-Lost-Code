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

    if(currentTask) {
        // 1- Si tenemos una tarea pendiente obtenemos el codigo del editor 
        var text = editor.getValue();

        // 2- Habilitamos los eventos para poder lanzar eventos virtuales
        this.game.input.disabled = false;
        clearListeners.call(this);


        // 3- Testear el código
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
    //var fakePlayer = jQuery.extend(true, {}, player);
    var fakePlayer = player;

    eval("fakePlayer.move =" + text);

    fakePlayer.cursors.left.isDown = true;
        fakePlayer.move();
    fakePlayer.cursors.left.isDown = false;

    
    tw.addAssert("Animación", fakePlayer.sprite.animations.currentAnim === player.sprite.animations._anims["player_animation_moveLeft"], "Cambiar la animación para moverse a la izquierda", "Porque no pruebas con el play...");
    tw.addAssert("Direccion", fakePlayer.direction == State.LOOKINGLEFT, "Cambiar sprite para que mire hacia la izquierda.", "Podrías mirar el objeto State, aver que se te ocurre...");
    tw.addAssert("Velocidad", fakePlayer.sprite.body.velocity.x == -fakePlayer.walkSpeed, "Mover personaje a la izquierda.", "Si ir a la derecha es positivo, a la izquierda será...");
    tw.runAsserts();


    return tw.assertsOk();
}

var testJump = function (text) {

    tw = new TWUnit();
    //var fakePlayer = jQuery.extend(true, {}, player);
    var fakePlayer = player;

    eval("fakePlayer.jump =" + text);

    fakePlayer.cursors.up.isDown = true;
        fakePlayer.jump();
    fakePlayer.cursors.up.isDown = false;

    /*Cuando choca con el cartel esta mirando hacia la derecha, por tanto va a saltar hacia la derecha*/
    tw.addAssert("Animación", fakePlayer.sprite.animations.currentAnim === player.sprite.animations._anims["player_animation_jumpRight"], "Cambiar la animación para saltar", "Porque no pruebas con el play...");
    tw.addAssert("Velocidad", fakePlayer.sprite.body.velocity.y == fakePlayer.jumpSpeed, "Cambiar la velocidad vertical del personaje", "Para caminar cambiabamos la velocidad en la x, para saltar prueba a modificar la velocidad en la y");
    tw.runAsserts();


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