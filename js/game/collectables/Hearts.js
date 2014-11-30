/* Create hearts from JSON map */
createHearts = function(game) {

hearts            = game.add.group();
hearts.enableBody = true;
level.map.createFromObjects('CapaObjetos', tiledId.heartId, 'heart_image', 0, true, false, this.hearts);
hearts.forEach(
  function(heart) {
        heart.body.gravity.y = (-1) * this.GRAVITY;
  });

};