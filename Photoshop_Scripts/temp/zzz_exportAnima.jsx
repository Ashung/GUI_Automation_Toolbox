

// 720x1280, 540x960, 480x854
// 720x1280/bootanimation(shutdownanimation)/folder1/boot_001.png - 00N.png
// 720x1280/bootanimation(shutdownanimation)/folder2/boot_00(N+1).png

var dir = Folder.selectDialog('Choose the dir you want to save images.');
var imageNamePrefix = 'boot_';
//var animationType = 'bootanimation';
var animationType = 'shutdownanimation';
var bgColor_black = new SolidColor;
    bgColor_black.rgb.hexValue = '000000';
app.backgroundColor = bgColor_black;

var sizes = ['720x1280', '540x960', '480x854'];

/*
for (var i = 0; i < sizes.length; i++) {
    Folder (dir.fullName + '/' + sizes[i] + '/bootanimation/folder1').create();
    Folder (dir.fullName + '/' + sizes[i] + '/bootanimation/folder2').create();
    Folder (dir.fullName + '/' + sizes[i] + '/shutdownanimation/folder1').create();
    Folder (dir.fullName + '/' + sizes[i] + '/shutdownanimation/folder2').create();
}
*/


for(var i = 0; i < activeDocument.artLayers.length; i ++) { 
    
    if(i != 0) {
        activeDocument.artLayers[i-1].visible = false;
    }
    showLayer(i);

    savePNG(dir.fullName + '/720x1280/' + animationType + '/folder1/' + imageNamePrefix + formatNumber(i+1, 3) + '.png');
    
    app.open(File (dir.fullName + '/720x1280/' + animationType + '/folder1/' + imageNamePrefix + formatNumber(i+1, 3) + '.png'));
    activeDocument.resizeImage(540, 960, 72, ResampleMethod.BILINEAR);
    savePNG(File (dir.fullName + '/540x960/' + animationType + '/folder1/' + imageNamePrefix + formatNumber(i+1, 3) + '.png'));  
    activeDocument.activeHistoryState = activeDocument.historyStates[0];
    activeDocument.resizeImage(480, 853, 72, ResampleMethod.BILINEAR);
    activeDocument.resizeCanvas(480, 854, AnchorPosition.TOPLEFT);
    savePNG(File (dir.fullName + '/480x854/' + animationType + '/folder1/' + imageNamePrefix + formatNumber(i+1, 3) + '.png'));
    
    activeDocument.close(SaveOptions.DONOTSAVECHANGES);
       
    if(i == activeDocument.artLayers.length - 1) {
        //savePNG(dir.fullName + '/720x1280/' + animationType + '/folder2/' + imageNamePrefix + formatNumber(i+2, 3) + '.png');
        //savePNG(dir.fullName + '/480x854/' + animationType + '/folder2/' + imageNamePrefix + formatNumber(i+2, 3) + '.png');

        for (var j = 0; j < sizes.length; j++) {
            var lastPNG = File(dir.fullName + '/' + sizes[j] + '/' + animationType + '/folder1/' + imageNamePrefix + formatNumber(i+1, 3) + '.png');
            var folder2PNG = File(dir.fullName + '/' + sizes[j] + '/' + animationType + '/folder2/' + imageNamePrefix + formatNumber(i+2, 3) + '.png');
            lastPNG.copy(folder2PNG);
        }
    }    
}


function formatNumber(number, length) {
    while(String(number).length < length) {
        number = '0' + number;
        formatNumber(number, length);
    }
    return number;
}

function showLayer(index){
    activeDocument.artLayers[index].visible = true;
}

function savePNG(path){
    var targetFile = new File(path);
    var black = new RGBColor;
        black.hexValue = '000000';
    var png24Options = new ExportOptionsSaveForWeb();
        png24Options.format = SaveDocumentType.PNG;
        png24Options.PNG8 = false;
        png24Options.transparency = false;
        png24Options.interlaced = false;
        png24Options.includeProfile = false;
        png24Options.matteColor = black;
    activeDocument.info = null;
    activeDocument.exportDocument(targetFile, ExportType.SAVEFORWEB, png24Options);      
}

function clearSlices() {
    var idDlt = charIDToTypeID( "Dlt " );
    var desc1 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var ref1 = new ActionReference();
    var idslice = stringIDToTypeID( "slice" );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idAl = charIDToTypeID( "Al  " );
        ref1.putEnumerated( idslice, idOrdn, idAl );
        desc1.putReference( idnull, ref1 );
        executeAction( idDlt, desc1, DialogModes.NO );    
}

