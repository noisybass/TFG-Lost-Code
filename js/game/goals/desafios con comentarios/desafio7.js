function createDoors(game) {
	
	/*** Clases clave para ayudar a Bersara ***/
	//                                        //
	// Phaser.Tilemap                         //
	// Phaser.Group                           //
	//                                        //
	/******************************************/

	/* Para que los objetos de un grupo puedan verse y se pueda
	   chocar con ellos necesitamos darles un cuerpo físico. 
	   Podemos hacer esto mediante la propiedad 'enableBody' de
	   la clase 'Phaser.Group' */



	/* Pero no sirve de nada darles física si no tenemos objetos
	   dentro de este grupo. En vez de crear los objetos manualmente
	   los vamos a obtener desde el mapa */
	level.map.createFromObjects('Object Layer 1', tileId.doorId, 'door-image', 0, true, false, this.doors);
} 