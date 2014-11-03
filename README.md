TFG
==

Cargar enemigos con Tiled
-------------------------

Para cargar los enemigos del Tiled, la clave es darle el gid del Tiled,
pero como yo aveces no se muy bien que numero de gid es el que le ha dado
Tiled, he creado una clase TiledIds en el cual poner los gid de todos
los objetos que vallamos a importar de Tiled.

si os rallais mucho, o a la minima que os jorobe la funcion Tilemap.createFromObjects
miradla en el codigo, la podeis buscar por ctl+F o si no es la linea 60448, pero vamos
haced un ctl+F y llegais antes de createFromObjects.

En principio este commit es para que veais como cargo los goombas, le he puesto
colisiones con el suelo y los he dejado en el mapa un poquito mas arriba para que
veais que es un objeto.
