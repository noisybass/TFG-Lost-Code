State = {
  LOOKINGRIGHT : 0,
  LOOKINGLEFT  : 1,
  QUIET        : 2,
  MOVE         : 3,
  ATTACK       : 4
}

Player = function(game) {

	this.game       = game;
  this.sprite     = null;
  this.cursors    = null;
  this.runButton  = null;
  this.jumpButton = null;
  this.jumpTime   = null;
  this.direction  = State.LOOKINGRIGHT;
  
  this.player_velocity_x = 0;

  // Player constants
  this.walkSpeed = 150;
  this.jumpSpeed = -250;
};

Player.prototype = {

	create: function(x,y,key,frame) {

		this.sprite = this.game.add.sprite(x,y,key,frame);
    this.game.physics.enable(this.sprite);
    this.game.camera.follow(this.sprite);
    //this.game.camera.view.height = 100;
    this.addAnimations();
    this.sprite.body.collideWorldBounds = true; //Should the Body collide with the World bounds?
  
    // Create the player's input controls
    this.cursors    = this.game.input.keyboard.createCursorKeys();
    this.runButton  = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
	},


	update: function() {

    /*this.game.physics.arcade.overlap(this.sprite, hearts, this.collectHeart, null, this);
    this.game.physics.arcade.overlap(this.sprite, coins, this.pickCoin, null, this);
    this.game.physics.arcade.overlap(this.sprite, goombas, this.goombaCollision, null, this);
    this.game.physics.arcade.overlap(this.sprite, throwers, this.throwerCollision, null, this);
    this.game.physics.arcade.overlap(this.sprite, throwers_hammer, this.throwerHammerCollision, null, this);*/
    //this.game.physics.arcade.overlap(this.sprite, end_level, this.endLevelCollision, null, this);

    this.game.physics.arcade.overlap(this.sprite, blocks, this.blockOverlap, null, this);

    this.move();
    this.run();
    this.jump();
    this.goDown();
	},

  blockOverlap: function(player, block) {
    //console.log("------------Colision con bloque-------------- ");
    //console.log(block.data);

    this.game.paused = true;
    currentTask = block.data;
    block.destroy();
    setTask();
    player.game.input.disabled = true;
  },

  /* */
  collectHeart: function(player, heart) {

    // Removes the heart from the screen
    heart.destroy();

    // Add and update the lives
    hud.lives++;
    hud.livesText.text = hud.livesString + hud.lives;
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

  /* */
  goombaCollision: function(player, goomba) {
    
    if (goomba.body.touching.up) {
      goomba.destroy();
      this.sprite.body.velocity.y = this.MAX_VELOCITY_Y * (-1);
      this.jumpTime = this.game.time.now + 750;
    }
    else {
      this.die();
    }
  },

  /* */
  throwerCollision: function(player, thrower) {

    if (thrower.body.touching.up) {
      thrower.destroy();
      this.sprite.body.velocity.y = this.MAX_VELOCITY_Y * (-1);
      this.jumpTime = this.game.time.now + 750;
    }
    else {
      this.die();
    }
  },

  /* */
  throwerHammerCollision: function(player, hammer) {

    hammer.destroy();
    this.die();
  },

  /* */
  addAnimations: function() {

    this.sprite.animations.add('player_animation_moveLeft', [7,8]);
    this.sprite.animations.add('player_animation_moveRight', [13,14]);
    this.sprite.animations.add('player_animation_standUpLeft', [6]);
    this.sprite.animations.add('player_animation_standUpRight', [12]);
    this.sprite.animations.add('player_animation_jumpLeft', [18]);
    this.sprite.animations.add('player_animation_jumpRight', [4]);
    this.sprite.animations.add('player_animation_goDownLeft', [26]);
    this.sprite.animations.add('player_animation_goDownRight', [12]);
  },


  move: function() {
    if (this.cursors.right.isDown) {
      this.sprite.play('player_animation_moveRight', 5, true);
      this.sprite.body.velocity.x = this.walkSpeed;
      if (this.direction == State.LOOKINGLEFT) {
        this.direction = State.LOOKINGRIGHT;
      }
    }
    /*
    else if (this.cursors.left.isDown) {
      this.sprite.play('player_animation_moveLeft', 5, true);
      this.sprite.body.velocity.x = -this.walkSpeed;
      if (this.direction == State.LOOKINGRIGHT) {
        this.direction = State.LOOKINGLEFT;
      }
    }
    */
		else {
      if (this.direction == State.LOOKINGLEFT) {
        this.sprite.play('player_animation_standUpLeft');
      }
      else if (this.direction == State.LOOKINGRIGHT) {
       this.sprite.play('player_animation_standUpRight');
      }
			this.sprite.body.velocity.x = 0;
		}
  },

  /* */
  fallingDown: function () {
    return this.game.world.bounds.bottom - this.sprite.body.height == this.sprite.world.y;
  },

  /* */
  die: function() {

    if (hud.lives > 1){
      this.sprite.body.x = 0;
      this.sprite.body.y = 490;

      // Update the lives
      hud.lives--;
      hud.livesText.text = hud.livesString + hud.lives;
    }
    else{
      // NOTA: Have I to erase the object?? or it erases itself?
      this.game.state.start('MainMenu');
    }
  },

  /* */
  jump: function() {

    
    /*if ( this.cursors.up.isDown && this.playerCanJump() ) {
      if (this.direction == State.LOOKINGLEFT) {
        this.sprite.play('player_animation_jumpLeft');
      }
      else if (this.direction == State.LOOKINGRIGHT) {
        this.sprite.play('player_animation_jumpRight');
      }
      if (this.runButton.isDown) {
        this.sprite.body.velocity.y = this.jumpSpeed * (1.2);
      }
      else {
        this.sprite.body.velocity.y = this.jumpSpeed;
      }
      this.jumpTime = this.game.time.now + 750;
     }*/
     
   },

   /* */
  playerCanJump: function() {
    return (this.sprite.body.onFloor() || this.sprite.body.touching.down) && this.game.time.now > this.jumpTime;
  },

  /* */
  run: function() {

    if (this.runButton.isDown) {
      if (this.direction == State.LOOKINGLEFT) {
        this.sprite.play('player_animation_moveLeft', 10);
      }
      else if (this.direction == State.LOOKINGRIGHT) {
       this.sprite.play('player_animation_moveRight', 10);
      }
      this.MAX_VELOCITY_X = 250;
    }

    else {
      this.MAX_VELOCITY_X = 150;
    }
  },

  /* */
  goDown: function() {

    if ( this.cursors.down.isDown && this.playerCanGoDown() ) {    
      if (this.direction == State.LOOKINGLEFT) {
        this.sprite.play('player_animation_goDownLeft', 1);
      }
      else if (this.direction == State.LOOKINGRIGHT){
        this.sprite.play('player_animation_goDownRight', 1);
        this.player_velocity_x = 80;
      }
    }
    else {
      this.player_velocity_x = 150;
    }
  },

  /* */
  playerCanGoDown: function() {    // AGACHARSE
    return this.sprite.body.onFloor();
  },

  endLevelCollision: function() {
    this.game.state.start('MainMenu');
  }

};
