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


////////////////////////////////////////////////
// Datos que se cargan desde un JSON externo
////////////////////////////////////////////////
var config = [
	{"turn": 1, "src": "Dialogs/img/pepe.png", "color": "blue"},
	{"turn": 2, "src": "Dialogs/img/sara.png", "color": "rgb(206, 0, 143)"}
];

var txt = [
	{"turn": 1, "text": "Hola Sara" },
	{"turn": 2, "text": "Hola Pepe" },
	{"turn": 2, "text": "Ayer no pare" },
	{"turn": 1, "text": "¿Que tal estas?" },
	{"turn": 2, "text": "Bien, ¿y tu?" },
	{"turn": 1, "text": "Bien tambien, aunque anoche se lio un poco" },
	{"turn": 2, "text": "¿y eso?" },
	{"turn": 1, "text": "¿Tu que crees..?" },
];

var pos = 0;
////////////////////////////////////////////////


$(document).ready(function(){
	init();	
});


/* 
 * Parameters:
 *   - configuration : { turn, src, color }
 *   - data          : { turn, text }
 *   - position      : default 0
 */
function init(configuration, data, position) {
	// config = configuration;
	// txt = data;
	// pos = pos;
	$('#dialog_container').prepend('<div id="text_container"><p class="text"></p></div>');
	$('#dialog_container').prepend('<img id="right_person" class="gray" src="' + config[0].src + '" />');
	$('#dialog_container').prepend('<img id="left_person" class="gray" src="' + config[1].src +'" />');
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
		$('#dialog_container').fadeOut(500);
	}
});



