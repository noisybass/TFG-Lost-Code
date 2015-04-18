Level = function(game) {
	this.game                     = game;
  this.map                      = null;
  this.layer                    = null; 
  this.fx                       = null; // Audio manager 
  this.audio_coin               = null;

  // Constants
  this.GRAVITY           = 500;
  this.PLATFORM_VELOCITY = 50;
};

Level.prototype = {

	create: function() {

    this.game.physics.arcade.gravity.y = this.GRAVITY;
		
    this.map = this.game.add.tilemap('level1');
    this.map.addTilesetImage('items-sheet', 'items-sheet');
    this.map.addTilesetImage('buildings-sheet', 'buildings-sheet');
    this.map.addTilesetImage('grass-sheet', 'grass-sheet');
    this.map.addTilesetImage('snail', 'snail_spritesheet');
    this.map.addTilesetImage('slime', 'slime_spritesheet');
    //this.map.addTilesetImage('goomba', 'goomba_spritesheet');
    //this.map.addTilesetImage('heart', 'heart_image');
    //this.map.setCollision([0,1,2,3,4,5,6,7,8,9,10,11,12]);
    this.map.setCollisionBetween(0,48);

    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();

    //createCoins(this.game);
    //createHearts(this.game);

    //createGoombas(this.game);
    //createThrowers(this.game);
    //createShiftingPlatforms(this.game);
    //createEndLevel(this.game);
    //createBlocks(this.game);
	},


	update: function() {

		this.game.physics.arcade.collide(player.sprite, this.layer);

    //this.game.physics.arcade.collide(player.sprite, shifting_platforms);
    //this.game.physics.arcade.collide(goombas, this.layer);
    //this.game.physics.arcade.collide(goombas); // Goombas collide with themselfs
    //this.game.physics.arcade.collide(throwers, this.layer);
    //this.game.physics.arcade.collide(end_level, this.layer);

    //this.game.physics.arcade.collide(blocks, this.layer);

    player.update();

    //platformsMove(this.game);

    if(player.fallingDown()) {
      player.die();
    }

    //goombas.forEach(goombaMove,this);
    //throwers.forEach(throwerMove, this);
	},

};
