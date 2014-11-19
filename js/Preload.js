var TFG = TFG || {};

TFG.Preload = function(){};

TFG.Preload.prototype = {

  preload:function() {
    //Show the load bar
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    // The method setPreloadSprite in Loader entities allows us to grab a sprite (in this case this.preloadBar) amd make it into a
    // loading bar.
    this.load.setPreloadSprite(this.preloadBar);

    /////// Load game assets ///////////
        this.loadPlayerAssets();

        this.loadLevelAssets();

        this.loadEnemiesAssets();

        this.loadObjectsAssets();
  },

  create:function() {
    this.game.state.start('MainMenu');
  },

  loadPlayerAssets: function() {
    this.load.spritesheet('player','assets/images/mario_small.png', 32, 32, 27);
    this.load.spritesheet('player_large','assets/images/mario_large.png', 32, 64, 28);
  },

  loadLevelAssets: function() {
    this.load.tilemap('map', 'assets/level/mario-level-copia.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.spritesheet('sheet','assets/images/sheet.png',34,34,49);
  },

  loadEnemiesAssets: function() {
    this.load.spritesheet('goomba','assets/images/goomba.png', 32, 32, 12);
    this.load.spritesheet('thrower_spritesheet', 'assets/images/thrower.png', 41, 70, 5);
    this.load.spritesheet('thrower_hammer_spritesheet', 'assets/images/thrower_hammer.png', 28, 28, 4);
  },

  loadObjectsAssets: function() {
    this.game.load.spritesheet('coin', 'assets/images/coins.png',34,34,3);
    this.game.load.spritesheet('spritesheet_eBlock', 'assets/images/eBlocks.png', 34,32,3);
    this.game.load.image('heart', 'assets/images/heart.png');
  }
}
