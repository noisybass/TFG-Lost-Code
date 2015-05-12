function jump() {
	
	/*** Clases clave para ayudar a Bersara ***/
	//                                        //
	// Phaser.Sprite                          //
	// Phaser.Keyboard                        //
	// Phaser.Physics.Arcade                  //
	// Phaser.Physics.Arcade.Body             //
	//                                        //
	/******************************************/

	/* Para saltar tenemos que comprobar tres cosas:
	   -> Que hayamos pulsado la flecha arriba (this.cursors.up).
	   -> Que estemos tocando el suelo. Esto lo podemos comprobar
	   bien con la funcion 'onFloor' de Body o con la propiedad
	   'touching.down' del sprite.
	   -> Que no estemos ya saltando. Esto lo comprobamos con un
	   timer (this.jumpTimer) */
	if (this.cursors.up.isDown && (this.sprite.body.onFloor() || this.sprite.touching.down) && this.game.time.now > this.jumpTimer) {



		/* Al igual que en la función 'move' tenemos que cambiar la 
		   animación, y depende de hacia donde mire Bersara. Si esta
		   mirando hacia la izquierda ejecutaremos 
		   'player_animation_jumpLeft', y si esta mirando hacia la
		   derecha 'player_animation_jumpRight' */


		/* Y por supuesto para poder saltar tenemos que cambiar su
		   velocidad en la Y, ya que tenemos que movernos en el eje Y.
		   La velocidad de salto esta guardada en 'this.walkSpeed'*/



		/* Actualizamos el timer del salto. No podremos saltar hasta
		   dentro de 750 ms */
		this.jumpTimer = this.game.time.now + 750;
	}
}