/***** DESAFIO 1 *****/ player.create(150, 410 ,'player_spritesheet', 0);

else if (this.cursors.left.isDown) {
  this.sprite.body.velocity.x = -this.walkSpeed;

  if (this.sprite.body.onFloor() || this.sprite.body.touching.down){
    this.sprite.play('player_animation_moveLeft', 5, true);
  }

  if (this.direction == State.LOOKINGRIGHT) {
    this.direction = State.LOOKINGLEFT;
  }
} 

/*********************/
/*********************/


/***** DESAFIO 2 *****/ player.create(150, 700 ,'player_spritesheet', 0);

if (this.direction == State.LOOKINGLEFT) {
  this.sprite.play('player_animation_jumpLeft');
}
else {
  this.sprite.play('player_animation_jumpRight');
}
this.sprite.body.velocity.y = this.jumpSpeed;

/*********************/
/*********************/


/***** DESAFIO 3 *****/ player.create(1700, 650 ,'player_spritesheet', 0);

if (enemy.direction == State.LOOKINGLEFT) {
	enemy.body.velocity.x = -enemy.walkSpeed;
	enemy.scale.x = 1;
}
else if (enemy.direction == State.LOOKINGRIGHT) {
	enemy.body.velocity.x = enemy.walkSpeed;
	enemy.scale.x = -1;
}

if(enemy.body.y >= 980)
    enemy.kill();


/*********************/
/*********************/


/***** DESAFIO 4 *****/ player.create(3950, 260 ,'player_spritesheet', 0);

if (enemy.body.touching.up) {
      enemy.kill();
      this.sprite.body.velocity.y = this.jumpSpeed;
      this.jumpTime = this.game.time.now + 750;
}

/*********************/
/*********************/


/***** DESAFIO 5 *****/

this.scoreText = this.game.add.text(16, 16, this.scoreString + this.score, { fontSize: '32px', fill: '#FFF' });
this.scoreText.fixedToCamera = true;

/*********************/
/*********************/


/***** DESAFIO 6 *****/

coin.kill();

hud.score++;
hud.scoreText.text = hud.scoreString + hud.score;

/*********************/
/*********************/

/***** DESAFIO 6 *****/

doors.enableBody = true;

/*********************/
/*********************/