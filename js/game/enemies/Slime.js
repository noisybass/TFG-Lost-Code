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
        enemy.animations.add('slime_animation_move', [1,0], 5, true);
        //Initialize
        enemy.body.velocity.x = -50;
        enemy.direction       = State.LOOKINGLEFT;
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

  enemy.play('anim_slime');

  if (enemy.direction == State.LOOKINGLEFT) {
    enemy.body.velocity.x = -50;
  }
  else if (enemy.direction == State.LOOKINGRIGHT) {
    enemy.body.velocity.x = 50;
  }

};