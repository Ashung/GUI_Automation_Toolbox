/**
* @@@BUILDINFO@@@ Android_Asset_Package_For_Adobe_Generator.jsx !Version! Mon May 19 2014 16:47:16 GMT+0800
*/
/*
 * Android Asset Package For Adobe Generator
 * 
 * First use "Android_Layer_Namer_For_Adobe_Generator.jsx" to generate assets, 
 * then use this script to move asset to right folders and change the file name in rightway.
 *
 * Author: Ashung Hung
 *
 */

#target 'photoshop';

(function(){
    'use strict'
    
    if(documents.length == 0)
        return;
    
    var root = activeDocument.path;
    var psdNameWithoutExt = activeDocument.name.replace(/\.[^\.]+$/, '');
    var assetsPath = root + '/' + psdNameWithoutExt + '-assets';

    if(!Folder(assetsPath).exists)
        return;

    var assets = Folder(assetsPath).getFiles();
    if(assets != null) {
        // Create folders.
        if(!Folder(root + '/res').exists)
            Folder(root + '/res').create();
        if(!Folder(root + '/res/drawable-mdpi').exists)
            Folder(root + '/res/drawable-mdpi').create();
        if(!Folder(root + '/res/drawable-hdpi').exists)
            Folder(root + '/res/drawable-hdpi').create();
        if(!Folder(root + '/res/drawable-xhdpi').exists)
            Folder(root + '/res/drawable-xhdpi').create();
        if(!Folder(root + '/res/drawable-xxhdpi').exists)
            Folder(root + '/res/drawable-xxhdpi').create();
        if(!Folder(root + '/res/drawable-xxxhdpi').exists)
            Folder(root + '/res/drawable-xxxhdpi').create();
        
        // Move assets to res/drawable-[dpi] folder.
        for(var i = 0; i < assets.length; i++) {
            if(/^mdpi_/i.test(assets[i].name)) {
                assets[i].copy(root + '/res/drawable-mdpi/' + assets[i].name.replace(/^mdpi_/i, ''));
                assets[i].remove();
            }
            if(/^hdpi_/i.test(assets[i].name)) {
                assets[i].copy(root + '/res/drawable-hdpi/' + assets[i].name.replace(/^hdpi_/i, ''));
                assets[i].remove();
            }
            if(/^xhdpi_/i.test(assets[i].name)) {
                assets[i].copy(root + '/res/drawable-xhdpi/' + assets[i].name.replace(/^xhdpi_/i, ''));
                assets[i].remove();
            }
            if(/^xxhdpi_/i.test(assets[i].name)) {
                assets[i].copy(root + '/res/drawable-xxhdpi/' + assets[i].name.replace(/^xxhdpi_/i, ''));
                assets[i].remove();
            }
            if(/^xxxhdpi_/i.test(assets[i].name)) {
                assets[i].copy(root + '/res/drawable-xxxhdpi/' + assets[i].name.replace(/^xxxhdpi_/i, ''));
                assets[i].remove();
            }
        }

        // Remove empty folders.
        if(!Folder(root + '/res/drawable-mdpi').getFiles())
            Folder(root + '/res/drawable-mdpi').remove();
        if(!Folder(root + '/res/drawable-hdpi').getFiles())
            Folder(root + '/res/drawable-hdpi').remove();
        if(!Folder(root + '/res/drawable-xhdpi').getFiles())
            Folder(root + '/res/drawable-xhdpi').remove();
        if(!Folder(root + '/res/drawable-xxhdpi').getFiles())
            Folder(root + '/res/drawable-xxhdpi').remove();
        if(!Folder(root + '/res/drawable-xxxhdpi').getFiles())
            Folder(root + '/res/drawable-xxxhdpi').remove();
    }

})();
