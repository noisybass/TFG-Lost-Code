/* Create snails enemies*/
createSnails = function(game) {

  snails = game.add.group();
  snails.physicsBodyType = Phaser.Physics.ARCADE;
  snails.enableBody = true;
  level.map.createFromObjects('Object Layer 1', tiledId.snailId , 'snail_spritesheet', 0, true, false, this.snails);
  snails.callAll('animations.add', 'animations', 'anim_snail', [0,1], 5, true);
  snails.callAll('animations.play', 'animations', 'anim_snail');

  snails.forEach(
    function(snail) {  
        snail.animations.add('snail_animation_move', [1,0], 5, true);
        snail.direction = State.LOOKINGLEFT;
    });
};


/* Updates  snails*/
snailMove = function(snail) {

  if (snail.body.blocked.left || snail.body.touching.left) {
    snail.direction = State.LOOKINGRIGHT;
  }
  else if (snail.body.blocked.right || snail.body.touching.right) {
    snail.direction = State.LOOKINGLEFT;
  }

  snail.play('anim_snail');

  if (enemy.direction == State.LOOKINGLEFT) {
    enemy.body.velocity.x = -50;
  }
  else if (enemy.direction == State.LOOKINGRIGHT) {
    enemy.body.velocity.x = 50;
  }

};
