var TFG = TFG || {};

TFG.Preload = function(){};

TFG.Preload.prototype = {

  preload:function(){
    //Show the load bar
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    // The method setPreloadSprite in Loader entities allows us to grab a sprite (in this case this.preloadBar) amd make it into a
    // loading bar.
    this.load.setPreloadSprite(this.preloadBar);

    // Load game assets
    //Player assets
    this.load.spritesheet('player','assets/images/mario_small.png',32,32,27);

    //Level assets
    this.load.tilemap('map', 'assets/level/mario2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.spritesheet('sheet','assets/images/sheet.png',34,34,49);
    //Others..
    this.load.image('space', 'assets/images/space.png');
    this.load.image('rock', 'assets/images/rock.png');
    this.load.spritesheet('playership', 'assets/images/player.png');
    this.load.spritesheet('power', 'assets/images/power.png');
    this.load.image('playerParticle', 'assets/images/player-particle.png');
    this.load.audio('collect', 'assets/audio/collect.ogg');
    this.load.audio('explosion', 'assets/audio/explosion.ogg');
  },

  create:function(){
    this.game.state.start('MainMenu');
  }
}
