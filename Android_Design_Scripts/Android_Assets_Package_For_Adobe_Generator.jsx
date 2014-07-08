/**
* @@@BUILDINFO@@@ Android_Assets_Package_For_Adobe_Generator.jsx !Version! Fri Jun 06 2014 22:05:50 GMT+0800
*/
/*
 * Android Assets Package For Adobe Generator
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
    
    if(documents.length == 0) {
        $.writeln('NO DOCUMENTS!');
        return;
    }

    var root;
    try{
        root = activeDocument.path;
    }catch(e){
        //root = Folder('~/Desktop').selectDlg();
        root = '~/Desktop';
    }    
    var psdNameWithoutExt = activeDocument.name.replace(/\.[^\.]+$/, '');
    var assetsPath = root + '/' + psdNameWithoutExt + '-assets';
    if(!Folder(assetsPath).exists) {
        $.writeln('NO ASSETS FOLDER!');
        return;
    }
        
    var assets = Folder(assetsPath).getFiles();
    if(assets == null || assets.length == 0) {
        $.writeln('ASSETS FOLDER HAVE NO FILES!');
        return;
    }
    
    // Dialog ui.
    var ui = 
    "dialog {\
        text: 'Android Assets Package For Adobe Generator',\
        alignChildren: 'fill',\
        replace: Group {\
            orientation: 'column',\
            alignChildren: 'left', \
            label: StaticText { text: 'Replace Files:' },\
            replaceType: DropDownList {}\
        },\
        assets: Group {\
            orientation: 'column',\
            alignChildren: 'left', \
            label: StaticText { text: 'Assets:'},\
            assetsList: ListBox {\
                size: [300, 300], \
                properties: { multiselect: true } \
            }\
        },\
        separator2: Panel { preferredSize: [300, 0] },\
        buttons: Group {\
            orientation: 'row',\
            cancelBtn: Button {\
                alignment: ['right', 'center'], \
                text: 'Cancel'\
            },\
            runBtn: Button {\
                alignment: ['right', 'center'], \
                text: 'OK'\
            }\
        }\
    }";
    
    var assetsPackage = new Window(ui);
    
    // Assets List
    var assetsList = assetsPackage.assets.assetsList;
        assetsList.enabled = false;
        for(var i = 0; i < assets.length; i++) {
            assetsList.add('item', assets[i].name);
        }
        assetsList.onChange = function() {
            $.writeln(assetsList.selection);
        }
    
    // DropDownList
    var replaceType = assetsPackage.replace.replaceType;
        replaceType.add('item', 'Do Not Replace Files.');
        //replaceType.add('item', 'Replace All Files.');
        replaceType.add('item', 'User Choose.');
        replaceType.selection = replaceType.items[0];
        $.writeln('replaceType.selection.index ==' + replaceType.selection.index);
        replaceType.onChange = function() {
            if(this.selection.index == 1) {
                assetsList.enabled = true;
            } else {
                assetsList.enabled = false;
            }
            $.writeln('replaceType.selection.index ==' + replaceType.selection.index);
        }
    
    // Button event.
    assetsPackage.buttons.runBtn.onClick = function() {
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
            if(/_mdpi/i.test(assets[i].name)) {
                moveFile(assets[i], File(root + '/res/drawable-mdpi/' + assets[i].name.replace(/_mdpi/i, '')));
            }
            if(/_hdpi/i.test(assets[i].name)) {
                moveFile(assets[i], File(root + '/res/drawable-hdpi/' + assets[i].name.replace(/_hdpi/i, '')));
            }
            if(/_xhdpi/i.test(assets[i].name)) {
                moveFile(assets[i], File(root + '/res/drawable-xhdpi/' + assets[i].name.replace(/_xhdpi/i, '')));
            }
            if(/_xxhdpi/i.test(assets[i].name)) {
                moveFile(assets[i], File(root + '/res/drawable-xxhdpi/' + assets[i].name.replace(/_xxhdpi/i, '')));
            }
            if(/_xxxhdpi/i.test(assets[i].name)) {
                moveFile(assets[i], File(root + '/res/drawable-xxxhdpi/' + assets[i].name.replace(/_xxxhdpi/i, '')));
            }
            
            function moveFile(fileFrom, fileTo) {
                if(
                    // Do Not Replace Files.
                    (replaceType.selection.index == 0 && !fileTo.exites)
                    ||
                    // User Choose.
                    (replaceType.selection.index == 1 && assetsList.selection.toString().indexOf(fileFrom.name) >= 0)
                ){
                    $.writeln(fileFrom + '-->' + fileTo);
                    fileFrom.copy(fileTo);
                    fileFrom.remove();
                }
            }
        }
    
        // Remove empty folders.
        if(Folder(root + '/res/drawable-mdpi').getFiles().length == 0)
            Folder(root + '/res/drawable-mdpi').remove();
        if(Folder(root + '/res/drawable-hdpi').getFiles() == 0)
            Folder(root + '/res/drawable-hdpi').remove();
        if(Folder(root + '/res/drawable-xhdpi').getFiles() == 0)
            Folder(root + '/res/drawable-xhdpi').remove();
        if(Folder(root + '/res/drawable-xxhdpi').getFiles() == 0)
            Folder(root + '/res/drawable-xxhdpi').remove();
        if(Folder(root + '/res/drawable-xxxhdpi').getFiles() == 0)
            Folder(root + '/res/drawable-xxxhdpi').remove();
        
        assetsPackage.close();
    }
    
    assetsPackage.show();

})();
