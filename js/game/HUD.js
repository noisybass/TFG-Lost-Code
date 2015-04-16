HUD = function(game) {
	this.game        = game;

	this.score       = 0;
	this.scoreString = '';
	this.scoreText   = null;

	this.lives       = 3;
	this.livesString = '';
	this.livesText   = null;
};

HUD.prototype = {

	create: function() {

		this.scoreString = 'Score: ';
		this.scoreText = this.game.add.text(0, 0, this.scoreString + this.score, { fontSize: '32px', fill: '#FFF' });
		this.scoreText.fixedToCamera = true;
		this.scoreText.cameraOffset.setTo(16, 16);

		this.livesString = 'Lives: ';
		this.livesText = this.game.add.text(0, 0, this.livesString + this.lives, { fontSize: '32px', fill: '#FFF' });
		this.livesText.fixedToCamera = true;
		this.livesText.cameraOffset.setTo(580, 16);
	}

};