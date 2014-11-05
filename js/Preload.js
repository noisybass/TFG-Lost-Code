var TFG = TFG || {};

TFG.Preload = function() {};

TFG.Preload.prototype = {
    
    preload: function() {
        //Show the load bar
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        // The method setPreloadSprite in Loader entities allows us to grab a sprite (in this case this.preloadBar) amd make it into a
        // loading bar.
        this.load.setPreloadSprite(this.preloadBar);

        // Load game assets
        //Player assets
        this.loadPlayerAssets(); 

        // Coins
        this.loadObjectsAssets();

        //Enemies assets
        this.loadEnemiesAssets();

        //Level assets
        this.loadLevelAssets();
    },

    create: function() {
        this.game.state.start('MainMenu');
    },

    loadPlayerAssets: function() {
        this.load.spritesheet('player','assets/images/mario_small.png',32,32,27);
        this.game.load.image('jug_agachado', 'assets/images/jugador_agachado.png');
        this.game.load.image('jug','assets/images/jugador.png');
    },
    loadLevelAssets: function() {
        this.load.tilemap('map', 'assets/level/mario4.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.spritesheet('sheet','assets/images/sheet.png',34,34,49);
    },
    loadEnemiesAssets: function() {
        this.load.spritesheet('goomba','assets/images/goomba.png',32,32,12);
    },
    loadObjectsAssets: function() {
        this.game.load.image('coin', 'assets/images/coin.png');
    }
}
