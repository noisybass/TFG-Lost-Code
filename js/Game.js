var TFG = TFG || {};

TFG.Game = function() {};

var hud    = null;
var player = null;
var level  = null;

var coins = null;


var currentTask = null;

var star = null;
var starText = null;

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
            //Esto sirve para solucionar algunos problemas con las excepciones.
            var originFunction = eval(currentTask.target );
            if (eval(currentTask.test)) {
                eval(currentTask.target + "=" + text);
                editor.getSession().setValue("", -1);
                $('#task').html("<h3><span class=\"glyphicon glyphicon-pencil\"></span>Aqui va la tarea</h3>");
                currentTask = null;
                TWUnit.HtmlInteract.htmlClear();
                testClear.call(this);
                //this.game.paused = false;
            }
            else {
                // volver a deshabilitar los eventos para poder escribir bien en ace
                this.game.input.disabled = true;
            }
        }
        catch(e){
            console.log(e);
            tw = new TWUnit();
            //volvemos a asignar la funcion original para evitar problemas con errores
            //sintacticos.
            eval(currentTask.target + "=" + originFunction);
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
    //player.create(150, 410 ,'player_spritesheet', 0);
    player.create(150, 700 ,'player_spritesheet', 0);
    // Creates the HUD
    hud = new HUD(this.game);
    hud.create();


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


var testClear = function(){
    this.game.input.disabled = false;
    var star = this.game.add.sprite(this.game.canvas.width/2, this.game.canvas.height/2, 'star-image');
    star.anchor.setTo(0.5, 0.5); // centro de la rotacion
    star.fixedToCamera = true;
    star.scale.x -= 0.8;
    star.scale.y -= 0.8;

    // Animacion que se agranda y gira
    var rotate = this.game.add.tween(star)
        .to({ angle: star.angle + 360 }, 1500, Phaser.Easing.Linear.None);

    var splash = this.game.add.tween(star.scale)
        .to({ x: star.scale.x + 1.5, y: star.scale.y + 1.5 }, 1500, Phaser.Easing.Linear.None);

    splash.onComplete.add(function(){
        var starText = this.game.add.text(this.game.canvas.width/2, this.game.canvas.height/2, "¡Lo has conseguido!", { font: "25px customFont", fill: "#fff" });
        starText.fixedToCamera = true;
        starText.anchor.setTo(0.5, 0.5);
        
        // Animación que se encoge y gira 
        setTimeout(function(){
           /* starText.destroy();
            rotate1 = TFG.game.add.tween(star)
                .to({ angle: star.angle - 720 }, 3500, Phaser.Easing.Linear.None);

            splash1 = TFG.game.add.tween(star.scale)
                .to({ x: star.scale.x - 1.5, y: star.scale.y - 1.5 }, 3500, Phaser.Easing.Linear.None);

            rotate1.onComplete.add(function(){
                star.destroy();
                TFG.game.paused = false;
                TFG.game.input.disabled = false;
            }, this);

            splash1.start();
            rotate1.start();*/

        starText.destroy();
        star.destroy();
        TFG.game.paused = false;
        TFG.game.input.disabled = false;

        }, 1000);

        
    }, this);

    splash.start();
    rotate.start();
}