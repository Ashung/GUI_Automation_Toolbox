

(function main(){
    'use strict'
    
    var ext = decodeURI(app.activeDocument.name).replace(/^.*\./,'');
    if(ext.toLowerCase() != 'psd' && ext.toLowerCase() != 'psb') return;
    
    var name = app.activeDocument.name.replace(/\.[^\.]+$/, '');
    var path = app.activeDocument.path;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()<9 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
    var day = date.getDate()<10 ? '0'+date.getDate() : date.getDate();
    var dateString = year+'_'+month+'_'+day;
    var saveFile = new File(path + "/" + name + '_' + dateString + ".png");
    var pngSaveOptions = new PNGSaveOptions();
        pngSaveOptions.compression = 9;
        pngSaveOptions.interlaced = false;
        activeDocument.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE);
})();