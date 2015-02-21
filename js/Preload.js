var TFG = TFG || {};

TFG.Preload = function() {};

TFG.Preload.prototype = {

  preload:function() {

    // Show the load bar
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar_image');
    this.preloadBar.anchor.setTo(0.5);
    
    // The method setPreloadSprite in Loader entities allows us to grab a sprite 
    //(in this case this.preloadBar) amd make it into a loading bar.
    this.load.setPreloadSprite(this.preloadBar);

    // Load Assets
    this.loadPlayerAssets();
    this.loadLevelAssets();
    this.loadEnemiesAssets();
    this.loadObjectsAssets();
  },

  create:function() {

    this.game.state.start('MainMenu');
  },

  loadPlayerAssets: function() {

    this.load.spritesheet('player_small_spritesheet', 'assets/images/mario_small.png', 32, 32, 27);
    this.load.spritesheet('player_large_spritesheet', 'assets/images/mario_large.png', 32, 64, 28);
    this.load.spritesheet('player_small_large_spritesheet', 'assets/images/mario_small_large.png', 32, 32, 84);
  },

  loadLevelAssets: function() {

    this.game.load.tilemap('map_tilemap', 'assets/level/mario-level.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.spritesheet('sheet_spritesheet','assets/images/sheet.png', 34, 34, 49);
  },

  loadEnemiesAssets: function() {

    this.game.load.spritesheet('goomba_spritesheet', 'assets/images/goomba.png', 32, 32, 12);
    this.load.spritesheet('thrower_spritesheet', 'assets/images/thrower.png', 41, 70, 5);
    this.load.spritesheet('thrower_hammer_spritesheet', 'assets/images/thrower_hammer.png', 28, 28, 4);
  },

  loadObjectsAssets: function() {

    this.game.load.spritesheet('coin_spritesheet', 'assets/images/coins.png', 34, 34, 3);
    this.game.load.spritesheet('eBlock_spritesheet', 'assets/images/eBlocks.png', 34, 32, 3);
    this.game.load.image('heart_image', 'assets/images/heart.png');
    this.game.load.image('shifting_platform_image', 'assets/images/platform.png');
  }

}
