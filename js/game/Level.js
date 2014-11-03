Level = function(game) {
	this.game = game;
	this.map = null;
	this.player = null;
	this.layer = null;
};

Level.prototype = {

	create: function(player) {
		this.player = player;

		this.map = this.game.add.tilemap('map');

    this.map.addTilesetImage('sheet');
    this.map.addTilesetImage('goomba');

    this.map.setCollisionByExclusion([1,2]);



    //First enemy
    this.goombas = this.game.add.group();
    this.goombas.enableBody = true;

    this.map.createFromObjects('CapaObjetos', tiledId.goombaId , 'goomba', 0, true, false, this.goombas);

    this.layer = this.map.createLayer('CapaPatrones');

    this.layer.resizeWorld();
	},


	update: function() {
		this.game.physics.arcade.collide(this.player.hero, this.layer);
    this.game.physics.arcade.collide(this.goombas,this.layer)
    this.player.move();
    if (player.fallingDown()) player.die();
	},

	render: function() {
		this.game.debug.text( "", 32, 32);
	},

};
