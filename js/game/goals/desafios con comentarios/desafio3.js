function snailsMove() {
	
	/*** Clases clave para ayudar a Bersara ***/
	//                                        //
	// Phaser.Group                           //
	// Phaser.Physics.Arcade                  //
	// Phaser.Physics.Arcade.Body             //
	//                                        //
	/******************************************/

	/* Cuando el enemigo choca contra algo se da la vuelta 
	   y cambia de sentido. Para saber si se ha chocado 
	   podemos usar las propiedades 'blocked' o 'touching'
	   de Body */
	if (enemy.body.blocked.left || enemy.body.touching.left) {
		enemy.direction = State.LOOKINGLEFT;
	}
	else if (enemy.body.blocked.right || enemy.body.touching.right) {
		enemy.direction = State.LOOKINGLEFT;
	}

	/* Lo siguiente es cambiar su velocidad según la dirección
	   a la que este mirando, al igual que hicimos con Bersara.
	   También tendremos que cambiar su escala. Con la escala 
	   podemos dar la vuelta a nuestros sprites, como si se viesen
	   reflejados en un espejo. 
	   Para nuestros enemigos sólo tenemos en el spritesheet 
	   animaciones para andar hacia la izquierda, así que cambiaremos
	   la escala cuando ande hacia la derecha y así no nos harán 
	   falta más animaciones.
	   Por tanto, si vamos a movernos hacia la izquierda tendremos
	   que asignar una velocidad negativa (-enemy.walkSpeed) y una
	   escala positiva (enemy.scale = 1) */


	/* Si vamos a movernos hacia la derecha tendremos que asignar una
	   velocidad positiva (enemy.walkSpeed) y una escala negativa 
	   (enemy.scale = -1) para darle la vuelta a nuestro sprite */



	/* Por último, y no por ello menos importante, tenemos que matar
       a los caracoles si llegan a cierta profundidad. Así que si la 
       'y' es mayor o igual que 980 tendremos que matarles con el 
       método 'kill()' */



}