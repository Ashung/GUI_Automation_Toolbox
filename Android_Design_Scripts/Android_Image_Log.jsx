/**
* @@@BUILDINFO@@@ Android_Image_Log.jsx !Version! Tue May 13 2014 12:13:46 GMT+0800
*/
/*
 * Android Image Log
 * 
 * Create image logs for psd file veryday.
 *
 * HOW TO USE:
 * 1, Open 'File' - 'Scripts' - 'Script Events Manager...' dialog. 
 * 2, Check the 'Enable Events to Run Scripts/Actions:'.
 * 3, In 'Photoshop Event' choose 'Save Document' event.
 * 4, check 'Script' radiobox and browse to Android_Image_Log.jsx.
 * 5, Press 'Add'.
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