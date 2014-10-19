State = {
  LOOKINGRIGHT : 0,
  LOOKINGLEFT  : 1
}

Player = function(game) {

	this.game       = game;
	this.hero       = null;
	this.cursors    = null;
  this.direction  = State.LOOKINGRIGHT;

	// Player constants
	this.MAX_VELOCITY_X = 150;
	this.MAX_VELOCITY_Y = 150;
};

Player.prototype = {

	create: function(x,y,key,frame) {
		this.hero = this.game.add.sprite(x,y,key,frame);
    this.game.physics.enable(this.hero);
    this.hero.body.collideWorldBounds = true;
    this.game.camera.follow(this.hero);

    this.addAnimations();

    // Create the player's input controls
    this.cursors = this.game.input.keyboard.createCursorKeys();

	},


	update: function() {

	},

	render: function() {
    this.game.debug.text(this.hero.body.blocked.down,32,10);
    this.game.debug.text(this.cursors.left.isDown,100,10);
		this.game.debug.bodyInfo(this.hero,32,32);
	},

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
  }

};
