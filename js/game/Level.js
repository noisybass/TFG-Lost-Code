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

    this.map.setCollisionByExclusion([1,2]);

    this.layer = this.map.createLayer('CapaPatrones');
    this.layer.resizeWorld();
	},


	update: function() {
		this.game.physics.arcade.collide(this.player.hero, this.layer);
    this.player.move();
	},

	render: function() {
		this.game.debug.text( "", 32, 32);
	},


};
