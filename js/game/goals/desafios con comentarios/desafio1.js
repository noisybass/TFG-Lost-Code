function move() {
	
	/*** Clases clave para ayudar a Bersara ***/
	//                                        //
	// Phaser.Sprite                          //
	// Phaser.Keyboard                        //
	// Phaser.Physics.Arcade                  //
	// Phaser.Physics.Arcade.Body             //
	//                                        //
	/******************************************/

	/* En this.cursors tenemos un objeto con la información de 
	   nuestros 4 controles: flecha arriba (up), flecha abajo (down),
	   flecha derecha (right), flecha izquierda (down)
	   Si queremos saber si alguno de los controles ha sido pulsado
	   podemos consultar su propiedad 'isDown' */
	if (this.cursors.right.isDown) {
		/* En el caso de haber pulsado la flecha derecha nos moveremos 
		   en el sentido positivo del eje X, y por tanto nuestra 
		   velocidad en la X tiene que ser positiva
		   En 'this.walkSpeed' tenemos la velocidad que necesitamos 
		   para caminar */
		this.sprite.body.velocity.x = this.walkSpeed;

		/* Antes de asignar la animación de andar hacia la derecha 
		   tenemos que comprobar que estamos en el suelo. Para ello
		   nos fijaremos en las propiedad 'touching' de body */
		if (this.sprite.body.onFloor() || this.sprite.body.touching.down) {
			/* Para ejecutar una animación usamos la función 'play'
			   de 'sprite'. En este caso ejecutaremos 
			   'player_animation_moveRight' */
			this.sprite.play('player_animation_moveRight', 5, true);
		}

		/* Para cambiar el sentido en el que mira Bersara nos 
		   fijaremos en nuestra dirección. Tenemos dos posibles 
		   direcciones: 'State.LOOKINGLEFT' y 'State.LOOKINGRIGHT' */
		if (this.direction == State.LOOKINGLEFT) {
			/* Sólo cambiamos su sentido si estaba mirando en sentido
			   contrario */
			this.direction = State.LOOKINGRIGHT;
		}
	}



	/* Ahora te toca a ti!! Lo primero es comprobar si se ha pulsado
	   la flecha izquierda (this.cursors.left) */


	/* Si es así tenemos que ir en el sentido negativo del eje X, por 
	   lo que asignaremos '-walkSpeed' como nueva velocidad */


	/* Comprobamos si Bersara esta en el suelo, igual que hemos hecho 
	   antes, y si es así cambiamos su animación. Esta vez toca 
	   'player_animations_moveLeft' */


	/* Y por último tenemos que cambiar el sentido de Bersara en caso
	   de que este mirando en sentido contrario */



	/* Si no se ha pulsado nada no moveremos a Bersara. En este caso 
	   lo único que tenemos que hacer es asegurarnos de que se
	   ejecuta la animación correcta, dependiendo de a donde este 
	   mirando Bersara */
	else {
		if (this.direction == State.LOOKINGLEFT) {
			this.sprite.play('player_animation_standUpLeft');
		}
		else if (this.direction == State.LOOKINGRIGHT) {
			this.sprite.play('player_animation_standUpRight');
		}

		/* Y ponemos su velocidad a 0 ya que no tiene que moverse */
		this.sprite.body.velocity.x = 0;
	}
}