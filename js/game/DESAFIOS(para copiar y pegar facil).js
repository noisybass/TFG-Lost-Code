/***** DESAFIO 0 *****/

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


/***** DESAFIO 1 *****/

if (this.direction == State.LOOKINGLEFT) {
  this.sprite.play('player_animation_jumpLeft');
}
else {
  this.sprite.play('player_animation_jumpRight');
}
this.sprite.body.velocity.y = this.jumpSpeed;

/*********************/
/*********************/


/***** DESAFIO 2 *****/

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


/***** DESAFIO 3 *****/


/*********************/
/*********************/