/*
* Dialogs 1.0
*
* Dialogs allow create speechs between two people. You can configure
* their names and speech text color.
*
* The MIT License (MIT)
*
* Copyright (c) 2015 Mariano Hernandez Garcia
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/


var dialogs;	// All dialogs, loaded from JSON
var configs;	// All dialog's config, loaded from JSON
var txt;		// Current dialog
var config;		// Current dialog's config
var pos = 0;


$(document).ready(function(){

	// Load JSON file with dialogs
	$.getJSON( "js/game/others/dialogs.json", function(data) {
		dialogs = data.dialogs;
		configs = data.configs;
		//loadDialog(1);	
	});

	
});

// This will load on screen the dialog loaded form Dialog.json at number position.
// when dialog is over, then dialog window will be hidden automaticaly.
function loadDialog(number) {
	txt = dialogs[number];
	config = configs[number];
	init();
};

function showDialog() {
	$('#dialog_container').fadeIn(500);
}

function hideDialog() {
	$('#dialog_container').fadeOut(500);	
}


function init() {

	$('#dialog_container').prepend('<div id="text_container"><p class="text"></p></div>');
	$('#dialog_container').prepend('<img id="right_person" class="gray" src="' + config[0].src + '" />');
	$('#dialog_container').prepend('<img id="left_person" class="gray" src="' + config[1].src +'" />');
	showDialog();
	next();
}


function next() {

    $('.text').fadeOut(500, function() {
		if ( txt[pos].turn == 1 ) {
			$('.text').css('color', config[0].color);
			$('img#left_person').addClass('gray');
			$('img#right_person').removeClass('gray');
		}
		else {
			$('.text').css('color', config[1].color);		
			$('img#right_person').addClass('gray');
			$('img#left_person').removeClass('gray');
		}
        $('.text').text( txt[pos].text );
        pos++;
        $('.text').fadeIn(1000);    
    });
 
};

$('.dialog_button').click(function(){
	if ( pos < txt.length ) {
		next();
	}
	else {
		// Lanzar evento que notifique al juego de que ha terminado el dialogo
		// Ejemplo: los dialogos desaparecen	
		hideDialog();
		setTask();	
	}
});



