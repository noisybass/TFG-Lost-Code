function ipCollision(player, enemy) {
	
	/*** Clases clave para ayudar a Bersara ***/
	//                                        //
	// Phaser.Group                           //
	// Phaser.Physics.Arcade                  //
	// Phaser.Physics.Arcade.Body             //
	//                                        //
	/******************************************/

	/* Sólo vamos a matar al enemigo si le hemos tocado por arriba
	   (ya que hemos saltado sobre el). Para saberlo podemos consultar
	   su propiedad 'touching.up'.
	   En caso afirmativo mataremos al enemigo, con la funcion 'kill()',
	   y luego haremos rebotar a Bersara. Para hacer que rebote tan solo
	   tenemos que hacer lo mismo que hicimos en la función 'jump()',
	   modificar su velocidad vertical y actualizar 'this.jumpTime' */



	/* En caso de que Bersara haya tocado a un enemigo pero no haya
	   sido por arriba, morirá y perderá una vida */
	else {
		this.die();
	}

}