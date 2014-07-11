/**
* @@@BUILDINFO@@@ Android_Assets_Export.jsx !Version! Mon Jun 30 2014 20:48:10 GMT+0800
*/
/*
 * Android Assets Export
 * 
 * Automation resize psd file and exprot PNG for different dpi.
 *
 * Author: Ashung Hung
 *
 */

(function(){
    'use strict'

    if(documents.length == 0) {
        $.writeln('NO DOCUMENTS!');
        return;
    }
        
    // Default dpi config.
    var psdDPI = 'mdpi';

    var ui = 
    "dialog {\
        text: 'Android Asset Export',\
        alignChildren: 'fill',\
        docDPI: Group {\
            orientation: 'column',\
            alignChildren: 'left', \
            labelFiles: StaticText { text: 'Your document DPI (mdpi/xhdpi recommend):' },\
            docDPIList: DropDownList {\
                size: [300, 25] \
            }\
        },\
        exportPath: Group {\
            orientation: 'column',\
            alignChildren: 'left', \
            labelFiles: StaticText { text: 'Export assets to:' },\
            pathFormItem: Group {\
                orientation: 'row',\
                pathText: EditText {\
                    size: [210, 25] \
                },\
                pathBrowser: Button { \
                    text: 'Browser...', \
                    size: [80, 25] \
                }\
            }\
        },\
        exportFileName: Group {\
            orientation: 'column',\
            alignChildren: 'left', \
            labelFiles: StaticText { text: 'File name (Not include \".png/.9.png\"):' },\
            fileNameText: EditText {\
                size: [300, 25] \
            }\
        },\
        ninePatch: Group {\
            orientation: 'column',\
            alignChildren: 'left', \
            labelNinePatch: StaticText { text: 'Nine-Patch:'},\
            checkboxNinePatch: Checkbox {\
                value: false,\
                text: 'Yes.'\
            }\
        },\
        exportDPI: Group {\
            orientation: 'column',\
            alignChildren: 'left', \
            labelExport: StaticText { text: 'Export:'},\
            dpis: Group {\
                orientation: 'row' \
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
   
    var NinePatchResize = new Window(ui);
    
    var docDPIList = NinePatchResize.docDPI.docDPIList;
    var docDPI;
    var path = NinePatchResize.exportPath.pathFormItem.pathText;
    var browser = NinePatchResize.exportPath.pathFormItem.pathBrowser;
    var fileName = NinePatchResize.exportFileName.fileNameText;
    var dpis = ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'];
    
    // Initialize docDPI DropDownList
    for(var i = 0; i < dpis.length; i ++) {
        docDPIList.add('item', dpis[i]);
        if(dpis[i] == psdDPI) {
            docDPIList.selection = docDPIList.items[i];
            docDPI = docDPIList.selection.text;
        }
    }
    docDPIList.onChange = function() {
        docDPI = docDPIList.selection.text;
    }

    // Initialize Path
    try {
        //path.text = String(activeDocument.path).replace(/\/drawable-(mdpi|hdpi|xhdpi|xxhdpi|xxxhdpi)/i, '');
        path.text = activeDocument.path + '/res';
        
    } catch(e) {
        path.text = Folder.desktop.fullName + '/res';
       //$.writeln(path.text) 
    }
    
   
    
    browser.onClick = function() {
        var f = Folder(path.text).selectDlg('Select the "res" folder:');
        if(f != null)
            path.text = f.fullName + '/res';
    }

    // Initialize File Name
    fileName.text = activeDocument.activeLayer.name;

    // NinePatch
    var ninePatch = NinePatchResize.ninePatch.checkboxNinePatch;
    
    // Initialize Export DPI
    var mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi;
    for(var i = 0; i < dpis.length; i ++) {
        makeCheckBox(dpis[i]);
    }
    function makeCheckBox(dpi) {
        eval('NinePatchResize.exportDPI.dpis.' + dpi + ' = NinePatchResize.exportDPI.dpis.add("Checkbox", undefined, "' + dpi + '")');
        eval('NinePatchResize.exportDPI.dpis.' + dpi + '.value = true');
        eval(dpi + ' = NinePatchResize.exportDPI.dpis.' + dpi);
    }
    
    // Button event.
    NinePatchResize.buttons.runBtn.onClick = function() {
        
        // Create Folders
        if(!Folder(path.text).exists)
            Folder(path.text).create();

        if(mdpi.value) {
            if(!Folder(path.text + '/drawable-mdpi').exists) {
                Folder(path.text + '/drawable-mdpi').create();
            }
            exportAssets('mdpi');
        }
        if(hdpi.value) {
            if(!Folder(path.text + '/drawable-hdpi').exists) {
                Folder(path.text + '/drawable-hdpi').create();
            }
            exportAssets('hdpi');
        }
        if(xhdpi.value) {
            if(!Folder(path.text + '/drawable-xhdpi').exists) {
                Folder(path.text + '/drawable-xhdpi').create();
            }
            exportAssets('xhdpi');
        }
        if(xxhdpi.value) {
            if(!Folder(path.text + '/drawable-xxhdpi').exists) {
                Folder(path.text + '/drawable-xxhdpi').create();
            }
            exportAssets('xxhdpi');
        }
        if(xxxhdpi.value) {
            if(!Folder(path.text + '/drawable-xxxhdpi').exists) {
                Folder(path.text + '/drawable-xxxhdpi').create();
            }
            exportAssets('xxxhdpi');
        }
    
        $.writeln('Completed!');
        
        NinePatchResize.close();
    }
    
    NinePatchResize.show();
    
    function density(dpiKeyword) {
        switch(dpiKeyword.toLowerCase()) {
            case 'ldpi':
                return 120;
            case 'mdpi':
                return 160;
            case 'hdpi':
                return 240;
            case 'xhdpi':
                return 320;
            case 'xxhdpi':
                return 480;
            case 'xxxhdpi':
                return 640;
            default:
                return 160;
        }
    }

    function normalResize(scale) {
        $.writeln('Scale: x' +  scale);
        resize(scale);
    }
    
    function ninePatchResize(scale) {
        $.writeln('Scale: x' +  scale);
        activeDocument.resizeCanvas(activeDocument.width.as('px') - 2, activeDocument.height.as('px') - 2, AnchorPosition.MIDDLECENTER);
        resize(scale, 'Nrst');
        activeDocument.resizeCanvas(activeDocument.width.as('px') + 2, activeDocument.height.as('px') + 2, AnchorPosition.MIDDLECENTER);
    }

    // Blnr, Nrst, Bcbc, bicubicSmoother, bicubicSharper, automaticInterpolation, 
    function resize(scale, resampleCharID) {
        if(resampleCharID == undefined) {
            resampleCharID = 'Blnr';
        }

        var desc1 = new ActionDescriptor();
            desc1.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), scale * 100);
            desc1.putBoolean(stringIDToTypeID("scaleStyles"), true);
            desc1.putBoolean(charIDToTypeID('CnsP'), true);
            desc1.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), charIDToTypeID(resampleCharID));
        executeAction(stringIDToTypeID('imageSize'), desc1, DialogModes.NO);
    }

    function exportPNG(targetFile) {
        $.writeln('Export PNG to:' +  targetFile);
        // PNG-24 Settings
        var png24Options = new ExportOptionsSaveForWeb();
            png24Options.format = SaveDocumentType.PNG;
            png24Options.PNG8 = false;
            png24Options.transparency = true;
            png24Options.interlaced = false;
            png24Options.includeProfile = false;
        activeDocument.exportDocument(targetFile, ExportType.SAVEFORWEB, png24Options);  
    }

    function exportAssets(dpiKeyword) {
        try{
            activeDocument.activeHistoryState = activeDocument.historyStates.getByName ('_________');
        } catch(e) {
            activeDocument.suspendHistory('_________', '');
        }
        
        if(ninePatch.value) {
            ninePatchResize(density(dpiKeyword)/density(docDPI));
            var targetFile = File(path.text + '/drawable-' + dpiKeyword + '/' + fileName.text + '.9.png');
            exportPNG(targetFile);
        } else {
            normalResize(density(dpiKeyword)/density(docDPI));
            var targetFile = File(path.text + '/drawable-' + dpiKeyword + '/' + fileName.text + '.png');
            exportPNG(targetFile);
        }
        
        activeDocument.activeHistoryState = activeDocument.historyStates.getByName ('_________');
    }

})();
