Level = function(game) {
	this.game                     = game;
  this.map                      = null;
  this.layer                    = null;
  this.fx                       = null; // Audio manager 
  this.goombas                  = null;
  this.coins                    = null;
  this.hearts                   = null;
  this.throwers                 = null; // Group for Thrower enemies
  this.throwers_hammer          = null; // Group for Thrower hammers
  this.shiftingPlatforms        = null;
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

    // Second enemy: thrower
    this.createThrowers();

    //Move platforms
    this.createShiftingPlatforms();
	},


	update: function() {
		this.game.physics.arcade.collide(player.sprite, this.layer);
    this.game.physics.arcade.collide(this.goombas, this.layer);
    this.game.physics.arcade.collide(player.sprite, this.shiftingPlatforms);
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

  goombaMove: function(enemy) {

    if (enemy.body.blocked.left || enemy.body.touching.left) {
      enemy.direction = State.LOOKINGRIGHT;
    }
    else if (enemy.body.blocked.right || enemy.body.touching.right) {
      enemy.direction = State.LOOKINGLEFT;
    }

    enemy.play('move');

    if (enemy.direction == State.LOOKINGLEFT) {
      enemy.body.velocity.x = -50;
    }
    else if (enemy.direction == State.LOOKINGRIGHT) {
      enemy.body.velocity.x = 50;
    }
  },

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

  hammerMove: function() {
    this.throwers_hammer.forEach(
      function (hammer) {
            hammer.body.x -= 5;
            if (hammer.body.y > 800) {
              hammer.destroy();
            }

      });
  },

  platformsMove: function () {
    var currentTime = this.game.time.now;
    this.shiftingPlatforms.forEach(
      function (platform) {
        if(currentTime > platform.moveTime) {
          platform.body.velocity.x   = (-1) * platform.body.velocity.x;
          platform.moveTime          = Number(platform.timeToMove) + currentTime;
        }
      });
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
  },

  goombaAnimation: function(enemy){
    enemy.animations.add('move', [1,0], 5, true);
    //Initialize
    enemy.body.velocity.x = -50;
    enemy.direction       = State.LOOKINGLEFT;
  },

  /* Create coins from JSON map*/
  createCoins: function() {
    this.coins            = this.game.add.group();
    this.coins.enableBody = true;
    this.map.createFromObjects('CapaObjetos', tiledId.coinId , 'coin', 0, true, false, this.coins);
    this.coins.callAll('animations.add', 'animations', 'anim_coin', [0,1,2], 5, true);
    this.coins.callAll('animations.play', 'animations', 'anim_coin');
    this.coins.forEach(
      function (coin) {
            coin.body.gravity.y = (-1) * this.GRAVITY;
      });
    
  },

  /* Create hearts from JSON map */
  createHearts: function() {
    this.hearts            = this.game.add.group();
    this.hearts.enableBody = true;
    this.map.createFromObjects('CapaObjetos', tiledId.heartId, 'heart', 0, true, false, this.hearts);
    this.hearts.forEach(
      function (coin) {
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
      function (thrower) {
            thrower.state = State.MOVE;
            thrower.time  = 0;
            thrower.body.gravity.y = 0;
            thrower.animations.add('thrower_animation_quiet', [0], 1, false);
            thrower.animations.add('thrower_animation_move', [0,1], 5, true);
            thrower.animations.add('thrower_animation_attack', [1,2], 5, false);
      });
  },

  createHammer: function(thrower) {
    var sprite = this.throwers_hammer.create(thrower.x - thrower.body.width, thrower.y, 'thrower_hammer_spritesheet');
    this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.animations.add('thrower_animation_hammer', [0,1,2,3], 5, true);
    sprite.animations.play('thrower_animation_hammer');
  },

  coinAnimation: function(coin) {
    coin.animations.add('round',[1,2],5,true);
    coin.animations.play('round');

  },

  createShiftingPlatforms: function() {
    var velocity = this.platform_velocity;
    var gravity = this.GRAVITY;
    var currentTime = this.game.time.now;
    this.shiftingPlatforms = this.game.add.group();
    this.shiftingPlatforms.enableBody = true;
    this.map.createFromObjects('CapaObjetos', tiledId.shiftingPlatforms, 'shiftingPlatform', 0, true, false, this.shiftingPlatforms);
    this.shiftingPlatforms.forEach(
      function (platformBlock) {
        platformBlock.body.allowGravity = false; /*The gravity it doesn't affect*/
        platformBlock.body.immovable    = true;
        platformBlock.body.velocity.x   = velocity;
        platformBlock.moveTime          = Number(platformBlock.timeToMove) + currentTime;
      });
  },

};
