// Find C4D Comps v1.0
// Finds all compositions using the Cinema 4D renderer, selects them in the Project panel
// and lists them with a renderer summary for the whole project
// Developed by Victoria Shelest

(function () {
    var found = [];
    var all = {};

    for (var i = 1; i <= app.project.numItems; i++) {
        var item = app.project.item(i);
        if (!(item instanceof CompItem)) continue;

        all[item.renderer] = (all[item.renderer] || 0) + 1;
        item.selected = false;

        if (item.renderer === "ADBE Calder") {
            found.push(item.name);
            item.selected = true; // highlights it in the Project panel
            // item.renderer = "ADBE Advanced 3d"; // uncomment to switch them all
        }
    }

    var summary = "";
    for (var r in all) summary += r + ": " + all[r] + "\n";

    alert(
        "Cinema 4D comps: " + found.length + "\n\n" +
        found.join("\n") +
        "\n\nAll renderers in project:\n" + summary
    );
})();
