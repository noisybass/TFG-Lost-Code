Level = function(game) {
	this.game                     = game;
  this.map                      = null;
  this.layer                    = null; 
  this.fx                       = null; // Audio manager 
  this.goombas                  = null; // Group of Goombas enemies
  this.shifting_platforms       = null;
  this.audio_coin               = null;

  // Constants
  this.GRAVITY           = 500;
  this.PLATFORM_VELOCITY = 50;
};

Level.prototype = {

	create: function() {

    this.game.physics.arcade.gravity.y = this.GRAVITY;
		
    this.map = this.game.add.tilemap('map_tilemap');
    this.map.addTilesetImage('sheet', 'sheet_spritesheet');
    this.map.addTilesetImage('goomba', 'goomba_spritesheet');
    this.map.addTilesetImage('heart', 'heart_image');
    this.map.setCollision([4,11,13,15,18,32,38,45,49]);

    this.layer = this.map.createLayer('CapaPatrones');
    this.layer.resizeWorld();

    createCoins(this.game);
    createHearts(this.game);

    this.createGoombas();
    createThrowers(this.game);
    this.createShiftingPlatforms();
	},


	update: function() {

		this.game.physics.arcade.collide(player.sprite, this.layer);
    this.game.physics.arcade.collide(player.sprite, this.shifting_platforms);
    
    this.game.physics.arcade.collide(this.goombas, this.layer);
    this.game.physics.arcade.collide(this.goombas);//The goombas collide with themselfs
    this.game.physics.arcade.collide(throwers, this.layer);
    
    

    player.update();

    this.platformsMove();

    if(player.fallingDown()) {
      player.die();
    }

    this.goombas.forEach(this.goombaMove,this);
    throwers.forEach(throwerMove, this);
	},

  

  /* Updates  Goombas*/
  goombaMove: function(enemy) {

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

  },


  /* Updates platforms */
  platformsMove: function() {

    var currentTime = this.game.time.now;
    this.shifting_platforms.forEach(
      function(platform) {
        if(currentTime > platform.moveTime) {
          platform.body.velocity.x   = (-1) * platform.body.velocity.x;
          platform.moveTime          = Number(platform.timeToMove) + currentTime;
        }
      });
  },

  /* Create Goombas enemies*/
  createGoombas: function() {

    this.goombas = this.game.add.group();
    this.goombas.enableBody = true;
    this.map.createFromObjects('CapaObjetos', tiledId.goombaId , 'goomba_spritesheet', 0, true, false, this.goombas);
    this.goombas.forEach(
      function(enemy) {  
          enemy.animations.add('goomba_animation_move', [1,0], 5, true);
          //Initialize
          enemy.body.velocity.x = -50;
          enemy.direction       = State.LOOKINGLEFT;
      });
  },


  /* Create shifting platforms from JSON map*/
  createShiftingPlatforms: function() {

    var velocity = this.PLATFORM_VELOCITY;
    var gravity = this.GRAVITY;
    var currentTime = this.game.time.now;
    this.shifting_platforms = this.game.add.group();
    this.shifting_platforms.enableBody = true;
    this.map.createFromObjects('CapaObjetos', tiledId.shifting_platforms, 'shifting_platform_image', 0, true, false, this.shifting_platforms);
    this.shifting_platforms.forEach(
      function (platformBlock) {
        platformBlock.body.allowGravity = false; /*The gravity it doesn't affect*/
        platformBlock.body.immovable    = true;
        platformBlock.body.velocity.x   = velocity;
        platformBlock.moveTime          = Number(platformBlock.timeToMove) + currentTime;
      });
  },

};
