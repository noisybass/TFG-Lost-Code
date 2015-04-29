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
    this.map.addTilesetImage('void-block', 'void-block');
    this.map.addTilesetImage('snail', 'snail_spritesheet');
    this.map.addTilesetImage('slime', 'slime_spritesheet');
    this.map.setCollisionBetween(2,50);
    this.map.setCollision([82 // Caja con una equis dibujada
                           ]);

    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();

    // Enemies
    createSlimes(this.game);
    createSnails(this.game);

    // Objects
    createBridges(this.game);
    createCoins(this.game);
    createRocks(this.game);
    createSpikes(this.game);

    // Tutorial Blocks
    createBlocks(this.game);


    //createCoins(this.game);
    //createHearts(this.game);

    //createGoombas(this.game);
    //createThrowers(this.game);
    //createShiftingPlatforms(this.game);
    //createEndLevel(this.game);
	},


	update: function() {

	this.game.physics.arcade.collide(player.sprite, this.layer);

    //this.game.physics.arcade.collide(player.sprite, shifting_platforms);
    //this.game.physics.arcade.collide(goombas, this.layer);
    //this.game.physics.arcade.collide(goombas); // Goombas collide with themselfs
    //this.game.physics.arcade.collide(throwers, this.layer);
    //this.game.physics.arcade.collide(end_level, this.layer);

    // Enemies
    this.game.physics.arcade.collide(snails, this.layer);
    this.game.physics.arcade.collide(snails); // Snails collide with themselfs
    this.game.physics.arcade.collide(snails, bridges);
    this.game.physics.arcade.collide(snails, rocks);
    this.game.physics.arcade.collide(snails, spikes);

    this.game.physics.arcade.collide(slimes, this.layer);
    this.game.physics.arcade.collide(slimes); // Slimes collide with themselfs
    this.game.physics.arcade.collide(slimes, bridges);
    this.game.physics.arcade.collide(slimes, rocks);
    this.game.physics.arcade.collide(slimes, spikes);

    // Start Enemies
    snails.forEach(snailsMove, this);
    slimes.forEach(slimesMove, this);

    // Objects
    this.game.physics.arcade.collide(rocks, this.layer);
    this.game.physics.arcade.collide(spikes, this.layer);

    // Tutorial Blocks
    this.game.physics.arcade.collide(blocks, this.layer);

    player.update();

    //platformsMove(this.game);

    if(player.fallingDown()) {
      player.die();
    }


    //goombas.forEach(goombaMove,this);
    //throwers.forEach(throwerMove, this);
	},

};
