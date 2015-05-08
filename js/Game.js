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
                $('#task').html("<h3><span class=\"glyphicon glyphicon-pencil\"></span>Aqui va la tarea</h3>");
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

    // Creates the level
    level = new Level(this.game);
    level.create();

    // Creates player
    player = new Player(this.game);
    player.create(150, 700 ,'player_spritesheet', 0);

    // Creates the HUD
    hud = new HUD(this.game);


    var that = this;
    $('#submit-button').click(function() {that.submitCode.call(player)});
    $('#restart-button').click(setTask);
  },

  update: function(){

    player.update();
    level.update();
  }
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
