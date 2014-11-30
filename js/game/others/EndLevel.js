
/* */
  createEndLevel = function(game) {

    end_level = game.add.group();
    end_level.enableBody = true;
    level.map.createFromObjects('CapaObjetos', tiledId.end_level, 'sheet_spritesheet', tiledId.end_level-1, true, false, end_level);
    end_level.forEach(
      function (end) {
        end.body.immovable    = true;
      });
  }