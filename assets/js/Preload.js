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
    /// Añadir a mario_small.png mario agachado
    this.game.load.image('jug_agachado', 'assets/images/jugador_agachado.png');
    this.game.load.image('jug','assets/images/jugador.png'); 
    //////

    // Coins
    this.game.load.image('coin', 'assets/images/coin.png');

    //Enemies assets
    this.load.spritesheet('goomba','assets/images/goomba.png',32,32,12);

    //Level assets
    this.load.tilemap('map', 'assets/level/mario4.json', null, Phaser.Tilemap.TILED_JSON);
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
