function jump() {
\n
\n\t/*** Clases clave para ayudar a Bersara ***/
\n\t//                                        //
\n\t// Phaser.Sprite                          //
\n\t// Phaser.Keyboard                        //
\n\t// Phaser.Physics.Arcade                  //
\n\t// Phaser.Physics.Arcade.Body             //
\n\t//                                        //
\n\t/******************************************/
\n
\n\t/* Para saltar tenemos que comprobar tres cosas:
\n\t   -> Que hayamos pulsado la flecha arriba (this.cursors.up).
\n\t   -> Que estemos tocando el suelo. Esto lo podemos comprobar
\n\t      bien con la funcion 'onFloor' de Body o con la propiedad
\n\t      'touching.down' del sprite.
\n\t   -> Que no estemos ya saltando. Esto lo comprobamos con un
\n\t      timer (this.jumpTimer) */
\n\tif (this.cursors.up.isDown && (this.sprite.body.onFloor() || this.sprite.touching.down) && this.game.time.now > this.jumpTimer) {
\n
\n
\n\t\t/* Al igual que en la función 'move' tenemos que cambiar 
\n\t\t   la animación, y depende de hacia donde mire Bersara. 
\n\t\t   Si esta mirando hacia la izquierda ejecutaremos 
\n\t\t   'player_animation_jumpLeft', y si esta mirando hacia 
\n\t\t   la derecha 'player_animation_jumpRight' */
\n
\n
\n\t\t/* Y por supuesto para poder saltar tenemos que cambiar 
\n\t\t   su velocidad en la Y, ya que tenemos que movernos en el 
\n\t\t   eje Y. La velocidad de salto esta guardada en 
\n\t\t   'this.walkSpeed'*/
\n
\n
\n
\n\t\t/* Actualizamos el timer del salto. No podremos saltar 
\n\t\t   hasta dentro de 750 ms */
\n\t\tthis.jumpTimer = this.game.time.now + 750;
\n\t}
\n}