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
 * Android Export Layers to PNG
 * 
 * Export layers to multi-dpi png.
 *
 * Version: 20140904
 * Author: Ashung Hung (Ashung.hung@gmail.com)
 *
 */






(function(){
    'use strict'
    
    var dlg = 
    "dialog {\
        text: 'Export Layers for Android',\
        alignChildren: 'fill',\
        exportType: Group {\
            orientation: 'column',\
            alignChildren: 'left', \
            labelExport: StaticText { text: 'Layers:' },\
            radioGroup: Group {\
                orientation: 'row',\
                allLayers: RadioButton { \
                    value: true, \
                    text: 'All Layers' \
                },\
                childLayers: RadioButton { \
                    text: 'Child Layers in Selected LayerSet' \
                },\
            }\
        },\
        imageName: Group { \
            orientation: 'column',\
            alignChildren: 'left', \
            labelImageName: StaticText { text: 'Image Name:' },\
            namesDPIList: DropDownList {\
                size: [300, 25] \
            }\
        }, \
        imageNamePrefix: Group { \
            orientation: 'column',\
            alignChildren: 'left', \
            labelPrefix: StaticText { text: 'Image Name Prefix:' },\
            prefixText: EditText {\
                size: [300, 25] \
            }\
        }, \
        outputFolder: Group {\
            orientation: 'column',\
            alignChildren: 'left', \
            labeloutput: StaticText { text: 'Output Folder:' },\
            outputForm: Group {\
                orientation: 'row',\
                outputText: EditText {\
                    size: [210, 25] \
                },\
                outputBrowser: Button { \
                    text: 'Browser...', \
                    size: [80, 25] \
                }\
            }\
        },\
        docDPI: Group {\
            orientation: 'column',\
            alignChildren: 'left', \
            labelDocDPI: StaticText { text: 'Document DPI:' },\
            docDPIList: DropDownList {\
                size: [300, 25] \
            }\
        },\
        exportDPI: Group {\
            orientation: 'column',\
            alignChildren: 'left', \
            labelExport: StaticText { text: 'Export DPIs:'},\
            dpis: Group {\
                orientation: 'row' \
            }\
        },\
        separator: Panel { preferredSize: [300, 0] },\
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
    
    var AEL = new Window(dlg);
    
    if(documents.length == 0) {
        return;
    }
    
    // Export all layer.
    var exportAllLayer = AEL.exportType.radioGroup.allLayers;
    
    // Initialize Image Name DropDownList.
    var imageNames = AEL.imageName.namesDPIList;
    var prefix = AEL.imageNamePrefix.prefixText;
        prefix.enabled = false;
        
        imageNames.add('item', 'layer_name.png');
        imageNames.add('item', '[Prefix]_layer_name.png');
        imageNames.add('item', 'layer_name_[Prefix].png');
        imageNames.add('item', '[Prefix]_[1,2,3...].png');
        imageNames.add('item', '[Prefix]_[01,02,03...].png');
        imageNames.add('item', '[Prefix]_[001,002,003...].png');

        imageNames.selection = imageNames.items[0];
        
        imageNames.onChange = function() {
            if(imageNames.selection.index == 0) {
                prefix.enabled = false;
            } else {
                prefix.enabled = true;
            }
        }
        
    // Initialize Path.
    var outputFolder = AEL.outputFolder.outputForm.outputText;
    var outputBrowser = AEL.outputFolder.outputForm.outputBrowser;
    
    try {
        if(/\/drawable-(nodpi|ldpi|mdpi|hdpi|xhdpi|xxhdpi|xxxhdpi)/i.test(String(activeDocument.path))) {
            outputFolder.text = String(activeDocument.path).replace(/\/drawable-(nodpi|ldpi|mdpi|hdpi|xhdpi|xxhdpi|xxxhdpi)/i, '');
        } else {
            outputFolder.text = activeDocument.path + '/res';
        }
    } catch(e) {
        outputFolder.text = Folder.desktop.fullName + '/res';
    }
    
    outputBrowser.onClick = function() {
        var f = Folder(outputFolder.text).selectDlg('Select folder:');
        if(f != null)
            outputFolder.text = f.fullName;
    } 

    // Initialize docDPI DropDownList.
    var docDPIList = AEL.docDPI.docDPIList;
    var docDPI;
    var dpis = ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'];
    
    for(var i = 0; i < dpis.length; i ++) {
        docDPIList.add('item', dpis[i]);
    }
    docDPIList.selection = docDPIList.items[0];
    docDPI = docDPIList.selection.text;
    docDPIList.onChange = function() {
        docDPI = docDPIList.selection.text;
    }

    // Initialize Export DPI.
    for(var i = 0; i < dpis.length; i ++) {
        eval('AEL.exportDPI.dpis.' + dpis[i] + ' = AEL.exportDPI.dpis.add("Checkbox", undefined, "' + dpis[i] + '")');
        eval('AEL.exportDPI.dpis.' + dpis[i] + '.value = true');
    }

    // Button event.
    AEL.buttons.runBtn.onClick = function() {
        
        this.enabled = false;
        
        var rootLayer = activeDocument;
        if(exportAllLayer.value == false) {
            rootLayer = activeDocument.activeLayer;
        }
        
        // exportDPIs
        var exportDPIs = [];
        for(var i = 0; i < dpis.length; i ++) {
            eval('if(AEL.exportDPI.dpis.' + dpis[i] + '.value == true){exportDPIs.push("' + dpis[i] + '")};');
        }
        
        for(var i = 0; i < exportDPIs.length; i ++) {

            var targetDPI = exportDPIs[i];
            var outputImageParent = outputFolder.text + '/drawable-' + targetDPI + '/';
            
            var d = new Date();
            var timeStamp = d.getTime();
            
            activeDocument.suspendHistory('History_' + timeStamp, '');
            
            resize(density(targetDPI)/density(docDPI));
            
            // Hide layers
            for(var j = 0; j < rootLayer.layers.length; j ++) {
                rootLayer.layers[j].visible = false;
            }
            
            // Export layers
            for(var j = 0; j < rootLayer.layers.length; j ++) {
                // layer_name.png
                var outputImageName = rootLayer.layers[j].name.toLowerCase().replace(/ /g, '_').replace(/.(jpg|jpeg|gif|png)$/i, '') + '.png';
                // [Prefix]_layer_name.png
                if(imageNames.selection.index == 1) {
                    outputImageName = prefix.text + '_' + outputImageName;
                }
                // layer_name_[Prefix].png
                if(imageNames.selection.index == 2) {
                    outputImageName = rootLayer.layers[j].name.toLowerCase().replace(/ /g, '_').replace(/.(jpg|jpeg|gif|png)$/i, '') + '_' + prefix.text + '.png';
                }
                // [Prefix]_[1,2,3...].png
                if(imageNames.selection.index == 3) {
                    outputImageName = prefix.text + '_' + formatNumber(j+1, 1) + '.png';
                }
                // [Prefix]_[01,02,03...].png
                if(imageNames.selection.index == 4) {
                    outputImageName = prefix.text + '_' + formatNumber(j+1, 2) + '.png';
                }
                // [Prefix]_[01,02,03...].png
                if(imageNames.selection.index == 5) {
                    outputImageName = prefix.text + '_' + formatNumber(j+1, 3) + '.png';
                }
            
                if(j > 0) {
                    rootLayer.layers[j-1].visible = false;
                }
                rootLayer.layers[j].visible = true;
                
                exportPng(outputImageParent + outputImageName);
                
                $.writeln('x' + density(targetDPI)/density(docDPI) + ' -----> ' + outputImageParent + outputImageName);
            }
        
            activeDocument.activeHistoryState = activeDocument.historyStates.getByName('History_' + timeStamp);
        }

        $.writeln('Completed!');
        
        AEL.close();
    }
    
    AEL.show();

    /*
     * @param String dpiKeyword [nodpi|ldpi|mdpi|hdpi|tvdpi|xhdpi|xxhdpi|xxxhdpi]
     */
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

    /*
     * @param Float scale
     */
    function resize(scale) {
        var desc1 = new ActionDescriptor();
            desc1.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), scale * 100);
            desc1.putBoolean(stringIDToTypeID("scaleStyles"), true);
            desc1.putBoolean(charIDToTypeID('CnsP'), true);
            desc1.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), charIDToTypeID('Blnr'));
        executeAction(stringIDToTypeID('imageSize'), desc1, DialogModes.NO);
    }

    /*
     * @param String path
     */
    function exportPng(path) {
        if(!File(path).parent.exists) {
            File(path).parent.create();
        }
        var png24Options = new ExportOptionsSaveForWeb();
            png24Options.format = SaveDocumentType.PNG;
            png24Options.PNG8 = false;
            png24Options.transparency = true;
            png24Options.interlaced = false;
            png24Options.includeProfile = false;
        activeDocument.exportDocument(File(path), ExportType.SAVEFORWEB, png24Options);
    }

    /*
     * @param Number number
     * @param Number length > 0
     */
    function formatNumber(number, length) {
        while(String(number).length < length) {
            number = '0' + number;
            formatNumber(number, length);
        }
        return number;
    }

})();