var before = function (obj, method, wrapper) {
    var orig = obj[method];
    obj[method] = function() {
        var args = Array.prototype.slice.call(arguments);
        return wrapper.apply(this, function(){
            return orig.apply(obj, origArgs);
        }, args);
    }
    
    return obj[method];
}
    
var intersects = function(range) {
    return editor.getSelectionRange().intersects(range);
}

var addRanges = function(r1, r2) {

    var session = editor.getSession();
    var Range = require("ace/range").Range;
    var range1 = new Range(r1[0], r1[1], r1[2], r1[3]);
    var range2 = new Range(r2[0], r2[1], r2[2], r2[3]);
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
    
    range1.start  = session.doc.createAnchor(range1.start);
    range1.end    = session.doc.createAnchor(range1.end);
    range1.end.$insertRight = true;

    range2.start  = session.doc.createAnchor(range2.start);
    range2.end    = session.doc.createAnchor(range2.end);
    range2.end.$insertRight = true;
}