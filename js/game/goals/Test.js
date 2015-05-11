

//-----------Goal 1-----------\\

var testMoveLeft = function (text) {

    tw = new TWUnit();

    eval(currentTask.target + "=" + text);

    // Si el jugador no esta en el suelo.
    player.cursors.left.isDown = true;
    player.sprite.body.blocked.down = false;
        player.move();
    player.sprite.body.blocked.down = true;
    player.cursors.left.isDown = false;

    tw.addAssert("No ejecutar una animación si no estas en el suelo ", player.sprite.animations.currentAnim != player.sprite.animations._anims["player_animation_moveLeft"], "", "No puedes ejecutar una animación en el aire! ¿Porque no compruebas si el player esta en el suelo?.");
    
    reInitMove();

    // Si el jugador esta en el suelo.
    player.cursors.left.isDown = true;
        player.move();
    player.cursors.left.isDown = false;
    
    tw.addAssert("Cambiar la animación para moverse a la izquierda ", player.sprite.animations.currentAnim === player.sprite.animations._anims["player_animation_moveLeft"], "", "Un sprite tiene un monton de funcionalidades, una de ellas es poder ejecutar una animación. ¿Porque no pruebas a ejecutar una animación con este id 'player_animation_moveLeft'?.");
    tw.addAssert("Cambiar sprite para que mire hacia la izquierda ", player.direction == State.LOOKINGLEFT, "", "Cuando vas a pulsar la tecla derecha, el sprite puede estar mirando para el lado contrario, por lo tanto tienes que asignar la dirección correcta a la dirección del sprite.");
    tw.addAssert("Mover personaje a la izquierda ", player.sprite.body.velocity.x == -player.walkSpeed, "", "En los juegos 2D de plataformas el jugador se mueve por el eje de coordenadas x, siendo positivo si el sprite se desplaza a la derecha, y negativo si se desplaza hacia la izquierda. Despues de esta explicación, ¿Se te ocurre como hacer que el jugador se desplace hacia la izquierda?.");
    
    player.cursors.left.isDown = true;
        player.move();
    player.cursors.left.isDown = false;

    tw.addAssert("Mover personaje a la izquierda a una velocidad constante ", player.sprite.body.velocity.x == -player.walkSpeed, "", "No estas poniendo una velocidad constante a la variable this.sprite.body.velocity.x. ¿Estas seguro que no utilizas una instrucción aditiva para asignar la velocidad?");
    reInitMove();

    tw.runAsserts();


    return tw.assertsOk();
}


var reInitMove = function(){
    player.sprite.play('player_animation_standUpRight');
    player.sprite.body.velocity.x = 0;
    player.direction = State.LOOKINGRIGHT;
}

//-----------Goal 2-----------\\

var testJump = function (text) {

    tw = new TWUnit();

    eval(currentTask.target + "=" + text);

    // Saltar mirando hacia la derecha
    player.cursors.up.isDown = true;
        player.jump();
    player.cursors.up.isDown = false;

    /*Cuando choca con el cartel esta mirando hacia la derecha, por tanto va a saltar hacia la derecha*/
    tw.addAssert("Cambiar la animación para saltar hacia la derecha ", player.sprite.animations.currentAnim === player.sprite.animations._anims["player_animation_jumpRight"], "", "¡Esto es pan comido! Ya lo hemos realizado antes, de todas maneras si no te acuerdas echa un vistazo a la clase Body de la fisica Arcade de Phaser. ¡Acuerdate de poner el id correcto cuando ejecutes la animación! es player_animation_jumpRight");
    tw.addAssert("Cambiar la velocidad de salto del sprite ", player.sprite.body.velocity.y == player.jumpSpeed, "", "Para caminar cambiábamos la velocidad en la x, para saltar prueba a modificar la velocidad en la y asignandole la velocidad this.jumpSpeed");

    reInitJump();

    // Saltar mirando hacia la izquierda
    player.cursors.up.isDown = true;
    player.direction = State.LOOKINGLEFT;
        player.jump();
    player.cursors.up.isDown = false;
    tw.addAssert("Cambiar la animación para saltar hacia la izquierda", player.sprite.animations.currentAnim === player.sprite.animations._anims["player_animation_jumpLeft"], "", "¡Esto es pan comido! Ya lo hemos realizado antes, de todas maneras si no te acuerdas echa un vistazo a la clase Body de la fisica Arcade de Phaser. ¡Acuerdate de poner el id correcto cuando ejecutes la animación! es player_animation_jumpLeft");

    reInitJump();

    tw.runAsserts();


    return tw.assertsOk();
}

var reInitJump = function(){
    player.sprite.play('player_animation_standUpRight');
    player.sprite.body.velocity.y = 0;
    player.jumpTimer = 0;
    player.direction = State.LOOKINGRIGHT;
}

//-----------Goal 3-----------\\


var testMoveSnails = function(text) {

    tw = new TWUnit();
    enemy = snails.children[0]; // La funcion snailsMove se ejecuta igual para todos, asi que nos basta con comprobar uno

    eval(currentTask.target + "=" + text);

    // Comprobamos que se mueven bien hacia la izquierda
    snailsMove(enemy);

    tw.addAssert("Velocidad", enemy.body.velocity.x === -enemy.walkSpeed, "");
    tw.addAssert("Escala", enemy.scale.x === 1, "");

    reInitMoveSnails(enemy);


    // y que se mueven bien hacia la derecha
    enemy.direction = State.LOOKINGRIGHT;
    snailsMove(enemy);

    tw.addAssert("Velocidad", enemy.body.velocity.x === enemy.walkSpeed, "");
    tw.addAssert("Escala", enemy.scale.x === -1, "");

    reInitMoveSnails(enemy);


    // Si su  y < 980 estaran vivos
    enemy.body.y = 979;
    snailsMove(enemy);

    tw.addAssert("Viven", enemy.alive, "");

    reInitMoveSnails(enemy);

    // pero si su y >= 980 tienen que morir
    enemy.body.y = 980;
    snailsMove(enemy);

    tw.addAssert("Mueren", !enemy.alive, "");

    reInitMoveSnails(enemy);



    tw.runAsserts();

    return tw.assertsOk();
}

var reInitMoveSnails = function () {

    if (!enemy.alive) {
        enemy.revive();
    }
    enemy.walkSpeed = 50;
    enemy.direction = State.LOOKINGLEFT;
    enemy.anchor.setTo(0.5, 1);
    enemy.body.velocity.x = -enemy.walkSpeed;
    enemy.scale.x = 1;
}

//-----------Goal 4-----------\\

var testJumpOverEnemy = function(text){
    tw = new TWUnit();
    enemy = slimes.children[0]; // Cogemos el enemigo con el que vamos a luchar
    
    // Hago esto para que controlar de alguna manera que el jugador muere
    // sin que tenga que volver al inicio de la pantalla si se le acaban las 
    // vidas como pasa en player.die
    var originalDie = player.die;
    var originalLives = hud.lives;
    player.die = function(){hud.lives--;};

    eval(currentTask.target + "=" + text);

    // Si el jugador a saltado encima del enemigo
    enemy.body.touching.up = true;
        player.upCollision(player, enemy);
    enemy.body.touching.up = false;

    tw.addAssert("Enemigo muere", !enemy.alive && originalLives == hud.lives, "Enemigo muere al saltar encima de él", "¿Has probado a eliminar al enemigo al comprobar que has saltado encima de él?");
    tw.addAssert("Cuanto sube en el eje y",player.sprite.body.velocity.y == player.jumpSpeed && originalLives == hud.lives, "La velocidad del player es igual a la velocidad de salto", "¿El player tiene la velocidad de salto asiganada en su eje y al saltar encima del enemigo?");
    tw.addAssert("Cuanto dura el salto", player.jumpTime == player.game.time.now + 750 && originalLives == hud.lives, "Asignad el tiempo de salto", "error en tiempo de salto, cambiar esta quest despues poniendo un rango y no un valor estatico como 700");

    reInitJumpOverEnemy(enemy, originalLives);

    // Si el jugador es golpeado por la izquierda
    enemy.body.touching.left = true;
        player.upCollision(player, enemy);
    enemy.body.touching.left = false;

    tw.addAssert("Jugador muere si es tocado por la izquierda", originalLives - 1 == hud.lives, "Jugador muere si choca con un enemigo por la izquierda", "La unica manera de matar a un enemigo es por arriba... se te ocurre como puede morir el jugador?");

    reInitJumpOverEnemy(enemy, originalLives);

    // Si el jugador es golpeado por la derecha
    enemy.body.touching.right = true;
        player.upCollision(player, enemy);
    enemy.body.touching.right = false;

    tw.addAssert("Jugador muere si es tocado por la derecha", originalLives - 1 == hud.lives, "Jugador muere si choca con un enemigo por la derecha", "La unica manera de matar a un enemigo es por arriba... se te ocurre como puede morir el jugador?");

    reInitJumpOverEnemy(enemy, originalLives);

    // Si el jugador es golpeado por abajo
    enemy.body.touching.down = true;
        player.upCollision(player, enemy);
    enemy.body.touching.down = false;

    tw.addAssert("Jugador muere si es tocado por abajo", originalLives - 1 == hud.lives, "Jugador muere si choca con un enemigo por abajo", "La unica manera de matar a un enemigo es por arriba... se te ocurre como puede morir el jugador?");

    reInitJumpOverEnemy(enemy, originalLives);

    tw.runAsserts();

    player.die = originalDie;

    return tw.assertsOk();
}

var reInitJumpOverEnemy = function(enemy, originalLives){
    
    if (!enemy.alive){
        enemy.revive();
        enemy.body.touching.right = false;
        enemy.body.touching.up = false;
        enemy.body.touching.left = false;
        enemy.body.touching.down = false;
    }

    if (hud.lives != originalLives){
        hud.lives = originalLives; 
    }

    player.sprite.body.velocity.y = 0;
    player.jumpTime = player.game.time.now;

}

//-----------Goal 5-----------\\

var testCreateScore = function(text){

	tw = new TWUnit();
    eval(currentTask.target + "=" + text);

    hud.createScore();

    if (!hud.scoreText){
    	tw.addAssert("Inicializar this.scoreText", hud.scoreText, "Inicicializado this.scoreText", "Tienes que añadir un elemento text al game y este devolverá el objeto que tienes que asignar a this.scoreText");
    }
    else{
    	tw.addAssert("Posicion x e y", hud.scoreText.x == 16 && hud.scoreText.y == 16, "Colocado en la posicion x e y correctas", "La posiciones que tienes que dar al añadir un texto al game son las siguientes: x = 16 e y = 16");
    	tw.addAssert("Texto del score", hud.scoreText._text == "Score: 0" && hud.scoreString == "Score: " && hud.score == 0, "texto puesto correctamente", "¿Porque no pruebas a juntar las variables scoreString y score?");
    	tw.addAssert("Texto centrado en la camara",hud.scoreText.fixedToCamera, "Camara fijada correctamente", "Mira en la documentación de phaser la clase Text algun atributo que pueda fijar la camara");
    }
    
    tw.runAsserts();

    if (!tw.assertsOk){
    	hud.scoreText.fixedToCamera = false;
    	hud.scoreText.destroy();
    }

    return tw.assertsOk();
}

//-----------Goal 6-----------\\

var testPickCoins = function(text){
    tw = new TWUnit();
    coin = coins.children[0]; // Cogemos una moneda
    var originScore = hud.score;
    var originText = hud.scoreText.text;
    eval(currentTask.target + "=" + text);

    player.pickCoin(player, coin);

    tw.addAssert("Moneda destruida", !coin.alive, "Destruir la moneda", "¿Te acuerdas de como eliminabamos al enemigo que saltamos encima de él?");
    tw.addAssert("Modificar la puntuación", originScore + 1 == hud.score, "Puntuación modificada", "la clase hud tiene un atributo score para poder modificarlo");
    tw.addAssert("Modificar texto del score", hud.scoreText.text == "Score: " + hud.score.toString(), "Texto del score cambiado correctamente", "El hud debe mostrarse de la siguiente manera, Score: Numero  donde el numero es nuestra puntuación");

    if (!coin.alive){
        coin.revive();
    }
    hud.score = originScore;
    hud.scoreText.text = originText;

    tw.runAsserts();

    return tw.assertsOk();
}

//-----------Goal 7-----------\\

var testCreateDoor = function(text){
    tw = new TWUnit();
    eval(currentTask.target + "=" + text);

    createDoors(player.game);

    tw.addAssert("Establecer fisica ARCADE al grupo", doors.physicsBodyType == Phaser.Physics.ARCADE, "Fisica ARCADE inicializada", "Phaser tiene un 3 tipos de fisicas, pero nosotros nos vamos a centrar en la ARCADE ¿Porque no pruebas a añadirla?");
    tw.addAssert("Nuestro grupo tiene sprites que son cuerpos", doors.enableBody, "Los sprites del grupo son cuerpos", "Para que un sprite pueda colisionar con los demás sprites, hay que decirle al grupo que sus elementos son cuerpos");
    

    tw.runAsserts();
    if (!tw.assertsOk()){
        doors.destroy();
        doors = player.game.add.group();
    }

    return tw.assertsOk();
}