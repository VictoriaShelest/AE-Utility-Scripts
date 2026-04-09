// Add Parent Controller to Each Selected Layer
// Creates one controller null per selected layer and parents the layer to it.
// Developed for Victoria Shelest
// Version 1.0

function makeUniqueLayerName(comp, baseName) {
    var newName = baseName;
    var suffix = 2;
    var exists = true;

    while (exists) {
        exists = false;
        for (var i = 1; i <= comp.numLayers; i++) {
            if (comp.layer(i).name === newName) {
                exists = true;
                newName = baseName + " " + suffix;
                suffix++;
                break;
            }
        }
    }
    return newName;
}

if (!(app.project.activeItem && app.project.activeItem instanceof CompItem)) {
    alert("Please open a composition.");
} else {
    var comp = app.project.activeItem;
    var selectedLayers = comp.selectedLayers;

    if (selectedLayers.length === 0) {
        alert("Please select at least one layer.");
    } else {
        app.beginUndoGroup("Add Parent Controller to Each Selected Layer");

        for (var i = 0; i < selectedLayers.length; i++) {
            var targetLayer = selectedLayers[i];
            if (!targetLayer || targetLayer.locked) {
                continue;
            }

            var oldParent = targetLayer.parent;
            var controller = comp.layers.addNull();
            controller.name = makeUniqueLayerName(comp, targetLayer.name + "_Controller");
            controller.label = 2;

            try {
                controller.threeDLayer = targetLayer.threeDLayer;
            } catch (err) {}

            try {
                controller.property("ADBE Transform Group").property("ADBE Anchor Point").setValue(
                    targetLayer.property("ADBE Transform Group").property("ADBE Anchor Point").value
                );
            } catch (errAP) {}

            try {
                controller.property("ADBE Transform Group").property("ADBE Position").setValue(
                    targetLayer.property("ADBE Transform Group").property("ADBE Position").value
                );
            } catch (errPos) {}

            try {
                controller.property("ADBE Transform Group").property("ADBE Scale").setValue(
                    targetLayer.property("ADBE Transform Group").property("ADBE Scale").value
                );
            } catch (errScale) {}

            if (targetLayer.threeDLayer) {
                try {
                    controller.property("ADBE Transform Group").property("ADBE Orientation").setValue(
                        targetLayer.property("ADBE Transform Group").property("ADBE Orientation").value
                    );
                } catch (errOri) {}
                try {
                    controller.property("ADBE Transform Group").property("ADBE Rotate X").setValue(
                        targetLayer.property("ADBE Transform Group").property("ADBE Rotate X").value
                    );
                } catch (errRX) {}
                try {
                    controller.property("ADBE Transform Group").property("ADBE Rotate Y").setValue(
                        targetLayer.property("ADBE Transform Group").property("ADBE Rotate Y").value
                    );
                } catch (errRY) {}
                try {
                    controller.property("ADBE Transform Group").property("ADBE Rotate Z").setValue(
                        targetLayer.property("ADBE Transform Group").property("ADBE Rotate Z").value
                    );
                } catch (errRZ) {}
            } else {
                try {
                    controller.property("ADBE Transform Group").property("ADBE Rotation").setValue(
                        targetLayer.property("ADBE Transform Group").property("ADBE Rotation").value
                    );
                } catch (errRot) {}
            }

            controller.inPoint = targetLayer.inPoint;
            controller.outPoint = targetLayer.outPoint;
            controller.startTime = targetLayer.startTime;

            controller.moveBefore(targetLayer);

            if (oldParent) {
                controller.parent = oldParent;
            }

            targetLayer.parent = controller;
        }

        app.endUndoGroup();
    }
}
