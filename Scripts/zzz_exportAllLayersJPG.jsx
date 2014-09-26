//
// 保存JPG, 图层顺序从低到上
// 
//

var dir = Folder.selectDialog('Choose the dir you want to save images.');
var imageNamePrefix = 'wallpaper_';

for(var i = 0; i < activeDocument.artLayers.length; i ++) {
    activeDocument.artLayers[activeDocument.artLayers.length-1-i].visible = true;
    saveJPG(dir.fullName + '/' + imageNamePrefix + (i+1) + '.jpg');
}

function saveJPG(path){
    var targetFile = new File(path);
    var jpegSaveOptions = new JPEGSaveOptions();
        jpegSaveOptions.quality = 10;
        jpegSaveOptions.embedColorProfile = false;
        jpegSaveOptions.formatOptions = FormatOptions.OPTIMIZEDBASELINE; 
        activeDocument.saveAs(targetFile, jpegSaveOptions, true, Extension.LOWERCASE);
}