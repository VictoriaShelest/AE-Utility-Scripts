// Clean Layers v1.0
// Removes all effects and expressions from selected layers
// Developed by Victoria Shelest

(function () {
    app.beginUndoGroup("Clean Layers");

    function getActiveComp() {
        var item = app.project.activeItem;
        if (!(item && item instanceof CompItem)) {
            alert("Please open a composition and select at least one layer.");
            return null;
        }
        return item;
    }

    function removeExpressionsFromPropertyGroup(group) {
        if (!group || !group.numProperties) return;

        for (var i = 1; i <= group.numProperties; i++) {
            var prop = group.property(i);
            if (!prop) continue;

            if (prop.propertyType === PropertyType.PROPERTY) {
                if (prop.canSetExpression && prop.expression !== "") {
                    try {
                        prop.expression = "";
                        prop.expressionEnabled = false;
                    } catch (err) {}
                }
            } else if (
                prop.propertyType === PropertyType.INDEXED_GROUP ||
                prop.propertyType === PropertyType.NAMED_GROUP
            ) {
                removeExpressionsFromPropertyGroup(prop);
            }
        }
    }

    function removeAllEffects(layer) {
        var effects = layer.property("ADBE Effect Parade");
        if (!effects || effects.numProperties === 0) return;

        for (var i = effects.numProperties; i >= 1; i--) {
            try {
                effects.property(i).remove();
            } catch (err) {}
        }
    }

    var comp = getActiveComp();
    if (!comp) {
        app.endUndoGroup();
        return;
    }

    var selectedLayers = comp.selectedLayers;
    if (!selectedLayers || selectedLayers.length === 0) {
        alert("Select at least one layer.");
        app.endUndoGroup();
        return;
    }

    for (var l = 0; l < selectedLayers.length; l++) {
        var layer = selectedLayers[l];

        removeExpressionsFromPropertyGroup(layer);
        removeAllEffects(layer);
    }

    app.endUndoGroup();
})();