/* Create doors*/

createDoors = function(game) {

  //doors.physicsBodyType = Phaser.Physics.ARCADE;
  doors.enableBody = true;
  level.map.createFromObjects('Object Layer 1', tiledId.doorId , 'door-image', 0 , true, false, this.doors);

};