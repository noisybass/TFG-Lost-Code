Level = function(game) {
	this.game                     = game;
  this.map                      = null;
  this.layer                    = null;
  this.fx                       = null; // Audio manager 
  this.goombas                  = null;
  this.coins                    = null;
  this.hearts                   = null;
  this.shiftingPlatforms        = null;
  this.shiftingPlatformsLimits  = null;
  this.audio_coin               = null;

  // Constants
  this.GRAVITY = 500;
  this.platform_velocity = 50;
};

Level.prototype = {

	create: function() {

    this.game.physics.arcade.gravity.y = this.GRAVITY;

		this.map = this.game.add.tilemap('map');

    this.map.addTilesetImage('sheet');
    this.map.addTilesetImage('goomba');
    this.map.addTilesetImage('heart');

    this.map.setCollision([4,11,13,15,18,32,38,45,49]);

    this.layer = this.map.createLayer('CapaPatrones');

    this.layer.resizeWorld();

    // Coins
    this.createCoins();

    // Hearts
    this.createHearts();

    //First enemy
    this.createGoombas();

    //Move platforms
    this.createShiftingPlatforms();
    
	},


	update: function() {
		this.game.physics.arcade.collide(player.sprite, this.layer);
    this.game.physics.arcade.collide(this.goombas, this.layer);
    this.game.physics.arcade.collide(player.sprite, this.shiftingPlatforms, this.platformsCollision, null, this);
    this.game.physics.arcade.collide(this.goombas, this.goombas);
    this.game.physics.arcade.overlap(player.sprite, this.coins, this.pickCoin, null, this);

    this.game.physics.arcade.collide(this.shiftingPlatforms, this.shiftingPlatformsLimits, this.platformsMove, null, this);

    player.move();
    player.jump();
    player.goDown();

    if (player.fallingDown()) {
      player.die();
    }

    this.goombas.forEach(this.goombaMove,this);
	},

  /* Called when player collides with a coin*/
  pickCoin: function(player, coin) {
    // Removes the coin from the screen
    coin.destroy();

    // Add and update the score
    hud.score++;
    hud.scoreText.text = hud.scoreString + hud.score;
    
    //this.audio_coin.play();
  },

  platformsCollision: function (player, platform) {
    if (player.body.touching.down && platform.body.touching.up || player.body.touching.up && platform.body.touching.down){
      player.body.velocity.y = 0;
    }
  },

  platformsMove: function (platform, platformLimit) {
    if (platform.body.touching.right && platformLimit.body.touching.left){
      var velocity = this.platform_velocity;
      this.shiftingPlatforms.forEach(
      function (platformBlock) {
        platformBlock.body.velocity.x = velocity * (-1);
      });
    }
    else if (platform.body.touching.left && platformLimit.body.touching.right){
      var velocity = this.platform_velocity;
      this.shiftingPlatforms.forEach(
      function (platformBlock) {
        platformBlock.body.velocity.x = velocity;
      });
    }
  },

  createGoombas: function() {
    this.goombas = this.game.add.group();
    this.goombas.enableBody = true;
    this.map.createFromObjects('CapaObjetos', tiledId.goombaId , 'goomba', 0, true, false, this.goombas);
    this.goombas.forEach(
      function (enemy) {
        enemy.animations.add('move',[1,0],5,true);
        //Initialize
        enemy.body.velocity.x = -50;
        enemy.direction = State.LOOKINGLEFT;      
      });

    /*NOTA: supongo que haremos una clase para meter los 
    goombas y tal.*/
  },

  goombaMove: function(enemy) {

    if (enemy.body.blocked.left || enemy.body.touching.left)
      enemy.direction = State.LOOKINGRIGHT;
    else if (enemy.body.blocked.right || enemy.body.touching.right)
      enemy.direction = State.LOOKINGLEFT;

    enemy.play('move');
    if (enemy.direction == State.LOOKINGLEFT)
      enemy.body.velocity.x = -50;
    else if (enemy.direction == State.LOOKINGRIGHT)
      enemy.body.velocity.x = 50;
  },

  /* Create coins from JSON map*/
  createCoins: function() {
    this.coins = this.game.add.group();
    this.coins.enableBody = true;
    this.map.createFromObjects('CapaObjetos', tiledId.coinId , 'coin', 0, true, false, this.coins);
    this.coins.callAll('animations.add', 'animations', 'anim_coin', [0,1,2], 5, true);
    this.coins.callAll('animations.play', 'animations', 'anim_coin');
    this.coins.forEach(
      function (coin) {
        coin.body.gravity.y = (-1) * this.GRAVITY;
      });
    
  },

  createHearts: function() {
    this.hearts = this.game.add.group();
    this.hearts.enableBody = true;
    this.map.createFromObjects('CapaObjetos', tiledId.heartId, 'heart', 0, true, false, this.hearts);
    this.hearts.forEach(
      function (heart) {
        heart.body.gravity.y = (-1) * this.GRAVITY;
      });
  },

  coinAnimation: function(coin) {
    coin.animations.add('round',[1,2],5,true);
    coin.animations.play('round');

  },

  createShiftingPlatforms: function() {
    var velocity = this.platform_velocity;
    this.shiftingPlatforms = this.game.add.group();
    this.shiftingPlatforms.enableBody = true;
    this.map.createFromObjects('CapaObjetos', tiledId.shiftingPlatforms, 'sheet', tiledId.shiftingPlatforms - 1, true, false, this.shiftingPlatforms);
    this.shiftingPlatforms.forEach(
      function (platformBlock) {
        platformBlock.body.allowGravity = false; /*The gravity it doesn't affect*/
        //platformBlock.body.immovable    = true;
        platformBlock.body.velocity.x   = velocity; 
        platformBlock.body.moves        = false;
      });
    this.createShiftingPlatformsLimits();
  },

  createShiftingPlatformsLimits: function() {
    this.shiftingPlatformsLimits = this.game.add.group();
    this.shiftingPlatformsLimits.enableBody = true;
    this.map.createFromObjects('CapaObjetos', tiledId.shiftingPlatformsLimits, 'sheet', 35, true, false, this.shiftingPlatformsLimits);
    this.shiftingPlatformsLimits.forEach(
      function (platformBlock) {
        platformBlock.body.allowGravity = false;
        platformBlock.body.immovable = true;
      });
  }

};
