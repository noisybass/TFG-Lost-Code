/* Create doors*/

createDoors = function(game) {

  doors = game.add.group();
  doors.physicsBodyType = Phaser.Physics.ARCADE;
  doors.enableBody = true;
  if (!doors){
    return;
  }
  level.map.createFromObjects('Object Layer 1', tiledId.doorDownId , 'items-sheet', 39 , true, false, this.doors);
  level.map.createFromObjects('Object Layer 1', tiledId.doorUpId , 'items-sheet', 40 , true, false, this.doors);
  doors.forEach(
    function(door) {  
        //Initialize
        door.body.allowGravity = false;
        door.body.immovable = true;
    });
};

