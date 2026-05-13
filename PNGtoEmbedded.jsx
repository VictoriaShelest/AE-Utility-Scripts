// PNG to Embedded v1.1
// Converts a PNG file into ExtendScript image data
// Developed by Victoria Shelest

(function () {
    function getOutputFile(inputFile) {
        var baseName = inputFile.displayName || inputFile.name;
        var lastDot = baseName.lastIndexOf(".");
        if (lastDot > 0) {
            baseName = baseName.substring(0, lastDot);
        }
        return new File(inputFile.path + "/" + baseName + "_embedded.txt");
    }

    function binaryToCharCodeString(binaryString) {
        var parts = [];
        var i;

        for (i = 0; i < binaryString.length; i++) {
            parts.push(binaryString.charCodeAt(i) & 0xFF);
        }

        return "var logoData = String.fromCharCode(" + parts.join(",") + ");\n";
    }

    function main() {
        var inputFile = File.openDialog("Select a PNG file", "*.png");
        if (!inputFile) {
            return;
        }

        if (!inputFile.exists) {
            alert("The selected file does not exist.");
            return;
        }

        inputFile.encoding = "BINARY";
        if (!inputFile.open("r")) {
            alert("Could not open the selected PNG file.");
            return;
        }

        var binaryContent = inputFile.read();
        inputFile.close();

        if (!binaryContent || binaryContent.length === 0) {
            alert("The selected file is empty.");
            return;
        }

        var outputText = binaryToCharCodeString(binaryContent);
        var outputFile = getOutputFile(inputFile);
        outputFile.encoding = "UTF-8";

        if (!outputFile.open("w")) {
            alert("Could not create the output TXT file.");
            return;
        }

        outputFile.write(outputText);
        outputFile.close();

        alert("Done.\nSaved: " + outputFile.fsName);
    }

    app.beginUndoGroup("PNG to Embedded");
    main();
    app.endUndoGroup();
})();