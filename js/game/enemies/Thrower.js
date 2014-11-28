/* Create thrower enemies from JSON map */
createThrowers = function(game) {

  throwers                   = game.add.group();
  throwers_hammer            = game.add.group();
  throwers.enableBody        = true;
  throwers_hammer.enableBody = true;
  throwers.game              = game;
  throwers_hammer.game       = game;
  level.map.createFromObjects('CapaObjetos', tiledId.throwerId , 'thrower_spritesheet', 0, true, false, this.throwers);
  throwers.forEach(
    function(thrower) {
          thrower.state = State.MOVE;
          thrower.time  = 0;
          thrower.body.gravity.y = 0;
          thrower.animations.add('thrower_animation_quiet', [0], 1, false);
          thrower.animations.add('thrower_animation_move', [0,1], 5, true);
          thrower.animations.add('thrower_animation_attack', [1,2], 5, false);
    });
};



/* Update Throwers */
throwerMove = function(enemy) {

  var now = this.game.time.now;    
  var r   = this.game.rnd.integerInRange(0, 5);

  if (enemy.state == State.QUIET) {
    enemy.play('thrower_animation_quiet');
    enemy.body.velocity.x = 0;

    if (now - enemy.time > 500) {
      enemy.time  = now;
      enemy.state = State.MOVE;
    }
  }

  else if (enemy.state == State.MOVE) {
    enemy.play('thrower_animation_move');

    if ((now - enemy.time > 1000) && (r == 0 || r == 1)) {
      enemy.body.velocity.x = -50;
    }
    else if ((now - enemy.time > 1000) && (r == 2 || r == 3)) {
      enemy.body.velocity.x = 50; 
    }

    else {  // r == 4 || r == 5
      if (now - enemy.time > 3000) {
        enemy.time  = now;
        enemy.state = State.ATTACK;
      }
    }
  }

  else if (enemy.state == State.ATTACK) {
    enemy.play('thrower_animation_attack');
    if (now - enemy.time > 750) {
      createHammer(enemy, this.game);
      enemy.time  = now;
      enemy.state = State.QUIET;
    }
  }  

  hammerMove();
};

/* Creates thrower's attacking hammer */
createHammer = function(thrower, game) {
  
  var sprite = throwers_hammer.create(thrower.x - thrower.body.width, thrower.y, 'thrower_hammer_spritesheet');
  game.physics.enable(sprite, Phaser.Physics.ARCADE);
  sprite.animations.add('thrower_animation_hammer', [0,1,2,3], 5, true);
  sprite.animations.play('thrower_animation_hammer');
};

/* Updates Thrower's hammer if they exixts */
hammerMove = function() {

  throwers_hammer.forEach(
    function(hammer) {
          hammer.body.x -= 5;
          if (hammer.body.y > 800) {
            hammer.destroy();
          }

    });
};