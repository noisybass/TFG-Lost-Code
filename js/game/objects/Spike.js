/* Create spikes from JSON map*/
createSpikes = function(game) {

  spikes            = game.add.group();
  spikes.physicsBodyType = Phaser.Physics.ARCADE;
  spikes.enableBody = true;
  level.map.createFromObjects('Object Layer 1', tiledId.spikeId , 'spike-image', 0, true, false, this.spikes);
  spikes.forEach(
    function(spike) {
        //coin.body.gravity.y = (-1) * this.GRAVITY;
         
        //bridge.body.allowGravity = false;
        spike.body.immovable = true;
    });
  
};