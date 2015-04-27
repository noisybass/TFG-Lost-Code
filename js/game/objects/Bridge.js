/* Create bridges*/
createBridges = function(game) {

  bridges = game.add.group();
  bridges.enableBody = true;
  level.map.createFromObjects('Object Layer 1', tiledId.bridgeId , 'bridge-sheet', 0 , true, false, this.bridges);
  bridges.forEach(
    function(bridge) {  
        //Initialize
        bridge.body.gravity.y = (-1) * this.GRAVITY;
        bridge.body.immovable = true;
        bridge.body.debug = true;
        //bridge.body.reset(bridge.x, bridge.y);
    });
};