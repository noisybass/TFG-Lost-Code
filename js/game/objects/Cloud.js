/* Create clouds */

var clouds;

createCloud = function(game, number) {
	clouds = game.add.group();

	if ( !number ) {
		number = 1;	
	} 

	for ( var i=0;i<number;++i ) {
		addCloud(game);
	}

	return clouds;
	
};

cloudsMove = function(game) {

    clouds.forEach(function(cloud){
      cloud.x -= cloud.vx;
      cloud.play('anim', cloud.animTime, true);
      if ( cloud.x < -140 ) {
        var random = game.rnd.integer();
        cloud.x = game.width + (random % 100);
        cloud.y = (random % (game.height / 3));
      }
    }, this);

};

addCloud = function(game) {
	var random = game.rnd.integer();
	var x = game.width + (random % 100);
	var y = (random % (game.height / 3));
	var c = clouds.create(x, y, 'clouds');	
	c.vx  = 1 + (1 / (random % 5 + 1));
	c.z   = -1;
	c.frame = random % 2;
	c.animTime = 1 + (1 / random);
	c.animations.add('anim', [1,2]);
};