// Extend Layers
// Extends the duration of selected layers and their precomps
// Developed by Victoria Shelest

app.beginUndoGroup("Extend Selected Layers and Precomps");

var EXTEND = 2; // seconds
var processed = {};

function extendComp(comp) {
    if (!(comp instanceof CompItem)) return;

    // Prevent processing the same precomp twice
    if (processed[comp.id]) return;
    processed[comp.id] = true;

    // Extend comp duration
    comp.duration += EXTEND;

    // Extend all layers inside
    for (var i = 1; i <= comp.numLayers; i++) {
        var layer = comp.layer(i);

        layer.outPoint += EXTEND;

        // Recurse into nested precomps
        if (layer.source instanceof CompItem) {
            extendComp(layer.source);
        }
    }
}

var comp = app.project.activeItem;

if (!(comp instanceof CompItem)) {
    alert("Please open a composition and select one or more layers.");
} else {

    var selected = comp.selectedLayers;

    if (selected.length === 0) {
        alert("Please select one or more layers.");
    } else {

        for (var i = 0; i < selected.length; i++) {

            var layer = selected[i];

            // Extend the selected layer itself
            layer.outPoint += EXTEND;

            // If it's a precomp, extend it recursively
            if (layer.source instanceof CompItem) {
                extendComp(layer.source);
            }
        }
    }
}

app.endUndoGroup();