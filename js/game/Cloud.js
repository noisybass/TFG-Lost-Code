/* Create cloud */

var clouds;

createCloud = function(game, number) {
	clouds = game.add.group();

	if ( !number ) {
		number = 1;	
	} 

	for ( var i=0;i<number;++i ) {
		addCloud(game);
	}
	
};

cloudsMove = function(game) {

    clouds.forEach(function(cloud){
      cloud.x -= cloud.vx;
      if ( cloud.x < -140 ) {
        cloud.destroy();
   			addCloud(game);
      }
    }, this);

};

addCloud = function(game) {
	var c = clouds.create(game.width + (game.rnd.integer() % 100), (game.rnd.integer() % game.height) - 300, 'clouds');	
	c.vx = 1 + (1 / (game.rnd.integer() % 5 + 1));
	c.z = -1;
};