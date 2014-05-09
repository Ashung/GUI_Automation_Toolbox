
#target 'photoshop';

var NormalToRetina = true;

var targetFile = File.saveDialog('Exprot Both Normal and Retina Images', 'png: *.png');

if(targetFile != null) {
    
    // Retina Image
    var ext = targetFile.fullName.replace(/^.*\./, '.');
    var retinaImage = File(targetFile.fullName.replace(/\.[^\.]+$/, '@2x') + ext);
    
    if(NormalToRetina) {
        exportPNG(targetFile);
        activeDocument.resizeImage('200 %', '200 %', 72, ResampleMethod.BILINEAR);
        exportPNG(retinaImage);
    } else {
        exportPNG(retinaImage);
        activeDocument.resizeImage('50 %', '50 %', 72, ResampleMethod.BILINEAR);
        exportPNG(targetFile);
    }
}

function exportPNG(targetFile) {
    activeDocument.info = null;
    var png24Options = new ExportOptionsSaveForWeb();
        png24Options.format = SaveDocumentType.PNG;
        png24Options.PNG8 = false;
        png24Options.transparency = true;
        png24Options.interlaced = false;
        png24Options.includeProfile = false;
    activeDocument.exportDocument(targetFile, ExportType.SAVEFORWEB, png24Options);
}