Level = function(game) {
	this.game     = game;
	this.map      = null;
	this.player   = null;
	this.layer    = null;
  this.goombas  = null;
  this.coins    = null;
  this.score    = 0;
};

Level.prototype = {

	create: function(player) {
		this.player = player;

		this.map = this.game.add.tilemap('map');

    this.map.addTilesetImage('sheet');
    this.map.addTilesetImage('goomba');

    this.map.setCollisionByExclusion([1,2]);

    // Coins
    this.loadCoins();

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
		this.game.physics.arcade.collide(this.player.hero, this.layer);
    this.game.physics.arcade.collide(this.goombas,this.layer);
    this.game.physics.arcade.collide(this.goombas,this.goombas);
    this.game.physics.arcade.overlap(this.sprite, this.coins, this.pickCoin, null, this);

    if (this.game.physics.arcade.collide(this.player.hero, this.goombas)) this.player.die();

    this.player.move();
    this.player.jump();
    this.player.goDown();
    
    if (player.fallingDown()) player.die();

    this.goombas.forEach(this.goombaMove,this);
    //if (this.goombas)
	},

  pickCoin: function(player,coin) {
    this.score++;
    coin.destroy();
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

	render: function() {

	},

  loadCoins: function() {/*
      this.coins = this.game.add.group();
      for (var i=0;i<=400;i=i+100) {
        this.coins.create(200+i, 400, 'coin');
      }
      this.coins.forEach(function (coin) {
        this.game.physics.enable(coin, Phaser.Physics.ARCADE);
        coin.body.collideWorldBounds = true;
        coin.body.gravity = 0;
      });*/
  }

};
