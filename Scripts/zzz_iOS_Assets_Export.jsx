





var NormalToRetina;

var dialog = new Window('dialog', 'PSD for Normal or Retina.');
    dialog.size = [300, 60];
    dialog.alignChildren = ['center', 'center'];
    dialog.orientation = 'row';
    dialog.btnNormal = dialog.add('button', undefined, 'Normal');
    dialog.btnRetina = dialog.add('button', undefined, 'Retina (@2x)');
    dialog.btnNormal.onClick = function() {
        NormalToRetina = true;
        dialog.close();
    }
    dialog.btnRetina.onClick = function() {
        NormalToRetina = false;
        dialog.close();
    }
    dialog.show();

if(NormalToRetina != undefined) {

    var targetFile = File.saveDialog('Exprot Both Normal and Retina Images (DO NOT TYPE @2x)', 'png: *.png');

    if(targetFile != null) {
        
        // Retina Image
        // var ext = targetFile.fullName.replace(/^.*\./, '.');
        // var retinaImage = File(targetFile.fullName.replace(/\.[^\.]+$/, '@2x') + ext);
        if(/\.png$/i.test(targetFile.fullName) == false) {
            targetFile = File(targetFile.fullName + '.png');
        }
        
        $.writeln(targetFile.fullName);
        
        var retinaImage = File(targetFile.fullName.replace(/\.png$/i, '@2x.png'));
        
        $.writeln(retinaImage.fullName);
        
        if(NormalToRetina) {
            exportPNG(targetFile);
            activeDocument.resizeImage(
                activeDocument.width.as('px') * 2,
                activeDocument.height.as('px') * 2,
                72,
                ResampleMethod.NEARESTNEIGHBOR);
            exportPNG(retinaImage);
        } else {
            exportPNG(retinaImage);
            activeDocument.resizeImage(
                Math.ceil(activeDocument.width.as('px') / 2),
                Math.ceil(activeDocument.height.as('px') / 2),
                72,
                ResampleMethod.BILINEAR);
            exportPNG(targetFile);
        }
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