// FFX to Array v1.0
// Converts an FFX file into a byte array for scripting
// Developed by Victoria Shelest


(function ffxToArray() {
    function padNumber(value) {
        return String(value);
    }

    function getOutputFile(inputFile) {
        var baseName = inputFile.displayName || inputFile.name;
        var lastDot = baseName.lastIndexOf(".");
        if (lastDot > 0) {
            baseName = baseName.substring(0, lastDot);
        }
        return new File(inputFile.path + "/" + baseName + "_array.txt");
    }

    function binaryStringToByteArray(binaryString) {
        var bytes = [];
        for (var i = 0; i < binaryString.length; i++) {
            bytes.push(binaryString.charCodeAt(i) & 0xFF);
        }
        return bytes;
    }

    function formatByteArray(bytes, valuesPerLine) {
        var lines = [];
        var currentLine = [];
        var i;

        for (i = 0; i < bytes.length; i++) {
            currentLine.push(padNumber(bytes[i]));

            if ((i + 1) % valuesPerLine === 0) {
                lines.push(currentLine.join(", "));
                currentLine = [];
            }
        }

        if (currentLine.length > 0) {
            lines.push(currentLine.join(", "));
        }

        return lines.join(",\n");
    }

    function main() {
        var inputFile = File.openDialog("Select an FFX file", "*.ffx");
        if (!inputFile) {
            return;
        }

        if (!inputFile.exists) {
            alert("The selected file does not exist.");
            return;
        }

        inputFile.encoding = "BINARY";
        if (!inputFile.open("r")) {
            alert("Could not open the selected FFX file.");
            return;
        }

        var binaryContent = inputFile.read();
        inputFile.close();

        var bytes = binaryStringToByteArray(binaryContent);
        var formattedArray = formatByteArray(bytes, 24);

        var outputFile = getOutputFile(inputFile);
        outputFile.encoding = "UTF-8";

        if (!outputFile.open("w")) {
            alert("Could not create the output TXT file.");
            return;
        }

        outputFile.write(formattedArray);
        outputFile.close();

        alert("Done.\nSaved: " + outputFile.fsName);
    }

    app.beginUndoGroup("FFX to Array");
    main();
    app.endUndoGroup();
})();
