var TFG = TFG || {};

TFG.Boot = function() {};

TFG.Boot.prototype = {

	preload: function() {

		this.load.image('preloadbar_image', 'assets/img/preloader-bar.png');
	},

	create: function() {

		// Loading screen will have a white background
		this.game.stage.backgroundColor = '#fff';

		// Scaling options...
		// Physics system for movement
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.state.start('Preload');
	}

};
