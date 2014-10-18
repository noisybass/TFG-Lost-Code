var TFG = TFG || {};

TFG.Boot = function() {};

// Setting game configuration and loading the assets for the loading screen
TFG.Boot.prototype = {
	preload: function () {
		// Assets we'll use in the loading screen
		this.load.image('preloadbar', 'assets/images/preloader-bar.png');
	},
	create: function() {
		// Loading screen will have a white background
		this.game.stage.backgroundColor = '#fff';

		// Scaling options...

		// Physics system for movement
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.state.start('Preload');
	}
};