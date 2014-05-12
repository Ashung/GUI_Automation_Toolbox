/**
* @@@BUILDINFO@@@ exportPNG.jsx !Version! Mon May 12 2014 20:18:54 GMT+0800
*/
/*
 * Android Image Log
 * 
 * Create image logs for psd file veryday.
 * 'File' - 'Scripts' - 'Script Events Manager'
 *
 *
 *
 * Author: Ashung Hung
 *
 */

(function main(){
    'use strict'
    
    var ext = decodeURI(app.activeDocument.name).replace(/^.*\./,'');
    if(ext.toLowerCase() != 'psd' && ext.toLowerCase() != 'psb' && ext.toLowerCase() != 'pdd')
        return;
    
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