/* Create Slimes enemies*/
createSlimes = function(game) {

  slimes = game.add.group();
  slimes.enableBody = true;
  level.map.createFromObjects('Object Layer 1', tiledId.slimeId , 'slime_spritesheet', 0, true, false, this.slimes);
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

  enemy.play('slime_animation_move');

  if (enemy.direction == State.LOOKINGLEFT) {
    enemy.body.velocity.x = -50;
  }
  else if (enemy.direction == State.LOOKINGRIGHT) {
    enemy.body.velocity.x = 50;
  }

};