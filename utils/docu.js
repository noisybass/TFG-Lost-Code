// Fades out game and show Doc button, and shows documentation's iframe
function loadDoc() {
	$('#game-canvas').fadeOut(500);
	$('div#doc-container').toggle( "slide" );
	$('#button_menu_3').fadeOut(500);
	$('#button_menu_4').fadeIn(500);
}

// Fades out documentation's iframe and close doc button, and shows game
function closeDoc() {
	$('div#doc-container').fadeOut(500, function(){
		$('#game-canvas').fadeIn(500);	
		$('#button_menu_3').fadeIn(500);
		$('#button_menu_4').fadeOut(500);	
	});
	
}

