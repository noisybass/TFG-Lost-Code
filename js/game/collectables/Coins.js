/* Create coins from JSON map*/
createCoins = function(game) {

  coins            = game.add.group();
  coins.enableBody = true;
  level.map.createFromObjects('CapaObjetos', tiledId.coinId , 'coin_spritesheet', 0, true, false, this.coins);
  coins.callAll('animations.add', 'animations', 'anim_coin', [0,1,2], 5, true);
  coins.callAll('animations.play', 'animations', 'anim_coin');
  coins.forEach(
    function(coin) {
          coin.body.gravity.y = (-1) * this.GRAVITY;
    });
  
};