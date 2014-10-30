/*
 * Copyright (c) 2014 Ashung Hung
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
 * Android Assets Export
 * 
 * Automation resize psd file and exprot PNG for different dpi.
 *
 * Version: 20140729
 * Author: Ashung Hung (Ashung.hung@gmail.com)
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
            labelFiles: StaticText { text: 'Export assets to (/d/folder1/folder2):' },\
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
            nodpi: Checkbox {\
                value: false,\
                text: 'nodpi'\
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
   
    var AAE = new Window(ui);
    
    var docDPIList = AAE.docDPI.docDPIList;
    var docDPI;
    var path = AAE.exportPath.pathFormItem.pathText;
    var browser = AAE.exportPath.pathFormItem.pathBrowser;
    var fileName = AAE.exportFileName.fileNameText;
    var dpis = ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'];
    
    var firstTimeRun = true;
    var d = new Date();
    var timeStamp = d.getTime();
    
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
        if(/\/drawable-(nodpi|ldpi|mdpi|hdpi|xhdpi|xxhdpi|xxxhdpi)/i.test(String(activeDocument.path))) {
            path.text = String(activeDocument.path).replace(/\/drawable-(nodpi|ldpi|mdpi|hdpi|xhdpi|xxhdpi|xxxhdpi)/i, '');
        } else {
            path.text = activeDocument.path + '/res';
        }
    } catch(e) {
        path.text = Folder.desktop.fullName + '/res';
    }
    
    browser.onClick = function() {
        var f = Folder(path.text).selectDlg('Select the folder you wannt to export:');
        if(f != null)
            path.text = f.fullName;
    }

    // Initialize File Name
    fileName.text = activeDocument.activeLayer.name.replace(/.(9.png|png|jpg|gif)$/i, '');
    
    // Java variable name rule.
    fileName.text = fileName.text.replace(/(\.|\ |\+|\-)/g, '_').replace(/([0-9]|_)*/, '').toLowerCase();
    
    // For images files
    if(/.(9.png|png|jpg|gif)$/i.test(activeDocument.name)) {
        fileName.text = activeDocument.name.replace(/.(9.png|png|jpg|gif)$/i, '');
    }

    // NinePatch
    var ninePatch = AAE.ninePatch.checkboxNinePatch;
    if(/.(9.png)$/i.test(activeDocument.name)) {
        ninePatch.value = true;
    }
    
    // Initialize Export DPI
    var mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi;
    var nodpi = AAE.exportDPI.nodpi;
    for(var i = 0; i < dpis.length; i ++) {
        makeCheckBox(dpis[i]);
    }
    function makeCheckBox(dpi) {
        eval('AAE.exportDPI.dpis.' + dpi + ' = AAE.exportDPI.dpis.add("Checkbox", undefined, "' + dpi + '")');
        eval('AAE.exportDPI.dpis.' + dpi + '.value = true');
        eval(dpi + ' = AAE.exportDPI.dpis.' + dpi);
    }
    
    // Button event.
    AAE.buttons.runBtn.onClick = function() {
        
        this.enabled = false;
        
        if(nodpi.value) {
            exportAssets('nodpi');
        }

        if(mdpi.value) {
            exportAssets('mdpi');
        }
        if(hdpi.value) {
            exportAssets('hdpi');
        }
        if(xhdpi.value) {
            exportAssets('xhdpi');
        }
        if(xxhdpi.value) {
            exportAssets('xxhdpi');
        }
        if(xxxhdpi.value) {
            exportAssets('xxxhdpi');
        }
    
        $.writeln('Completed!');
        
        AAE.close();
    }
    
    AAE.show();
    
    function density(dpiKeyword) {
        switch(dpiKeyword.toLowerCase()) {
            case 'nodpi':
                return density(docDPI);
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
        $.writeln('x' +  scale);
        resize(scale);
    }
    
    function ninePatchResize(scale) {
        $.writeln('x' +  scale);
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
        // Create Folder
        if(!Folder(targetFile.parent).exists) {
            Folder(targetFile.parent).create();
        }
    
        // File readonly
        if(targetFile.exists && targetFile.readonly == true) {
            targetFile.readonly = false;
        }
        
        // PNG-24 Settings
        var png24Options = new ExportOptionsSaveForWeb();
            png24Options.format = SaveDocumentType.PNG;
            png24Options.PNG8 = false;
            png24Options.transparency = true;
            png24Options.interlaced = false;
            png24Options.includeProfile = false;
        activeDocument.exportDocument(targetFile, ExportType.SAVEFORWEB, png24Options);
        
        $.writeln('--> ' +  targetFile.fsName);
    }

    function exportAssets(dpiKeyword) {
        if(firstTimeRun) {
            activeDocument.suspendHistory('__' + docDPI + '__' + timeStamp, '');
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
        
        firstTimeRun = false;
        activeDocument.activeHistoryState = activeDocument.historyStates.getByName ('__' + docDPI + '__' + timeStamp);
    }

})();
