// Our preload screen will just show a loading bar
var TFG = TFG || {};

// Loading the game assets
TFG.Preload = function () {};

TFG.Preload.prototype = {
	preload: function () {
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
		this.preloadBar.anchor.setTo(0.5);

		// The method setPreloadSprite in Loader entities allows us to grab a sprite (in this case this.preloadBar) amd make it into a
		// loading bar.
		this.load.setPreloadSprite(this.preloadBar);

		// Load game assets
		this.load.image('space', 'assets/images/space.png');
		this.load.image('rock', 'assets/images/rock.png');
		this.load.spritesheet('playership', 'assets/images/player.png');
		this.load.spritesheet('power', 'assets/images/power.png');
		this.load.image('playerParticle', 'assets/images/player-particle.png');
		this.load.audio('collect', 'assets/audio/collect.ogg');
		this.load.audio('explosion', 'assets/audio/explosion.ogg');
	},
	create: function () {
		this.state.start("MainMenu");
	}
};