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
 ******************************************************************************
 *  Export Android Theme Icons
 *  
 *  Author: Ashung Hung (Ashung.hung@gmail.com)
 ******************************************************************************
 */





(function(){
    'use strict'
    
    if(documents.length == 0)
        return;
    
    var exportConfig = {
            exportDir: Folder.desktop.fullName + '/' + activeDocument.name.replace(/\.(psd|psb|pdd|png|jpg|gif|tiff)$/i, '') + '-assets/res',
            hideLayers: ['@hide', '=', '=='],
            boundsLayer: ['#', '@bounds'],
            docDPI: 'mdpi',
            exportDPI: {
                mdpi : true,
                hdpi : true, 
                xhdpi : true,
                xxhdpi : true,
                xxxhdpi : true
            }
        };
    
    var dpis = ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'];

    var ui = 
    "dialog {\
        text: 'Android Asset Export Pro',\
        alignChildren: 'fill',\
        help: StaticText { text: '?????' },\
        separator1: Panel { preferredSize: [300, 0] },\
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
    
    
    
    var AAE = new Window(ui);
    
    // Initialize docDPI DropDownList
    var docDPIList = AAE.docDPI.docDPIList;
    for(var i = 0; i < dpis.length; i ++) {
        docDPIList.add('item', dpis[i]);
        if(dpis[i] == exportConfig.docDPI) {
            docDPIList.selection = docDPIList.items[i];
            exportConfig.docDPI = docDPIList.selection.text;
        }
    }
    docDPIList.onChange = function() {
        exportConfig.docDPI = docDPIList.selection.text;
    }
    
    // Initialize Path
    var pathText = AAE.exportPath.pathFormItem.pathText;
        pathText.text = exportConfig.exportDir;
    try {
        pathText.text = activeDocument.path + '/res';
        exportConfig.exportDir = pathText.text;
    } catch(e) {}
    
    // Initialize Export DPI
    for(var i = 0; i < dpis.length; i ++) {
        eval('AAE.exportDPI.dpis.' + dpis[i] + ' = AAE.exportDPI.dpis.add("Checkbox", undefined, "' + dpis[i] + '")');
        eval('AAE.exportDPI.dpis.' + dpis[i] + '.value = true');
        eval('exportConfig.exportDPI.' + dpis[i] + ' = AAE.exportDPI.dpis.' + dpis[i]);
    }

    AAE.show();
    

    /*
    traversal(activeDocument, function(){

        if(/\.(png)$/i.test(activeDocument.activeLayer.name)) {
            activeDocument.activeLayer.visible = true;
            
            var icons = activeDocument.activeLayer.name.replace(/ /g, '').split(',');
    
            // Copy
            makeNewCopy();
            
            // Crop
            traversal(activeDocument, function() {
                if(activeDocument.activeLayer.name == '@hide') {
                    activeDocument.activeLayer.visible = false;
                }
            
                // Mask
                if(activeDocument.activeLayer.name == '=') {
                    if(exportConfig.exportFullView == true) {
                        activeDocument.activeLayer.visible = false;
                    } else {
                        activeDocument.activeLayer.visible = true;
                    }
                }

                if(activeDocument.activeLayer.name == '#') {
                    selectAlphaChannel();
                    activeDocument.activeLayer.visible = false;
                    activeDocument.crop(activeDocument.selection.bounds);
                }
            });
            
            // History!
            activeDocument.suspendHistory('__', '');
            
            // ExportThemeIcon -> exportAsset(fromDPI, toDPI, files)
            if(exportConfig.exportDPI.mdpi) {
                exportAsset(exportConfig.docDPI, 'mdpi', changeArrayItems(icons, exportConfig.exportDir + 'drawable-mdpi/'));
                activeDocument.activeHistoryState = activeDocument.historyStates.getByName ('__');
            }
            if(exportConfig.exportDPI.hdpi) {
                exportAsset(exportConfig.docDPI, 'hdpi', changeArrayItems(icons, exportConfig.exportDir + 'drawable-hdpi/'));
                activeDocument.activeHistoryState = activeDocument.historyStates.getByName ('__');
            }
            if(exportConfig.exportDPI.xhdpi) {
                exportAsset(exportConfig.docDPI, 'xhdpi', changeArrayItems(icons, exportConfig.exportDir + 'drawable-xhdpi/'));
                activeDocument.activeHistoryState = activeDocument.historyStates.getByName ('__');
            }
            if(exportConfig.exportDPI.xxhdpi) {
                exportAsset(exportConfig.docDPI, 'xxhdpi', changeArrayItems(icons, exportConfig.exportDir + 'drawable-xxhdpi/'));
                activeDocument.activeHistoryState = activeDocument.historyStates.getByName ('__');
            }
            if(exportConfig.exportDPI.xxxhdpi) {
                exportAsset(exportConfig.docDPI, 'xxxhdpi', changeArrayItems(icons, exportConfig.exportDir + 'drawable-xxxhdpi/'));
                activeDocument.activeHistoryState = activeDocument.historyStates.getByName ('__');
            }
       
            // Close document
            activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            $.writeln('____________________________________________________');
        }

    });


*/

    function traversal(doc, fn) {

       //select just this layer
       function _selectLayerById(ID) {
          var ref = new ActionReference();
          ref.putIdentifier(charIDToTypeID('Lyr '), ID);
          var desc = new ActionDescriptor();
          desc.putReference(charIDToTypeID('null'), ref);
          desc.putBoolean(charIDToTypeID('MkVs'), false);
          executeAction(charIDToTypeID('slct'), desc, DialogModes.NO);
        }

        //how many layers are there in this document?
        var ref = new ActionReference();
            ref.putEnumerated(charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        var count = executeActionGet(ref).getInteger(charIDToTypeID('NmbL'));

        //traverse the list backwards (does parents first)
        for (var i = count; i >= 1; i--) {
            var ref = new ActionReference();
                ref.putIndex(charIDToTypeID('Lyr '), i);
            var desc = executeActionGet(ref);   //access layer index #i
            var layerID = desc.getInteger(stringIDToTypeID('layerID'));   //ID for selecting by ID #
            var layerSection = typeIDToStringID(desc.getEnumerationValue(stringIDToTypeID('layerSection')));
            if (layerSection != 'layerSectionEnd') {
                //do this layer
                _selectLayerById(layerID);
                fn(doc, app.activeDocument.activeLayer);    //apply function to this layer
            }
        }
    }


    function makeNewCopy() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putClass(charIDToTypeID('Dcmn'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        var ref2 = new ActionReference();
        ref2.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('Usng'), ref2);
        desc1.putInteger(charIDToTypeID('Vrsn'), 5);
        executeAction(charIDToTypeID('Mk  '), desc1, DialogModes.NO);
    }

    function getGlobalLightAngle() {
        var ref = new ActionReference();
            ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        var angle = executeActionGet(ref).getInteger(stringIDToTypeID('globalAngle'));
        return angle;    
    }

    function getGlobalLightAltitude() {
        var ref = new ActionReference();
            ref.putEnumerated(charIDToTypeID("capp"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        var altitude = executeActionGet(ref).getObjectValue(stringIDToTypeID('globalAngle')).getUnitDoubleValue(stringIDToTypeID('globalAltitude'));
        return altitude;
    }

    // Set document's layer effects global angle (global light: lighting angle and altitude)
    function setDocumentGlobalAngle(globalLightingAngle, globalAltitude) {
        var desc1 = new ActionDescriptor ();
        var ref = new ActionReference ();
        ref.putProperty(stringIDToTypeID ("property"), stringIDToTypeID ("globalAngle"));
        ref.putEnumerated(stringIDToTypeID ("document"), stringIDToTypeID ("ordinal"), stringIDToTypeID ("targetEnum"));
        desc1.putReference(stringIDToTypeID ("target"), ref);
        var desc2 = new ActionDescriptor ();
        desc2.putUnitDouble(stringIDToTypeID ("globalLightingAngle"), stringIDToTypeID ("angleUnit"), globalLightingAngle);
        if (typeof globalAltitude !== 'undefined') {
           desc2.putUnitDouble(stringIDToTypeID ("globalAltitude"), stringIDToTypeID ("angleUnit"), globalAltitude);
        }
        desc1.putObject(stringIDToTypeID ("to"), stringIDToTypeID ("globalAngle"), desc2);
        executeAction(stringIDToTypeID ("set"), desc1, DialogModes.NO);
    }

    // Select alpha channel (hold down "cmd/ctrl" and click layer thumb) 
    function selectAlphaChannel() {
        
        // bitmap layer
        /*
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
            ref1.putProperty(charIDToTypeID('Chnl'), stringIDToTypeID("selection"));
            desc1.putReference(charIDToTypeID('null'), ref1);
        var ref2 = new ActionReference();
            ref2.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Trsp'));
            desc1.putReference(charIDToTypeID('T   '), ref2);
        executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);*/

        // shape layer
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
            ref1.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));
            desc1.putReference(charIDToTypeID("null"), ref1);
        var ref2 = new ActionReference();
            ref2.putEnumerated( charIDToTypeID("Path"), charIDToTypeID("Path"), stringIDToTypeID("vectorMask"));
            desc1.putReference(charIDToTypeID("T   "), ref2 );
        executeAction(charIDToTypeID("setd"), desc1, DialogModes.NO );



    }

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

    // Blnr, Nrst, Bcbc, bicubicSmoother, bicubicSharper, automaticInterpolation, 
    function resize(scale, resampleCharID) {
        if(resampleCharID == undefined) {
            resampleCharID = 'Blnr';
        }

        var desc1 = new ActionDescriptor();
            if(typeof(scale) == 'number') {
                desc1.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), scale * 100);
                desc1.putUnitDouble(charIDToTypeID('Hght'), charIDToTypeID('#Prc'), scale * 100);
            }
            if(scale instanceof UnitValue) {
                desc1.putUnitDouble(charIDToTypeID("Wdth"), charIDToTypeID("#Pxl"), scale.as('px'));
                desc1.putUnitDouble(charIDToTypeID("Hght"), charIDToTypeID("#Pxl"), scale.as('px'));
            }
            desc1.putBoolean(stringIDToTypeID("scaleStyles"), true);
            desc1.putBoolean(charIDToTypeID('CnsP'), true);
            desc1.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), charIDToTypeID(resampleCharID));
        executeAction(stringIDToTypeID('imageSize'), desc1, DialogModes.NO);
    }

    function exportPNG(targetPath) {
        var targetFile = File(targetPath);
        
        if(!targetFile.parent.exists)
            targetFile.parent.create();
        
        // PNG-24 Settings
        var png24Options = new ExportOptionsSaveForWeb();
            png24Options.format = SaveDocumentType.PNG;
            png24Options.PNG8 = false;
            png24Options.transparency = true;
            png24Options.interlaced = false;
            png24Options.includeProfile = false;
        activeDocument.exportDocument(targetFile, ExportType.SAVEFORWEB, png24Options);
        
        $.writeln('---> ' + targetFile.fullName);
    }

    function exportAsset(fromDPI, toDPI, files) {
        resize(density(toDPI)/density(fromDPI), 'Blnr');
        for(var i = 0; i < files.length; i++ ) {
            var nf = File(files[i]).parent + '/' + File(files[i]).name.replace(/.(png)$/i, '').replace(/\./g, '_').toLowerCase() + '.png';
            exportPNG(nf);
        }
    }

    function changeArrayItems(arr, str){
        var t = [];
        for(var i = 0; i < arr.length; i++ ) {
            t[i] = str + arr[i];
        }
        return t;
    }

})();
