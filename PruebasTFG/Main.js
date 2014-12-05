// Pongo TFG de momento hasta que tengamos el nombre del juego
var TFG = TFG || {};

game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-canvas');



$('#id-code-js-button').click(function() {
    var text = $('#id-code-js').val();
    //send to server and process response
    console.log(text);
    eval(text);
});