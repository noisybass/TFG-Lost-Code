$( document ).ready(function() {
    var editor = ace.edit("editor");
    var session = editor.getSession();
    var Range = require("ace/range").Range;
    var range1 = new Range(1, 4, 1, 10);
    var range2 = new Range(5, 4, 5, 10);
    var markerId = session.addMarker(range1, "readonly-highlight");
    var markerId = session.addMarker(range2, "readonly-highlight");
    
    editor.keyBinding.addKeyboardHandler({
        handleKeyboard : function(data, hash, keyString, keyCode, event) {
            if (hash === -1 || (keyCode <= 40 && keyCode >= 37)) return false;
            
            if (intersects(range1) || intersects(range2)) {
                return {command:"null", passEvent:false};
            }
        }
    });
    
    before(editor, 'onPaste', preventReadonly);
    before(editor, 'onCut',   preventReadonly);
    
    range1.start  = session.doc.createAnchor(range1.start);
    range1.end    = session.doc.createAnchor(range1.end);
    range1.end.$insertRight = true;

    range2.start  = session.doc.createAnchor(range2.start);
    range2.end    = session.doc.createAnchor(range2.end);
    range2.end.$insertRight = true;
    
    function before(obj, method, wrapper) {
        var orig = obj[method];
        obj[method] = function() {
            var args = Array.prototype.slice.call(arguments);
            return wrapper.apply(this, function(){
                return orig.apply(obj, origArgs);
            }, args);
        }
        
        return obj[method];
    }
    
    function intersects(range) {
        return editor.getSelectionRange().intersects(range);
    }
    
    function preventReadonly(next) {
        if (intersects(range)) return;
        next();
    }
});

