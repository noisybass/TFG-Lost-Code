/* Create coins from JSON map*/
createCoins = function(game) {

  coins            = game.add.group();
  coins.physicsBodyType = Phaser.Physics.ARCADE;
  coins.enableBody = true;
  level.map.createFromObjects('Object Layer 1', tiledId.coinId , 'coin-image', 0, true, false, this.coins);
  coins.callAll('animations.add', 'animations', 'anim_coin', [0,1,2], 5, true);
  coins.callAll('animations.play', 'animations', 'anim_coin');
  coins.forEach(
    function(coin) {
        //coin.body.gravity.y = (-1) * this.GRAVITY;
         
        coin.body.allowGravity = false;
        coin.body.immovable = true;
    });
  
};