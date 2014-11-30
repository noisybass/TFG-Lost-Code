/* Create shifting platforms from JSON map*/
createShiftingPlatforms = function(game) {

  var velocity = level.PLATFORM_VELOCITY;
  var gravity = level.GRAVITY;
  var currentTime = game.time.now;
  shifting_platforms = game.add.group();
  shifting_platforms.enableBody = true;
  level.map.createFromObjects('CapaObjetos', tiledId.shifting_platforms, 'shifting_platform_image', 0, true, false, this.shifting_platforms);
  shifting_platforms.forEach(
    function (platformBlock) {
      platformBlock.body.allowGravity = false; /*The gravity it doesn't affect*/
      platformBlock.body.immovable    = true;
      platformBlock.body.velocity.x   = velocity;
      platformBlock.moveTime          = Number(platformBlock.timeToMove) + currentTime;
    });
};


/* Updates platforms */
platformsMove = function(game) {

  var currentTime = game.time.now;
  shifting_platforms.forEach(
    function(platform) {
      if(currentTime > platform.moveTime) {
        platform.body.velocity.x   = (-1) * platform.body.velocity.x;
        platform.moveTime          = Number(platform.timeToMove) + currentTime;
      }
    });
}