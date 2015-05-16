createBlocks = function(game) {
	blocks = game.add.group()
	blocks.enableBody = true;
	level.map.createFromObjects('Object Layer 1', tiledId.voidBlockId , 'void-block', 0, true, false, this.blocks);


	$.getJSON( "js/game/goals/goals.json", function(data) {
		var i = 0;

		blocks.forEach(
			function(block) {
		    	block.data = data.goals[i];
		    	i++;
			});
	});
}