var editor = ace.edit("editor");
editor.$blockScrolling = Infinity;
editor.setTheme("ace/theme/monokai");
var JavaScriptMode = ace.require("ace/mode/javascript").Mode;
editor.getSession().setMode(new JavaScriptMode());
editor.setShowPrintMargin(false); // No mostrar la barra de en medio
editor.setReadOnly(true);






