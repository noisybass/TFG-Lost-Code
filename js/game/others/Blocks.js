createBlocks = function(game) {
	blocks = game.add.group()
	blocks.enableBody = true;
	level.map.createFromObjects('CapaObjetos', 1 , 'sheet_spritesheet', 0, true, false, this.blocks);


	$.getJSON( "js/game/others/goals.json", function(data) {
		var i = 0;

		blocks.forEach(
			function(block) {
		    	block.data = data.goals[i];
		    	i++;
			});
	});
}