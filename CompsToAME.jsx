// CompstoAME v1.0
// Sends selected compositions to Adobe Media Encoder
// Developed by Victoria Shelest


(function () {
    if (!app.project) {
        alert("No project is open.");
        return;
    }

    var rq = app.project.renderQueue;
    var sel = app.project.selection;
    var comps = [];
    var tempRQItems = [];
    var i;

    // Check selection
    if (!sel || sel.length === 0) {
        alert("Please select one or more compositions in the Project panel.");
        return;
    }

    // Collect selected compositions only
    for (i = 0; i < sel.length; i++) {
        if (sel[i] instanceof CompItem) {
            comps.push(sel[i]);
        }
    }

    if (comps.length === 0) {
        alert("No compositions found in selection.");
        return;
    }

    if (rq.rendering) {
        alert("Render Queue is currently rendering. Please stop it before sending items to AME.");
        return;
    }

    try {
        // Add selected comps to AE Render Queue
        for (i = 0; i < comps.length; i++) {
            var rqItem = rq.items.add(comps[i]);
            tempRQItems.push(rqItem);
        }

        if (tempRQItems.length === 0) {
            alert("No items were prepared for AME.");
            return;
        }

        // Send queued items to AME without starting render
        if (app.project.renderQueue.canQueueInAME === true) {
            app.project.renderQueue.queueInAME(false);
        } else {
            alert("There are no queued items available for AME.");
            return;
        }

        // Give AME a short moment to receive the queue
        $.sleep(500);

    } catch (e) {
        alert("Queue to AME error: " + e.toString());
        return;

    } finally {
        // Remove temporary items from AE Render Queue
        for (var r = tempRQItems.length - 1; r >= 0; r--) {
            try {
                tempRQItems[r].remove();
            } catch (removeErr) {}
        }
    }

    //alert("Files added to Adobe Media Encoder.");
})();