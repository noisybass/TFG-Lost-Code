State = {
  LOOKINGRIGHT : 0,
  LOOKINGLEFT  : 1
}

Player = function(game) {

	this.game       = game;
	this.hero       = null;
	this.cursors    = null;
  this.jumpButton = null;
  this.jumpTime   = null;
  this.direction  = State.LOOKINGRIGHT;
  
  this.player_velocity_x = 0;

	// Player constants
	this.MAX_VELOCITY_X = 150;
	this.MAX_VELOCITY_Y = 150;


  //Player life
  this.hearts = 3;
};

Player.prototype = {

	create: function(x,y,key,frame) {
		this.hero = this.game.add.sprite(x,y,key,frame);
    this.game.physics.enable(this.hero);
    this.hero.body.collideWorldBounds = false;
    this.game.camera.follow(this.hero);

    this.addAnimations();

    


    this.hero.body.collideWorldBounds = true; //Should the Body collide with the World bounds?

    // Create the player's input controls
    this.cursors      = this.game.input.keyboard.createCursorKeys();
    this.cursors      = this.game.input.keyboard.createCursorKeys();
      this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	},


  // On level
	update: function() {},

  addAnimations: function() {
    this.hero.animations.add('moveLeft',[15,16,17],5,true);
    this.hero.animations.add('moveRight',[1,2,3],5,true);
    this.hero.animations.add('standUpLeft',[14]);
    this.hero.animations.add('standUpRight',[0]);
  },

  move: function() {
    if ( this.cursors.left.isDown /*&& this.hero.body.blocked.down*/) {
      this.hero.play('moveLeft');
			this.hero.body.velocity.x = this.MAX_VELOCITY_X * (-1);
      if (this.direction == State.LOOKINGRIGHT){
        this.direction = State.LOOKINGLEFT;
      }
		}
		else if ( this.cursors.right.isDown /*&& this.hero.body.blocked.down*/) {
		 	this.hero.play('moveRight');
      this.hero.body.velocity.x = this.MAX_VELOCITY_X;
      if (this.direction == State.LOOKINGLEFT){
        this.direction = State.LOOKINGRIGHT;
      }
		}
		else {
      if (this.direction == State.LOOKINGLEFT) this.hero.play('standUpLeft');
      else if (this.direction == State.LOOKINGRIGHT) this.hero.play('standUpRight');
			this.hero.body.velocity.x = 0;
		}
  },

  fallingDown: function () {
    return this.game.world.bounds.bottom - this.hero.body.height == this.hero.world.y;
  },

  die: function() {
    if (this.hearts > 1){
      this.hero.body.x = 32;
      this.hero.body.y = 32;
      --this.hearts;
    }
    else{
    //Have I to erase the object?? or it erases itself?
      this.game.state.start('MainMenu');
    }
  },

  render: function() {
    this.game.debug.text("Hearts: " + this.hearts ,32,10);
    /*this.game.debug.text(this.hero.body.blocked.down,32,10);
    this.game.debug.text(this.cursors.left.isDown,100,10);
    this.game.debug.text(this.game.world.bounds.bottom - this.hero.body.height,150,10);
    this.game.debug.text(this.hero.world.x,200,10);
    this.game.debug.text(this.hero.world.y,250,10);
    this.game.debug.bodyInfo(this.hero,32,32);*/
	},

  jump: function() {
    if ( this.jumpButton.isDown && this.playerCanJump() ) {
      this.hero.body.velocity.y = this.MAX_VELOCITY_Y * (-1);
      this.jumpTime = this.game.time.now + 750;
     }
   },

   playerCanJump: function() {
    return this.hero.body.onFloor() && this.game.time.now > this.jumpTime;
  },

  // agacharse
  goDown: function() {
    if ( this.cursors.down.isDown && this.playerCanGoDown() ) {    
      //this.hero.loadTexture('jug_agachado', 0);
      //this.hero.play('goDownLeft');
      this.player_velocity_x = 80;
     }

     else {
      //this.hero.loadTexture('player', 0);
        //this.hero.play('standUpLeft');
        this.player_velocity_x = 150;
     }
  },

  playerCanGoDown: function() {    // AGACHARSE
    return this.hero.body.onFloor();
  }

};
