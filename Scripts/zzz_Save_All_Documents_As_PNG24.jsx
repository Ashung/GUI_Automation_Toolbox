// Save_All_Documents_As_PNG24.jsx
// (c) Ashung Hung. 

try {
    for(var i = 0; i < documents.length; i ++) {
        activeDocument = documents[i];
        
        var targetFile = new File(activeDocument.fullName);

        var png24Options = new ExportOptionsSaveForWeb();
            png24Options.format = SaveDocumentType.PNG;
            png24Options.PNG8 = false;
            png24Options.transparency = false;
            png24Options.interlaced = false;
            png24Options.includeProfile = false;
        activeDocument.info = null;
        activeDocument.exportDocument(targetFile, ExportType.SAVEFORWEB, png24Options);
        
        $.writeln('Document: "' + activeDocument.fullName + '" save completed.');
        
        activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
} catch(e) {
    alert(e, 'Save All Documents As PNG24')
}