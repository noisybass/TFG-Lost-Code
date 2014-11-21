Level = function(game) {
	this.game                     = game;
  this.map                      = null;
  this.layer                    = null; 
  this.fx                       = null; // Audio manager 
  this.goombas                  = null; // Group of Goombas enemies
  this.coins                    = null; // Group of coins
  this.hearts                   = null; // Group of heart lifes
  this.throwers                 = null; // Group for Thrower enemies
  this.throwers_hammer          = null; // Group for Thrower hammers
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

    this.createCoins();
    this.createHearts();

    this.createGoombas();
    this.createThrowers();
    this.createShiftingPlatforms();
	},


	update: function() {

		this.game.physics.arcade.collide(player.sprite, this.layer);
    this.game.physics.arcade.collide(this.goombas, this.layer);
    this.game.physics.arcade.collide(player.sprite, this.shifting_platforms);
    this.game.physics.arcade.collide(this.throwers, this.layer);
    this.game.physics.arcade.collide(this.goombas, this.goombas);
    this.game.physics.arcade.overlap(player.sprite, this.coins, this.pickCoin, null, this);

    this.platformsMove();

    player.move();
    player.run();
    player.jump();
    player.goDown();

    if(player.fallingDown()) {
      player.die();
    }

    this.goombas.forEach(this.goombaMove,this);
    this.throwers.forEach(this.throwerMove, this);
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

  /* Update Throwers */
  throwerMove: function(enemy) {

    var now = this.game.time.now;    
    var r   = this.game.rnd.integerInRange(0, 5);

    if (enemy.state == State.QUIET) {
      enemy.play('thrower_animation_quiet');
      enemy.body.velocity.x = 0;

      if (now - enemy.time > 500) {
        enemy.time  = now;
        enemy.state = State.MOVE;
      }
    }

    else if (enemy.state == State.MOVE) {
      enemy.play('thrower_animation_move');

      if ((now - enemy.time > 1000) && (r == 0 || r == 1)) {
        enemy.body.velocity.x = -50;
      }
      else if ((now - enemy.time > 1000) && (r == 2 || r == 3)) {
        enemy.body.velocity.x = 50; 
      }

      else {  // r == 4 || r == 5
        if (now - enemy.time > 3000) {
          enemy.time  = now;
          enemy.state = State.ATTACK;
        }
      }
    }

    else if (enemy.state == State.ATTACK) {
      enemy.play('thrower_animation_attack');
      if (now - enemy.time > 750) {
        this.createHammer(enemy);
        enemy.time  = now;
        enemy.state = State.QUIET;
      }
    }  

    this.hammerMove();
  },

  /* Updates Thrower's hammer if they exixts */
  hammerMove: function() {

    this.throwers_hammer.forEach(
      function(hammer) {
            hammer.body.x -= 5;
            if (hammer.body.y > 800) {
              hammer.destroy();
            }

      });
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

  /* Sets Goombas's animations */
  goombaAnimation: function(enemy){

    enemy.animations.add('goomba_animation_move', [1,0], 5, true);
    //Initialize
    enemy.body.velocity.x = -50;
    enemy.direction       = State.LOOKINGLEFT;
  },

  /* Create coins from JSON map*/
  createCoins: function() {

    this.coins            = this.game.add.group();
    this.coins.enableBody = true;
    this.map.createFromObjects('CapaObjetos', tiledId.coinId , 'coin_spritesheet', 0, true, false, this.coins);
    this.coins.callAll('animations.add', 'animations', 'anim_coin', [0,1,2], 5, true);
    this.coins.callAll('animations.play', 'animations', 'anim_coin');
    this.coins.forEach(
      function(coin) {
            coin.body.gravity.y = (-1) * this.GRAVITY;
      });
    
  },

  /* Create hearts from JSON map */
  createHearts: function() {

    this.hearts            = this.game.add.group();
    this.hearts.enableBody = true;
    this.map.createFromObjects('CapaObjetos', tiledId.heartId, 'heart_image', 0, true, false, this.hearts);
    this.hearts.forEach(
      function(coin) {
            coin.body.gravity.y = (-1) * this.GRAVITY;
      });
  },

  /* Create thrower enemies from JSON map */
  createThrowers: function() {

    this.throwers                   = this.game.add.group();
    this.throwers_hammer            = this.game.add.group();
    this.throwers.enableBody        = true;
    this.throwers_hammer.enableBody = true;
    this.map.createFromObjects('CapaObjetos', tiledId.throwerId , 'thrower_spritesheet', 0, true, false, this.throwers);
    this.throwers.forEach(
      function(thrower) {
            thrower.state = State.MOVE;
            thrower.time  = 0;
            thrower.body.gravity.y = 0;
            thrower.animations.add('thrower_animation_quiet', [0], 1, false);
            thrower.animations.add('thrower_animation_move', [0,1], 5, true);
            thrower.animations.add('thrower_animation_attack', [1,2], 5, false);
      });
  },

  /* Creates thrower's attacking hammer */
  createHammer: function(thrower) {
    
    var sprite = this.throwers_hammer.create(thrower.x - thrower.body.width, thrower.y, 'thrower_hammer_spritesheet');
    this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.animations.add('thrower_animation_hammer', [0,1,2,3], 5, true);
    sprite.animations.play('thrower_animation_hammer');
  },

  /* Set Thrower's animations */
  coinAnimation: function(coin) {

    coin.animations.add('round',[1,2],5,true);
    coin.animations.play('round');

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
