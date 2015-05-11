var TFG = TFG || {};


setTimeout(function(){
 	var sx = $('#game-canvas').width();
	var sy = 500;   
    TFG.game = new Phaser.Game(sx, sy, Phaser.AUTO, 'game-canvas');

	// Boot State: general game settings are defined, and the assets of the preloading screen are loaded (example the loading bar).
	// Nothing is shown to the user.
	TFG.game.state.add('Boot', TFG.Boot);

	// Preload State: the game assets (images, spritesheets, audio, textures, etc) are loaded into the memory (from the disk). The 
	// preloading screen is shown to the user, which usually includes a loading bar to show the progress.
	TFG.game.state.add('Preload', TFG.Preload);

	// MainMenu State: game's welcome screen. After the preload state, all the game images are already loaded into the memory,
	// so they can quickly accessed.
	TFG.game.state.add('MainMenu', TFG.MainMenu);

	// aboutPhaser State: game's screen that contains things about Phaser.
	TFG.game.state.add('AboutPhaser', TFG.AboutPhaser);

	// ClosingCredits State: game's credits screen.
	TFG.game.state.add('ClosingCredits', TFG.ClosingCredits);

	// Game State: the actual game.
	TFG.game.state.add('Game', TFG.Game);

	// EndGame State: the final screen.
	TFG.game.state.add('EndGame', TFG.EndGame);

	TFG.game.state.start('Boot');

}, 100);


function goMenu() {
	TWUnit.HtmlInteract.htmlClear();
	editor.getSession().setValue("", -1);
	currentTask = null;
	TFG.game.input.disabled = false;
	TFG.game.state.start('MainMenu');
	$('#button_menu_1').fadeOut(500);
	$('#button_menu_2').fadeOut(500);	
};

function restartLevel() {
	// No funciona nada de lo que he encontrado...
	TFG.game.state.start('Game');
};