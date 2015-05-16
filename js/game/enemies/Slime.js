/* Create Slimes enemies*/
createSlimes = function(game) {

  slimes = game.add.group();
  slimes.physicsBodyType = Phaser.Physics.ARCADE;
  slimes.enableBody = true;
  level.map.createFromObjects('Object Layer 1', tiledId.slimeId , 'slime_spritesheet', 0, true, false, this.slimes);
  slimes.callAll('animations.add', 'animations', 'anim_slime', [0,1], 5, true);
  slimes.callAll('animations.play', 'animations', 'anim_slime');

  slimes.forEach(
    function(enemy) {  
        enemy.walkSpeed = 50;
        enemy.direction = State.LOOKINGLEFT;
        enemy.anchor.setTo(0.5, 1);
    });
};



/* Updates  slimes*/
slimesMove = function(enemy) {

  if (enemy.body.blocked.left || enemy.body.touching.left) {
    enemy.direction = State.LOOKINGRIGHT;
  }
  else if (enemy.body.blocked.right || enemy.body.touching.right) {
    enemy.direction = State.LOOKINGLEFT;
  }

  if (enemy.direction == State.LOOKINGLEFT) {
    enemy.body.velocity.x = -enemy.walkSpeed;
    enemy.scale.x = 1;
  }
  else if (enemy.direction == State.LOOKINGRIGHT) {
    enemy.body.velocity.x = enemy.walkSpeed;
    enemy.scale.x = -1;
  }

};