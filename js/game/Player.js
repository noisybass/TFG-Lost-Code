State = {
  LOOKINGRIGHT : 0,
  LOOKINGLEFT  : 1
}

Player = function(game) {

	this.game       = game;
  this.sprite     = null;
  this.cursors    = null;
  this.jumpButton = null;
  this.jumpTime   = null;
  this.direction  = State.LOOKINGRIGHT;
  
  this.player_velocity_x = 0;

  // Player constants
  this.MAX_VELOCITY_X = 150;
  this.MAX_VELOCITY_Y = 350;
};

Player.prototype = {

	create: function(x,y,key,frame) {
		this.sprite = this.game.add.sprite(x,y,key,frame);
    this.game.physics.enable(this.sprite);
    this.sprite.body.collideWorldBounds = false;
    this.game.camera.follow(this.sprite);

    this.addAnimations();


    this.sprite.body.collideWorldBounds = true; //Should the Body collide with the World bounds?

    // Create the player's input controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	},


	update: function() {

	},

  addAnimations: function() {
    this.sprite.animations.add('moveLeft',[15,16,17],5,true);
    this.sprite.animations.add('moveRight',[1,2,3],5,true);
    this.sprite.animations.add('standUpLeft',[14]);
    this.sprite.animations.add('standUpRight',[0]);
  },

  move: function() {
    if ( this.cursors.left.isDown /*&& this.sprite.body.blocked.down*/) {
      this.sprite.play('moveLeft');
			this.sprite.body.velocity.x = this.MAX_VELOCITY_X * (-1);
      if (this.direction == State.LOOKINGRIGHT){
        this.direction = State.LOOKINGLEFT;
      }
		}
		else if ( this.cursors.right.isDown /*&& this.sprite.body.blocked.down*/) {
		 	this.sprite.play('moveRight');
      this.sprite.body.velocity.x = this.MAX_VELOCITY_X;
      if (this.direction == State.LOOKINGLEFT){
        this.direction = State.LOOKINGRIGHT;
      }
		}
		else {
      if (this.direction == State.LOOKINGLEFT) this.sprite.play('standUpLeft');
      else if (this.direction == State.LOOKINGRIGHT) this.sprite.play('standUpRight');
			this.sprite.body.velocity.x = 0;
		}
  },

  fallingDown: function () {
    return this.game.world.bounds.bottom - this.sprite.body.height == this.sprite.world.y;
  },

  die: function() {
    if (hud.lives > 1){
      this.sprite.body.x = 32;
      this.sprite.body.y = 32;

      // Update the lives
      hud.lives--;
      hud.livesText.text = hud.livesString + hud.lives;
    }
    else{
    //Have I to erase the object?? or it erases itself?
      this.game.state.start('MainMenu');
    }
  },

  render: function() {
    //this.game.debug.text("Hearts: " + this.hearts ,32,10);
    /*this.game.debug.text(this.sprite.body.blocked.down,32,10);
    this.game.debug.text(this.cursors.left.isDown,100,10);
    this.game.debug.text(this.game.world.bounds.bottom - this.sprite.body.height,150,10);
    this.game.debug.text(this.sprite.world.x,200,10);
    this.game.debug.text(this.sprite.world.y,250,10);
    this.game.debug.bodyInfo(this.sprite,32,32);*/
	},

  jump: function() {
    if ( this.jumpButton.isDown && this.playerCanJump() ) {
      this.sprite.body.velocity.y = this.MAX_VELOCITY_Y * (-1);
      this.jumpTime = this.game.time.now + 750;
     }
   },

  playerCanJump: function() {
    return this.sprite.body.onFloor() && this.game.time.now > this.jumpTime;
  },

  // agacharse
  goDown: function() {
    if ( this.cursors.down.isDown && this.playerCanGoDown() ) {    
      //this.sprite.loadTexture('jug_agachado', 0);
      //this.sprite.play('goDownLeft');
      this.player_velocity_x = 80;
     }

     else {
      //this.sprite.loadTexture('player', 0);
        //this.sprite.play('standUpLeft');
        this.player_velocity_x = 150;
     }
  },

  playerCanGoDown: function() {    // AGACHARSE
    return this.sprite.body.onFloor();
  }

};
