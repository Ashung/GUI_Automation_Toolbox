// Save as PNG-24
// by Ashung Hung

try {    
    var dialogTitle = {
        en: 'Save As PNG-24',
        zh: '另存为PNG-24'
    }
    var alertMsg = {
        en: 'File already exist in the target location.\rDo you want to replaced.',
        zh: '此位置已经包含同名文件。是否替换?'
    }
    var targetFile = File.saveDialog(localize(dialogTitle));
    if(!/\.(png)$/.test(targetFile.name)) {
        if(/\.(png)$/i.test(targetFile.name)) {
            targetFile = File(targetFile.fullName.slice(0, targetFile.fullName.length-3) + 'png')
        } else {
            targetFile = File(targetFile.fullName + '.png');
        }
    }
    
    if(!targetFile.exists || confirm(localize(alertMsg))) {
        var png24Options = new ExportOptionsSaveForWeb();
            png24Options.format = SaveDocumentType.PNG;
            png24Options.PNG8 = false;
            png24Options.transparency = true;
            png24Options.interlaced = false;
            png24Options.includeProfile = false;
        activeDocument.info = null;
        activeDocument.exportDocument(targetFile, ExportType.SAVEFORWEB, png24Options);
    }
} catch (e) {
    //alert(e.message);
}