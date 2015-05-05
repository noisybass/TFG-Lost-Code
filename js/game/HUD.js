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

		/*this.livesString = 'Lives: ';
		this.livesText = this.game.add.text(0, 0, this.livesString + this.lives, { fontSize: '32px', fill: '#FFF' });
		this.livesText.fixedToCamera = true;
		this.livesText.cameraOffset.setTo(580, 16);*/

		var heart = this.game.add.sprite(580, 30, 'heart');
		this.game.physics.enable(heart);
		heart.anchor.setTo(0.5, 0.5); // centro de la rotacion
		heart.fixedToCamera = true;

		/*var tweenX = this.game.add.tween(heart.cameraOffset)
			.to({ x: heart.x + 50}, 1000, Phaser.Easing.Linear.None)
			.to({ x: heart.x - 100}, 2000, Phaser.Easing.Linear.None)
			.to({ x: heart.x + 50}, 1000, Phaser.Easing.Linear.None);*/
	 
	    //bounce.onComplete.add(startBounceTween, this);

	    var rotate = this.game.add.tween(heart)
	    	.to({ angle: heart.angle + 360 }, 4000, Phaser.Easing.Linear.None).loop();/*
	    	.to({ angle: heart.angle}, 2000, Phaser.Easing.Linear.None);
	    	.to({ angle: heart.angle + 45}, 1000, Phaser.Easing.Linear.None);*/

	    var splash = this.game.add.tween(heart.scale)
	    	.to({ x: heart.scale.x - 0.5, y: heart.scale.y - 0.5 }, 2000, Phaser.Easing.Linear.None)
	    	.to({ x: heart.scale.x , y: heart.scale.y }, 2000, Phaser.Easing.Linear.None).loop();
	    	

	    splash.start();
	    rotate.start();
	}


};