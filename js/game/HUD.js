HUD = function(game) {
	this.game        = game;

	this.score       = 0;
	this.scoreString = '';
	this.scoreText   = null;

	this.lives       = 3;
	this.livesString = '';
	this.livesText   = null;

	this.hearts      = null;
	this.heartSpace  = 20;
	this.heartsX     = 580;
	this.heartsY     = 30;

	this.scoreCharacters = new Array();
	this.scoreNumbers    = new Array();
	this.scoreSpace  = 17;
	this.spaceLetterToNumber = 30;
	this.scoreX      = 20;
	this.scoreY      = 30;
};

HUD.prototype = {

	create: function() {

		this.scoreCharacters.push(this.game.add.sprite(this.scoreX                    ,this.scoreY, 'hud-font', 10));
		this.scoreCharacters.push(this.game.add.sprite(this.scoreX + this.scoreSpace  ,this.scoreY, 'hud-font', 11));
		this.scoreCharacters.push(this.game.add.sprite(this.scoreX + this.scoreSpace*2,this.scoreY, 'hud-font', 12));
		this.scoreCharacters.push(this.game.add.sprite(this.scoreX + this.scoreSpace*3,this.scoreY, 'hud-font', 13));
		this.scoreCharacters.push(this.game.add.sprite(this.scoreX + this.scoreSpace*4,this.scoreY, 'hud-font', 14));
		for (i = 0; i < this.scoreCharacters.length; ++i){
			this.configureCharacter(this.scoreCharacters[i]);
		}
		this.addNumber(0);

		/*this.scoreString = 'Score: ';
		this.scoreText = this.game.add.text(0, 0, this.scoreString + this.score, { fontSize: '32px', fill: '#FFF' });
		this.scoreText.fixedToCamera = true;
		this.scoreText.cameraOffset.setTo(16, 16);*/

		/*this.livesString = 'Lives: ';
		this.livesText = this.game.add.text(0, 0, this.livesString + this.lives, { fontSize: '32px', fill: '#FFF' });
		this.livesText.fixedToCamera = true;
		this.livesText.cameraOffset.setTo(580, 16);*/
		this.hearts = [this.game.add.sprite(this.heartsX                    , this.heartsY, 'heart'),
					   this.game.add.sprite(this.heartsX + this.heartSpace  , this.heartsY, 'heart'),
					   this.game.add.sprite(this.heartsX + this.heartSpace*2, this.heartsY, 'heart')];

		for (i = 0; i < this.lives; ++i){
			this.addHearts(i);
		}
	},

	configureCharacter: function(character){
		
		character.anchor.setTo(0.5, 0.5); // centro de la rotacion
		character.fixedToCamera = true;
		character.scale.x = 0.45;
		character.scale.y = 0.45;

    	var sinusoidal = this.game.add.tween(character)
    	.to({ angle: character.angle + 360 }, 4000, Phaser.Easing.Sinusoidal.InOut).loop();

	    sinusoidal.start();
		
	},

	addNumber: function(number){

		this.score+= number;
		
		for (i = 0; i < this.scoreNumbers.length; ++i){
			this.scoreNumbers[i].destroy();
		}

		var string = this.score.toString();

		for (i = 0; i < string.length; ++i){
			console.log(string[i]);
			var number = this.game.add.sprite(this.scoreX + this.spaceLetterToNumber + this.scoreSpace*(4+i),this.scoreY, 'hud-font', parseInt(string[i]));
			this.configureCharacter(number);
			this.scoreNumbers.push(number);
		}
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