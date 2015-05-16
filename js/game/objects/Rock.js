/* Create rocks from JSON map*/
createRocks = function(game) {

  rocks            = game.add.group();
  rocks.enableBody = true;
  rocks.physicsBodyType = Phaser.Physics.ARCADE;
  level.map.createFromObjects('Object Layer 1', tiledId.rock1Id , 'rock1-image', 0, true, false, this.rocks);
  level.map.createFromObjects('Object Layer 1', tiledId.rock2Id , 'rock2-image', 0, true, false, this.rocks);
  rocks.forEach(
    function(rock) {
        //coin.body.gravity.y = (-1) * this.GRAVITY;
         
        //bridge.body.allowGravity = false;
        rock.body.immovable = true;
    });
  
};