
#target photoshop;


var dir = Folder.selectDialog('Choose the dir you want to save images.');

for(var i = 0; i < activeDocument.layerSets.length; i ++) {
    
    // hide prev layerset
    if(i > 0) {
        activeDocument.layerSets[i-1].visible = false;
    }

    // show current layerset
    activeDocument.layerSets[i].visible = true;
    
    /*var newdir = new Folder(dir.fullName + '/' + activeDocument.layerSets[i].name.toLowerCase());
        newdir.create();
    */
    //activeDocument.activeLayer = activeDocument.layerSets[i];
    
    

    try {
        var filePath = dir.fullName + '/' + activeDocument.layerSets[i].name + '.png';
        savePNG(filePath);
        
        $.writeln(filePath + '.......... SAVE OK!');
        
    } catch(e) {}
    
}

function savePNG(path){
    var targetFile = new File(path);
    var png24Options = new ExportOptionsSaveForWeb();
        png24Options.format = SaveDocumentType.PNG;
        png24Options.PNG8 = false;
        png24Options.transparency = true;
        png24Options.interlaced = false;
        png24Options.includeProfile = false;

    activeDocument.info = null;
    activeDocument.exportDocument(targetFile, ExportType.SAVEFORWEB, png24Options);
    //$.writeln(path + '---OK');

}
