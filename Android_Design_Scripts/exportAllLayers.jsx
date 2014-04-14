//
//
//      目标文件夹: _________
//      文件前缀: boot_
//      数字格式: 1,2,3
//                01,02,03
//                001,002,003
//      导出方式: 从上到下
//                从下到上
//
//
//


var dir = Folder.selectDialog('Choose the dir you want to save images.');
var imageNamePrefix = 'f_';



for(var i = 0; i < activeDocument.artLayers.length; i ++) {
    if(i > 0) {
        activeDocument.artLayers[i-1].visible = false;
    }
    showLayer(i);
    savePNG(dir.fullName + '/' + imageNamePrefix + formatNumber(i+1, 3) + '.png');
    
    
    // transparent color for background
    
    // while done Beeeeeeeeeeeeeeee
    
    
    
    
}

/*
// 从上到下导出, 第一帧位于最上方, 所有图层可以可视或不可视.
// 速度较慢, 不适合图层超过100.
for(var i = 0; i < activeDocument.artLayers.length; i ++) {
    hideAllLayer();
    showLayer(i);
    savePNG(dir.fullName + '/' + imageNamePrefix + formatNumber(i+1, 3) + '.png');
}
*/
/*
// 从下到上导出, 第一帧位于最下方, 所有图层需要设置不可视. 不适合透明图层。
// 速度快

for(var i = 0; i < activeDocument.artLayers.length; i ++) {
    showLayer(activeDocument.artLayers.length - i);
    savePNG(dir.fullName + '/' + imageNamePrefix + formatNumber(i+1, 3) + '.png');
}
*/
function formatNumber(number, length) {
    while(String(number).length < length) {
        number = '0' + number;
        formatNumber(number, length);
    }
    return number;
}

function hideAllLayer(){
    for(var i = 0; i < activeDocument.artLayers.length; i ++) {
        activeDocument.artLayers[i].visible = false;
    }
}

function showLayer(index){
    activeDocument.artLayers[index].visible = true;
}

function savePNG(path){
    /*
    var targetFile = new File(path);
    var pngSaveOptions = new PNGSaveOptions();
        pngSaveOptions.compression = 9;
        pngSaveOptions.interlaced = false;
        activeDocument.saveAs(targetFile, pngSaveOptions, true, Extension.LOWERCASE);*/
    
    var targetFile = new File(path);
    var png24Options = new ExportOptionsSaveForWeb();
        png24Options.format = SaveDocumentType.PNG;
        png24Options.PNG8 = false;
        png24Options.transparency = true;
        png24Options.interlaced = false;
        png24Options.includeProfile = false;

    activeDocument.info = null;
    activeDocument.exportDocument(targetFile, ExportType.SAVEFORWEB, png24Options);
}