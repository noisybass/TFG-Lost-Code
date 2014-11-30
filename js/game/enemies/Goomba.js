/* Create Goombas enemies*/
createGoombas = function(game) {

  goombas = game.add.group();
  goombas.enableBody = true;
  level.map.createFromObjects('CapaObjetos', tiledId.goombaId , 'goomba_spritesheet', 0, true, false, this.goombas);
  goombas.forEach(
    function(enemy) {  
        enemy.animations.add('goomba_animation_move', [1,0], 5, true);
        //Initialize
        enemy.body.velocity.x = -50;
        enemy.direction       = State.LOOKINGLEFT;
    });
};



/* Updates  Goombas*/
goombaMove = function(enemy) {

  if (enemy.body.blocked.left || enemy.body.touching.left) {
    enemy.direction = State.LOOKINGRIGHT;
  }
  else if (enemy.body.blocked.right || enemy.body.touching.right) {
    enemy.direction = State.LOOKINGLEFT;
  }

  enemy.play('goomba_animation_move');

  if (enemy.direction == State.LOOKINGLEFT) {
    enemy.body.velocity.x = -50;
  }
  else if (enemy.direction == State.LOOKINGRIGHT) {
    enemy.body.velocity.x = 50;
  }

};