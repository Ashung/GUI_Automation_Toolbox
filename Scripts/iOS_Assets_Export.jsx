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
 * iOS Assets Export
 * 
 * Automation resize psd file and exprot PNG/PDF for different size.
 *
 * Create: 20141118
 * LastModify: 20141118
 * Author: Ashung Hung (Ashung.hung@gmail.com)
 *
 */

(function(){
    'use strict'

    if(documents.length == 0) { return; }  

    var ui = 
    "dialog {\
        text: 'iOS Asset Export',\
        alignChildren: 'fill',\
        docSize: Group {\
            orientation: 'column',\
            alignChildren: 'left', \
            labelFiles: StaticText { text: 'Document size:' },\
            docSizeList: DropDownList {\
                size: [400, 25] \
            }\
        },\
        exportPath: Group {\
            orientation: 'column',\
            alignChildren: 'left', \
            labelFiles: StaticText { text: 'Export assets to:' },\
            pathFormItem: Group {\
                orientation: 'row',\
                pathText: EditText {\
                    size: [310, 25] \
                },\
                pathBrowser: Button { \
                    text: 'Browser...', \
                    size: [80, 25] \
                }\
            }\
        },\
        assetSettings: Group {\
            orientation: 'row',\
            assetName: Group {\
                orientation: 'column',\
                alignChildren: 'left', \
                labelFiles: StaticText { text: 'Asset name:' },\
                fileNameText: EditText {\
                    size: [240, 25] \
                }\
            },\
            deviceSuffix: Group {\
                orientation: 'column',\
                alignChildren: 'left', \
                labelFiles: StaticText { text: 'Device Suffix:' },\
                suffixList: DropDownList {\
                    size: [80, 25] \
                }\
            }\
            assetType: Group {\
                orientation: 'column',\
                alignChildren: 'left', \
                labelFiles: StaticText { text: 'Asset type:' },\
                typeList: DropDownList {\
                    size: [60, 25] \
                }\
            }\
        }, \
        exportSize: Group {\
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
            runBtn: Button {\
                alignment: ['right', 'center'], \
                text: 'OK'\
            }\
        }\
    }";
   
    var IAE = new Window(ui);
    
    var docSizes = [
        { 'ratio': 1, 'suffix': '',    'shortText': 'Normal', 'text': 'Normal (320x480)' },
        { 'ratio': 2, 'suffix': '@2x', 'shortText': '@2x',    'text': '@2x (640x960/640x1136)' },
        { 'ratio': 3, 'suffix': '@3x', 'shortText': '@3x',    'text': '@3x ()' },
    ];
    
    // Initialize docSize DropDownList
    var currentDocRatio = 1;
    var docSizeList = IAE.docSize.docSizeList;
    for(var i = 0; i < docSizes.length; i ++) {
        docSizeList.add('item', docSizes[i].text);
        if(docSizes[i].ratio == currentDocRatio) {
            docSizeList.selection = docSizeList.items[i];
        }
    }
    docSizeList.onChange = function() {
        currentDocRatio = docSizes[docSizeList.selection.index].ratio;
    }

    // Devices Suffix
    var currentDeviceSuffix = '';
    var deviceSuffix = ['', '~ipad', '~iphone', '~mac'];
    var suffixList = IAE.assetSettings.deviceSuffix.suffixList;
    for(var i = 0; i < deviceSuffix.length; i ++) {
        suffixList.add('item', deviceSuffix[i]);
        if(deviceSuffix[i] == currentDeviceSuffix) {
            suffixList.selection = suffixList.items[i];
        }
    }
    suffixList.onChange = function() {
        currentDeviceSuffix = suffixList[suffixList.selection.index];
    }
    
    // Asset Type
    var currentAssetType = '.png';
    var assetTypes = ['.png', '.pdf'];
    var typeList = IAE.assetSettings.assetType.typeList;
    for(var i = 0; i < assetTypes.length; i ++) {
        typeList.add('item', assetTypes[i]);
        if(assetTypes[i] == currentAssetType) {
            typeList.selection = typeList.items[i];
        }
    }
    typeList.onChange = function() {
        currentAssetType = typeList[typeList.selection.index];
    }





// Default dpi config.
    

// icon~ipad@2x.png




    IAE.show();
    
    
    
    
    
 /*   
    var docDPIList = AAE.docSize.docDPIList;
    var docDPI;
    var path = AAE.exportPath.pathFormItem.pathText;
    var browser = AAE.exportPath.pathFormItem.pathBrowser;
    var fileName = AAE.assetName.fileNameText;
    var dpis = ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'];
    
    var firstTimeRun = true;
    var d = new Date();
    var timeStamp = d.getTime();
    
    // Initialize docDPI DropDownList
    for(var i = 0; i < dpis.length; i ++) {
        docSizeList.add('item', dpis[i]);
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
    fileName.text = fileName.text.replace(/(\.|\ |\+|\-)/g, '_').replace(/([0-9]|_), '').toLowerCase();

    // For images files
    var isImageFile = false;
    if(/.(9.png|png|jpg|gif)$/i.test(activeDocument.name)) {
        fileName.text = activeDocument.name.replace(/.(9.png|png|jpg|gif)$/i, '');
        isImageFile = true;
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
    
        //$.writeln('Completed!');
        
        AAE.close();
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
            if(isImageFile) {
                resize(density(dpiKeyword)/density(docDPI), 'Bcbc');
            } else {
                resize(density(dpiKeyword)/density(docDPI));
            }
            
            var targetFile = File(path.text + '/drawable-' + dpiKeyword + '/' + fileName.text + '.png');
            exportPNG(targetFile);
        }
        
        firstTimeRun = false;
        activeDocument.activeHistoryState = activeDocument.historyStates.getByName ('__' + docDPI + '__' + timeStamp);
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
    
    function ninePatchResize(scale) {
        //$.writeln('x' +  scale);
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
        
        //$.writeln('--> ' +  targetFile.fsName);
    }
*/
})();
