/*
* Dialogs 1.0.1
*
* Dialogs allow create speechs between two characters. You can configure
* their names, speech text color and avatars.
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
var callback;	// Callback that will be invoque after showing dialog
var pos = 0;
var initialize = false;

$(document).ready(function(){

	// Load JSON file with dialogs
	$.getJSON( "js/game/others/dialogs.json", function(data) {
		dialogs = data.dialogs;
		configs = data.configs;
	});

	
});

// This will load on screen the dialog loaded form Dialog.json at number position.
// when dialog is over, then dialog window will be hidden automaticaly.
function loadDialog(number, call) {
	if ( number < dialogs.length ) {
		txt       = dialogs[number];
		config    = configs[number];
		callback  = call;
		pos       = 0;
		init();	
	}
	else {
		eval( call + '()' );
	}
	
};

function showDialog() {
	$('#dialog_container').fadeIn(500);
}

function hideDialog() {
	$('#dialog_container').fadeOut(500);	
}

function showNextButton() {
	$('.dialog_button').fadeIn(500);
}

function hideNextButton() {
	$('.dialog_button').fadeOut(500);	
}

function init() {
	if ( initialize == false ) {
		$('#dialog_container').prepend('<div id="text_container"><p class="text"></p></div>');
		$('#dialog_container').prepend('<img id="right_person" class="gray" src="' + config[0].src + '" />');
		$('#dialog_container').prepend('<img id="left_person" class="gray" src="' + config[1].src +'" />');	
		initialize = true;
	}
	$('#dialog_container').css('background-color', 'rgba(0,0,0,0.3)');
	hideNextButton();
	showDialog();
	next();
}


function next() {

    $('.text').fadeOut(500, function() {

    	if ( txt[pos] == undefined ) return;

		if ( txt[pos].turn == 1 ) {
			$('.text').css('color', 'white');	// config[0].color
			$('img#left_person').addClass('gray');
			$('img#right_person').removeClass('gray');
		}
		else {
			$('.text').css('color', 'white');		
			$('img#right_person').addClass('gray');
			$('img#left_person').removeClass('gray');
		}
        $('.text').text( txt[pos].text );
        pos++;
     
        $('.text').fadeIn(1000, function(){
        	showNextButton();
        });    
    });
 
};

$('.dialog_button').click(function(){
	
	hideNextButton();
	if ( pos < txt.length ) {
		next();
	}
	else {
		hideDialog();			
		$('#dialog_container').css('background-color', 'rgba(0,0,0,0)');
		if ( callback ) {
			eval( callback + '()' );
		}

	}
});



