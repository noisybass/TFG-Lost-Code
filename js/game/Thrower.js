Thrower = function(game, level) {
	this.game 	= game;
	this.level	= level;
	this.sprite = null;
	this.throwers_hammer  = null; // Group for Thrower hammers
};

Thrower.prototype = {

	createThrowers: function() {
	    this.level.throwers         	= this.game.add.group();
	    this.throwers_hammer  			= this.game.add.group();
	    this.level.throwers.enableBody        = true;
	    this.throwers_hammer.enableBody = true;
	    this.level.map.createFromObjects('CapaObjetos', tiledId.throwerId , 'thrower_spritesheet', 0, true, false, this.level.throwers);
	    this.level.throwers.forEach(
	      function (thrower) {
	            thrower.state = State.MOVE;
	            thrower.time = 0;
	            thrower.animations.add('thrower_animation_quiet', [0], 1, false);
	            thrower.animations.add('thrower_animation_move', [0,1], 5, true);
	            thrower.animations.add('thrower_animation_attack', [1,2], 5, false);
	            thrower.body.gravity.y = 0;
	      });
  },

  	createHammer: function(thrower) {
    	var sprite = this.throwers_hammer.create(thrower.x - thrower.body.width, thrower.y, 'thrower_hammer_spritesheet');
    	this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
    	sprite.animations.add('thrower_animation_hammer', [0,1,2,3], 5, true);
    	sprite.animations.play('thrower_animation_hammer');
  	},

	throwerCollision: function(player, thrower) {
	    if (thrower.body.touching.up) {
	      thrower.destroy();
	      player.sprite.body.velocity.y = player.MAX_VELOCITY_Y * (-1);
	      player.jumpTime = this.game.time.now + 750;
	    }
	    else {
	      player.die();
	    }
  	},

  	throwerHammerCollision: function(player, hammer) {
    	hammer.destroy();
    	player.die();
  	},


  	throwerMove: function(enemy) {

	    var now = this.game.time.now;    
	    var r = this.game.rnd.integerInRange(0, 5);


	    if (enemy.state == State.QUIET) {
	      enemy.play('thrower_animation_quiet');
	      enemy.body.velocity.x = 0;

	      if (now - enemy.time > 500) {
	        enemy.time = now;
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
	          enemy.time = now;
	          enemy.state = State.ATTACK;
	        }
	      }
	    }

	    else if (enemy.state == State.ATTACK) {
	      enemy.play('thrower_animation_attack');
	      if (now - enemy.time > 750) {
	        this.createHammer(enemy);
	        enemy.time = now;
	        enemy.state = State.QUIET;
	      }
	    }  

	    //this.hammerMove();
  },

  hammerMove: function() {
    this.throwers_hammer.forEach(
      function (hammer) {
            hammer.body.x -= 5;
            if (hammer.body.y > 800) {
              hammer.destroy();
            }

      });
  }

};