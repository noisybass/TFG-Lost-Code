/* Create snails enemies*/
createSnails = function(game) {

  snails = game.add.group();
  snails.physicsBodyType = Phaser.Physics.ARCADE;
  snails.enableBody = true;
  level.map.createFromObjects('Object Layer 1', tiledId.snailId , 'snail_spritesheet', 0, true, false, this.snails);
  snails.callAll('animations.add', 'animations', 'anim_snail', [0,1], 5, true);
  snails.callAll('animations.play', 'animations', 'anim_snail');

  snails.forEach(
    function(enemy) {  
        enemy.walkSpeed = 50;
        enemy.direction = State.LOOKINGLEFT;
        enemy.anchor.setTo(0.5, 1);
    });
};

/* Update snails */
snailsMove = function(enemy) {

  if (enemy.body.blocked.left || enemy.body.touching.left) {
    enemy.direction = State.LOOKINGRIGHT;
  }
  else if (enemy.body.blocked.right || enemy.body.touching.right) {
    enemy.direction = State.LOOKINGLEFT;
  }
};
