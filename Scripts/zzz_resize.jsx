


var inputs = File.openDialog('SB', true);


for(var i=0; i < inputs.length; i++) {
    /*
    var w = new UnitValue(217, 'px');
    var h = new UnitValue(193, 'px');
    */

    var w = new UnitValue(213, 'px');
    var h = new UnitValue(189, 'px');
     
    app.open(inputs[i]);

    activeDocument.layers[0].isBackgroundLayer = true;
    activeDocument.resizeImage(w, h, 72, ResampleMethod.BILINEAR);

    var png24Options = new ExportOptionsSaveForWeb();
        png24Options.format = SaveDocumentType.PNG;
        png24Options.PNG8 = false;
        png24Options.transparency = true;
        png24Options.interlaced = false;
        png24Options.includeProfile = false;
    activeDocument.info = null;
    
    
    if(inputs[i].fullName.indexOf('.png') != -1) {
        var targetFile = new File(inputs[i].fullName.replace('.png', String ('_' + w.as('px') + 'x' + h.as('px') + '.png')));
    } else if(inputs[i].fullName.indexOf('.jpg') != -1) {
        var targetFile = new File(inputs[i].fullName.replace('.jpg', String ('_' + w.as('px') + 'x' + h.as('px') + '.png')));
    }
    
    activeDocument.exportDocument(targetFile, ExportType.SAVEFORWEB, png24Options);


    activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    
    $.writeln(inputs[i].fullName + ' ---- OK!');
}


