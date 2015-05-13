

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

    tw.addAssert("No podemos ejecutar las animaciones de andar si estamos en el aire. Solo si la condición (this.sprite.body.onFloor() || this.sprite.body.touching.down) es verdadera ejecutaremos las animaciones", player.sprite.animations.currentAnim != player.sprite.animations._anims["player_animation_moveLeft"], "", "");
    
    reInitMove();

    // Si el jugador esta en el suelo.
    player.cursors.left.isDown = true;
        player.move();
    player.cursors.left.isDown = false;
    
    tw.addAssert("La animación no es correcta. Cuando Bersara camine hacia la izquierda ejecutará la animación 'player_animation_moveLeft'", player.sprite.animations.currentAnim === player.sprite.animations._anims["player_animation_moveLeft"], "", "");
    tw.addAssert("La dirección a la que mira Bersara no es correcta. Si se mueve hacia la izquierda su dirección debería ser 'State.LOOKIGNLEFT'", player.direction == State.LOOKINGLEFT, "", "");
    tw.addAssert("Al movernos hacia la izquierda nos estamos moviendo en el sentido negativo del eje X, por lo que tenemos que asignarle a Bersara una velocidad negativa, más concretamente '-this.walkSpeed'", player.sprite.body.velocity.x == -player.walkSpeed, "", "");
    

    // Comprobamos si ha puesto una instruccion del tipo If-elseIf-Else
    player.cursors.right.isDown = true;
    player.cursors.left.isDown = true;
        player.move();
    player.cursors.right.isDown = false;
    player.cursors.left.isDown = false;

    tw.addAssert("La estructura de la función parece estar mal. Asegurate de que su estructura es if (Condicion para moverse a la derecha) { Nos movemos a la derecha } else if (Condicion para moverse a la izquierda) { Nos movemos a la izquierda } else { Nos quedamos quietos }", player.sprite.animations.currentAnim === player.sprite.animations._anims["player_animation_moveRight"] , "", "");
    

    // Para comprobar si ha puesto en velocidad una instruccion aditiva.
    player.cursors.left.isDown = true;
        player.move();
    player.cursors.left.isDown = false;

    tw.addAssert("No estas poniendo una velocidad constante, debes poner 'this.walkSpeed' o '-this.walkSpeed', dependiendo de hacia donde te muevas", player.sprite.body.velocity.x == -player.walkSpeed, "", "");

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
    tw.addAssert("No has puesto la animación correcta en el caso de que Bersara salte hacia la derecha. Tienes que poner 'player_animation_jumpRight'", player.sprite.animations.currentAnim === player.sprite.animations._anims["player_animation_jumpRight"], "", "");
    tw.addAssert("Parece que no has puesto la velocidad correcta. LA velocidad que tienes que asignar es 'this.jumpSpeed'", player.sprite.body.velocity.y == player.jumpSpeed, "", "");

    reInitJump();

    // Saltar mirando hacia la izquierda
    player.cursors.up.isDown = true;
    player.direction = State.LOOKINGLEFT;
        player.jump();
    player.cursors.up.isDown = false;
    tw.addAssert("No has puesto la animación correcta en el caso de que Bersara salte hacia la izquierda. Tienes que poner 'player_animation_jumpLeft'", player.sprite.animations.currentAnim === player.sprite.animations._anims["player_animation_jumpLeft"], "", "");

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

    tw.addAssert("La velocidad de los enemigos cuando se mueven hacia la izquierda es incorrecta. Recuerda que nos queremos mover en el sentido negativo del eje X, por lo que asignaremos '-enemy.walkSpeed'", enemy.body.velocity.x === -enemy.walkSpeed, "");
    tw.addAssert("Por defecto tenemos la animación de caminar hacia la izquierda, por lo que no hace falta darle la vuelta al sprite. La escala debería ser 1", enemy.scale.x === 1, "");

    reInitMoveSnails(enemy);


    // y que se mueven bien hacia la derecha
    enemy.direction = State.LOOKINGRIGHT;
    snailsMove(enemy);

    tw.addAssert("La velocidad de los enemigos cuando se mueven hacia la derecha es incorrecta. Recuerda que nos queremos mover en el sentido positivo del eje X, por lo que asignaremos 'enemy.walkSpeed'", enemy.body.velocity.x === enemy.walkSpeed, "");
    tw.addAssert("Para conseguir la animacion de caminar hacia la derecha necesitamos darle la vuelta al sprite. Para ello utiliza como escala el valor -1", enemy.scale.x === -1, "");

    reInitMoveSnails(enemy);


    // Si su  y < 980 estaran vivos
    enemy.body.y = 979;
    snailsMove(enemy);

    tw.addAssert("Has puesto una profundidad demasiado baja para que mueran, prueba a poner en la condición que mueran a partir de 980", enemy.alive, "");

    reInitMoveSnails(enemy);

    // pero si su y >= 980 tienen que morir
    enemy.body.y = 980;
    snailsMove(enemy);

    tw.addAssert("Así los enemigos no van a morir si llegan a mucha profundidad. Asegurate de haber puesto bien la condición y haber usado la función 'kill()'", !enemy.alive, "");

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

    tw.addAssert("No estas matando bien a los enemigos, ¿Seguro que estás utilizando la funcion 'kill()'?", !enemy.alive && originalLives == hud.lives, "", "");
    tw.addAssert("Bersara no rebota al saltar encima de un enemigo, asegúrate de que estás asignando 'this.jumpSpeed' a la velocidad de Bersara.",player.sprite.body.velocity.y == player.jumpSpeed && originalLives == hud.lives, "", "");
    tw.addAssert("No estas actualizando 'this.jumpTime', asegúrate de asignarle 'this.game.time.now + 750'.", player.jumpTime == player.game.time.now + 750 && originalLives == hud.lives, "", "");

    reInitJumpOverEnemy(enemy, originalLives);

    // Si el jugador es golpeado por la izquierda
    enemy.body.touching.left = true;
        player.upCollision(player, enemy);
    enemy.body.touching.left = false;

    tw.addAssert("Si Bersara toca a un enemigo por la izquierda, debe morir.", originalLives - 1 == hud.lives, "", "");

    reInitJumpOverEnemy(enemy, originalLives);

    // Si el jugador es golpeado por la derecha
    enemy.body.touching.right = true;
        player.upCollision(player, enemy);
    enemy.body.touching.right = false;

    tw.addAssert("Si Bersara toca a un enemigo por la derecha, debe morir.", originalLives - 1 == hud.lives, "", "");

    reInitJumpOverEnemy(enemy, originalLives);

    // Si el jugador es golpeado por abajo
    enemy.body.touching.down = true;
        player.upCollision(player, enemy);
    enemy.body.touching.down = false;

    tw.addAssert("Si Bersara toca a un enemigo por debajo, debe morir.", originalLives - 1 == hud.lives, "", "");

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
    	tw.addAssert("Tienes que añadir un elemento text al game y este devolverá el objeto que tienes que asignar a this.scoreText.", hud.scoreText, "", "");
    }
    else{
    	tw.addAssert("La posicion que tienes que dar al añadir un texto al game es la siguiente: x = 16 e y = 16", hud.scoreText.x == 16 && hud.scoreText.y == 16, "", "");
    	tw.addAssert("No estas creando el texto con el valo correcto, prueba con 'this.scoreString + this.score'", hud.scoreText._text == "Score: 0" && hud.scoreString == "Score: " && hud.score == 0, "");
    	tw.addAssert("No estas fijando el texto a la cámara, revisa la clase Phaser.Text",hud.scoreText.fixedToCamera, "", "");
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

    tw.addAssert("No estas utilizando la función correcta para destruir la moneda.", !coin.alive, "", "");
    tw.addAssert("No estas modificando la puntuación correctamente, cada vez que coges una moneda el valor se incrementa en uno.", originScore + 1 == hud.score, "", "");
    tw.addAssert("No estas actualizando el texto del HUD, prueba a asignarle 'hud.scoreString + hud.score'", hud.scoreText.text == "Score: " + hud.score.toString(), "", "");

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

    tw.addAssert("Para que un sprite pueda colisionar con los demás sprites, hay que decirle al grupo que sus elementos son cuerpos", doors.enableBody, "", "");
    

    tw.runAsserts();
    if (!tw.assertsOk()){
        doors.destroy();
        doors = player.game.add.group();
    }

    return tw.assertsOk();
}
