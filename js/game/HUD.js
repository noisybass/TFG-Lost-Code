HUD = function(game) {
	this.game        = game;

	this.lives       = 3;
	this.livesString = '';
	this.livesText   = null;

	this.hearts      = null;
	this.heartSpace  = 20;
	this.heartsX     = $('#game-canvas').width() - 100;
	this.heartsY     = 30;

	this.score       = 0;
	this.scoreText   = null;
	this.scoreX      = 60;
	this.scoreY      = 30;
	this.scoreString = 'Score: ';
};

HUD.prototype = {

	create: function() {
		this.createScore();
		this.createHearts();
	},

	createHearts: function(){
		this.hearts = [this.game.add.sprite(this.heartsX                    , this.heartsY, 'heart'),
					   this.game.add.sprite(this.heartsX + this.heartSpace  , this.heartsY, 'heart'),
					   this.game.add.sprite(this.heartsX + this.heartSpace*2, this.heartsY, 'heart')];

		for (i = 0; i < this.lives; ++i){
			this.addHearts(i);
		}
	},

	createScore: function(){
		/*
		this.scoreText = this.game.add.text(16, 16, this.scoreString + this.score, { fontSize: '32px', fill: '#FFF' });
		this.scoreText.fixedToCamera = true;
		*/
	},

	addHearts: function(i){
		//this.game.physics.enable(this.hearts[i]);
		this.hearts[i].anchor.setTo(0.5, 0.5); // centro de la rotacion
		this.hearts[i].fixedToCamera = true;

	    var rotate = this.game.add.tween(this.hearts[i])
	    	.to({ angle: this.hearts[i].angle + 360 }, 4000, Phaser.Easing.Linear.None).loop();

	    var splash = this.game.add.tween(this.hearts[i].scale)
	    	.to({ x: this.hearts[i].scale.x - 0.5, y: this.hearts[i].scale.y - 0.5 }, 2000, Phaser.Easing.Linear.None)
	    	.to({ x: this.hearts[i].scale.x , y: this.hearts[i].scale.y }, 2000, Phaser.Easing.Linear.None).loop();
	    	

	    splash.start();
	    rotate.start();
		
	},

	addLives: function(){
		this.lives++;
		this.addHeart(this.hearts.length);
	},

	removeLives: function(){
		this.lives--;
		var heart = this.hearts.pop();
		heart.destroy();
	},
	
};