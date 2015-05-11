function jump() {
	
	/*** Clases clave para ayudar a Bersara ***/
	//                                        //
	// Phaser.Sprite                          //
	// Phaser.Keyboard                        //
	// Phaser.Physics.Arcade                  //
	// Phaser.Physics.Arcade.Body             //
	//                                        //
	/******************************************/

	/*  */
	if (this.cursors.up.isDown && (this.sprite.body.onFloor() || this.sprite.touching.down) && this.game.time.now > this.jumpTimer) {



		/* Al igual que en la función 'move' tenemos que cambiar la 
		   animación, y depende de hacia donde mire Bersara. Si esta
		   mirando hacia la izquierda ejecutaremos 
		   'player_animation_jumpLeft', y si esta mirando hacia la
		   derecha 'player_animation_jumpRight' */


		/* Y por supuesto para poder saltar tenemos que cambiar su
		   velocidad en la Y, ya que tenemos que movernos en el eje Y.
		   La velocidad de salto esta guardada en 'this.walkSpeed'*/



		/* */
		this.jumpTimer = this.game.time.now + 750;
	}
}