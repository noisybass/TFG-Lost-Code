/* Create snails enemies*/
createsnails = function(game) {

  snails = game.add.group();
  snails.enableBody = true;
  level.map.createFromObjects('Object Layer 1', tiledId.snailId , 'snail_spritesheet', 0, true, false, this.snails);
  snails.forEach(
    function(enemy) {  
        enemy.animations.add('snail_animation_move', [1,0], 5, true);
        //Initialize
        enemy.body.velocity.x = -50;
        enemy.direction       = State.LOOKINGLEFT;
    });
};



/* Updates  snails*/
goombaMove = function(enemy) {

  if (enemy.body.blocked.left || enemy.body.touching.left) {
    enemy.direction = State.LOOKINGRIGHT;
  }
  else if (enemy.body.blocked.right || enemy.body.touching.right) {
    enemy.direction = State.LOOKINGLEFT;
  }

  enemy.play('snail_animation_move');

  if (enemy.direction == State.LOOKINGLEFT) {
    enemy.body.velocity.x = -50;
  }
  else if (enemy.direction == State.LOOKINGRIGHT) {
    enemy.body.velocity.x = 50;
  }

};