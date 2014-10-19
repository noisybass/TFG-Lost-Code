== TFG ==

* Al caer el player al vacio, muere, es decir reaparece en el inicio del nivel

===  Estrategia   ===

* comprobar si esta chocando con la parte de abajo del canvas, y si es asi hacemos...

==== Dos maneras para morir/reaparecer ====

* 1: hacer this.game.state.start('Game'); con lo cual vuelve al preload del Game y carga de nuevo
     los datos sobrescribiendolos sobre las mismas variables.

* 2: directamente cambiarle las coordenadas x e y para que reaparezca donde antes.

* Pienso que tendremos que aplicar el primer caso para cuando se te acaben las vidas y salgas del nivel,
  pero mientras queden  vidas, pienso que es menos costoso cambiar las coordenadas y ya esta.
