function createScore() {
	
	/*** Clases clave para ayudar a Bersara ***/
	//                                        //
	// Phaser.Text                            //
	// Phaser.Sprite                          //
	//                                        //
	/******************************************/

	/* Para crear el texto vamos a usar la función 
	   'Phaser.Game.add.text(x, y, text, style, group)', que nos 
	   devolverá un objeto de la clase 'Phaser.Text'. Vamos a 
	   guardar este texto en la variable 'this.scoreText', para 
	   poder hacer referencia a el más adelante.
	   Pon el texto en la posicion (16,16),
	   con un tamaño de fuente de 32px y color blanco.
	   El texto que necesitamos crear es 'this.scoreString' +
	   'this.score'. 'this.scoreString' contiene el texto "score" 
	   y 'this.score' contiene la puntuación actual */


	/* Por otro lado queremos que el texto este siempre visible en
	   la pantalla. Para ello tenemos que fijar el texto a la cámara.
	   Podemos hacerlo con la propiedad 'fixedToCamera' del texto */



}