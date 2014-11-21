// Pongo TFG de momento hasta que tengamos el nombre del juego
var TFG = TFG || {};

TFG.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

// Boot State: general game settings are defined, and the assets of the preloading screen are loaded (example the loading bar).
// Nothing is shown to the user.
TFG.game.state.add('Boot', TFG.Boot);

// Preload State: the game assets (images, spritesheets, audio, textures, etc) are loaded into the memory (from the disk). The 
// preloading screen is shown to the user, which usually includes a loading bar to show the progress.
TFG.game.state.add('Preload', TFG.Preload);

// MainMenu State: game's welcome screen. After the preload state, all the game images are already loaded into the memory,
// so they can quickly accessed.
TFG.game.state.add('MainMenu', TFG.MainMenu);

// Game State: the actual game.
TFG.game.state.add('Game', TFG.Game);

TFG.game.state.start('Boot');