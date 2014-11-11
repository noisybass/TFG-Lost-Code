Level = function(game) {
	this.game       = game;
  this.map        = null;
  this.player     = null;
  this.layer      = null;
  this.fx         = null; // Audio manager 
  this.goombas    = null;
  this.coins      = null;
  this.hearts     = null;
  this.audio_coin = null;

  // Constants
  this.GRAVITY = 500;
};

Level.prototype = {

	create: function(player) {

		this.player = player;

		this.map = this.game.add.tilemap('map');

    this.map.addTilesetImage('sheet');
    this.map.addTilesetImage('goomba');
    this.map.addTilesetImage('heart');

    this.map.setCollisionByExclusion([1,2]);

    // Coins
    this.createCoins();

    // Hearts
    this.createHearts();

    //First enemy
    this.goombas = this.game.add.group();
    this.goombas.enableBody = true;

    /*Could be add the methods here? like this.goombas.move();
    or something like that*/

    this.map.createFromObjects('CapaObjetos', tiledId.goombaId , 'goomba', 0, true, false, this.goombas);

    this.goombas.forEach(this.goombaAnimation,this);

    this.layer = this.map.createLayer('CapaPatrones');

    this.layer.resizeWorld();
	},


	update: function() {
		this.game.physics.arcade.collide(this.player.sprite, this.layer);
    this.game.physics.arcade.collide(this.goombas,this.layer);
    this.game.physics.arcade.collide(this.goombas,this.goombas);
    this.game.physics.arcade.overlap(this.player.sprite, this.coins, this.pickCoin, null, this);

    this.player.move();
    this.player.jump();
    this.player.goDown();

    if (player.fallingDown()) 
      player.die();

    this.goombas.forEach(this.goombaMove,this);
	},

  /* Called when player collides with a coin*/
  pickCoin: function(player,coin) {
    // Removes the coin from the screen
    coin.destroy();

    // Add and update the score
    hud.score++;
    hud.scoreText.text = hud.scoreString + hud.score;
    
    //this.audio_coin.play();
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

  goombaAnimation: function(enemy){
    enemy.animations.add('move',[1,0],5,true);
    //Initialize
    enemy.body.velocity.x = -50;
    enemy.direction = State.LOOKINGLEFT;
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
      function (coin) {
            coin.body.gravity.y = (-1) * this.GRAVITY;
      });
  },

  coinAnimation: function(coin) {
    coin.animations.add('round',[1,2],5,true);
    coin.animations.play('round');

  }

};
