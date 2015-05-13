function move() {\n\n\t/*** Clases clave para ayudar a Bersara ***/\n\t//                                        //\n\t// Phaser.Sprite                          //\n\t// Phaser.Keyboard                        //\n\t// Phaser.Physics.Arcade                  //\n\t// Phaser.Physics.Arcade.Body             //\n\t//                                        //\n\t/******************************************/\n\n\t/* En this.cursors tenemos un objeto con la información de \n\t   nuestros 4 controles: flecha arriba (up), flecha abajo (down),\n\t   flecha derecha (right), flecha izquierda (down)\n\t   Si queremos saber si alguno de los controles ha sido pulsado\n\t   podemos consultar su propiedad 'isDown' */\n\tif (this.cursors.right.isDown) {\n\t\t/* En el caso de haber pulsado la flecha derecha nos moveremos \n\t\t   en el sentido positivo del eje X, y por tanto nuestra \n\t\t   velocidad en la X tiene que ser positiva\n\t\t   En 'this.walkSpeed' tenemos la velocidad que necesitamos \n\t\t   para caminar */\n\t\tthis.sprite.body.velocity.x = this.walkSpeed;\n\n\t\t/* Antes de asignar la animación de andar hacia la derecha \n\t\t   tenemos que comprobar que estamos en el suelo. Para ello\n\t\t   nos fijaremos en las propiedad 'touching' de body */\n\t\tif (this.sprite.body.onFloor() || this.sprite.body.touching.down) {\n\t\t\t/* Para ejecutar una animación usamos la función 'play'\n\t\t\t   de 'sprite'. En este caso ejecutaremos \n\t\t\t   'player_animation_moveRight' */\n\t\t\tthis.sprite.play('player_animation_moveRight', 5, true);\n\t\t}\n\n\t\t/* Para cambiar el sentido en el que mira Bersara nos \n\t\t   fijaremos en nuestra dirección. Tenemos dos posibles \n\t\t   direcciones: 'State.LOOKINGLEFT' y 'State.LOOKINGRIGHT' */\n\t\tif (this.direction == State.LOOKINGLEFT) {\n\t\t\t/* Sólo cambiamos su sentido si estaba mirando en sentido\n\t\t\t   contrario */\n\t\t\tthis.direction = State.LOOKINGRIGHT;\n\t\t}\n\t}\n\n\n\n\t/* Ahora te toca a ti!! Lo primero es comprobar si se ha pulsado\n\t   la flecha izquierda (this.cursors.left) */\n\n\n\t/* Si es así tenemos que ir en el sentido negativo del eje X, por \n\t   lo que asignaremos '-walkSpeed' como nueva velocidad */\n\n\n\t/* Comprobamos si Bersara esta en el suelo, igual que hemos hecho \n\t   antes, y si es así cambiamos su animación. Esta vez toca \n\t   'player_animations_moveLeft' */\n\n\n\t/* Y por último tenemos que cambiar el sentido de Bersara en caso\n\t   de que este mirando en sentido contrario */\n\n\n\n\t/* Si no se ha pulsado nada no moveremos a Bersara. En este caso \n\t   lo único que tenemos que hacer es asegurarnos de que se\n\t   ejecuta la animación correcta, dependiendo de a donde este \n\t   mirando Bersara */\n\telse {\n\t\tif (this.direction == State.LOOKINGLEFT) {\n\t\t\tthis.sprite.play('player_animation_standUpLeft');\n\t\t}\n\t\telse if (this.direction == State.LOOKINGRIGHT) {\n\t\t\tthis.sprite.play('player_animation_standUpRight');\n\t\t}\n\n\t\t/* Y ponemos su velocidad a 0 ya que no tiene que moverse */\n\t\tthis.sprite.body.velocity.x = 0;\n\t}\n}\n\n