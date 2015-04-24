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
    this.loadMainMenuAssets();
    this.loadPlayerAssets();
    this.loadLevelAssets();
    this.loadEnemiesAssets();
    this.loadObjectsAssets();
  },

  create:function() {

    this.game.state.start('MainMenu');
  },

  loadMainMenuAssets: function() {
      this.game.load.image('menu', 'assets/img/mainScreen.png');
      this.game.load.image('title', 'assets/img/mainTitle.png');
      this.game.load.image('button_play_img', 'assets/img/button.png');
  },

  loadPlayerAssets: function() {

    this.load.spritesheet('player_spritesheet', 'assets/img/spritesheets/player.png', 66.5, 83.5);

    //this.load.spritesheet('player_small_spritesheet', 'assets/images/mario_small.png', 32, 32, 27);
    //this.load.spritesheet('player_large_spritesheet', 'assets/images/mario_large.png', 32, 64, 28);
  },

  loadLevelAssets: function() {

    this.game.load.tilemap('level1', 'assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    //this.game.load.spritesheet('items-sheet','assets/img/map-tiles/items-sheet.png', 70, 70);

    // Terrenos
    this.game.load.spritesheet('cake-sheet','assets/img/map-tiles/cake-sheet.png',  70, 70, 49);
    this.game.load.spritesheet('castle-sheet','assets/img/map-tiles/castle-sheet.png',70, 70, 49);
    this.game.load.spritesheet('choco-sheet','assets/img/map-tiles/choco-sheet.png', 70, 70, 49);
    this.game.load.spritesheet('dirt-sheet','assets/img/map-tiles/dirt-sheet.png',  70, 70, 49);
    this.game.load.spritesheet('grass-sheet','assets/img/map-tiles/grass-sheet.png', 70, 70, 49);
    this.game.load.spritesheet('metal-sheet','assets/img/map-tiles/metal-sheet.png', 70, 70, 49);
    this.game.load.spritesheet('purple-sheet','assets/img/map-tiles/purple-sheet.png',70, 70, 49);
    this.game.load.spritesheet('sand-sheet','assets/img/map-tiles/sand-sheet.png',  70, 70, 49);
    this.game.load.spritesheet('snow-sheet','assets/img/map-tiles/snow-sheet.png',  70, 70, 49);
    this.game.load.spritesheet('tundra-sheet','assets/img/map-tiles/tundra-sheet.png',70, 70, 49);
    this.game.load.spritesheet('void-block','assets/img/map-tiles/void-block.png',70, 70, 1);

    //this.game.load.tilemap('map_tilemap', 'assets/level/mario-level2.json', null, Phaser.Tilemap.TILED_JSON);
    //this.game.load.spritesheet('sheet_spritesheet','assets/images/sheet.png', 34, 34, 49);
  },

  loadEnemiesAssets: function() {

    this.game.load.spritesheet('slime_spritesheet', 'assets/img/spritesheets/slime.png', 59, 28, 3);
    this.game.load.spritesheet('snail_spritesheet', 'assets/img/spritesheets/snail.png', 57, 31, 4);
    /*this.game.load.spritesheet('goomba_spritesheet', 'assets/images/goomba.png', 32, 32, 12);
    this.load.spritesheet('thrower_spritesheet', 'assets/images/thrower.png', 41, 70, 5);
    this.load.spritesheet('thrower_hammer_spritesheet', 'assets/images/thrower_hammer.png', 28, 28, 4);*/
  },

  loadObjectsAssets: function() {

    this.game.load.spritesheet('buildings-sheet', 'assets/img/map-tiles/buildings-sheet.png', 70, 70, 98);
    this.game.load.spritesheet('items-sheet', 'assets/img/map-tiles/items-sheet.png', 70, 70, 72);
    this.game.load.spritesheet('clouds', 'assets/img/map-tiles/clouds.png', 136, 70, 3);

    /*this.game.load.spritesheet('coin_spritesheet', 'assets/images/coins.png', 34, 34, 3);
    this.game.load.spritesheet('eBlock_spritesheet', 'assets/images/eBlocks.png', 34, 32, 3);
    this.game.load.image('heart_image', 'assets/images/heart.png');
    this.game.load.image('shifting_platform_image', 'assets/images/platform.png*/  }

}
