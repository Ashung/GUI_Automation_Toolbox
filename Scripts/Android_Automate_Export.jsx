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
 * Android Automate Export
 * 
 *
 * Created: 20140815
 * Version: 20140926
 * Author: Ashung Hung (Ashung.hung@gmail.com)
 *
 */





(function(){
    'use strict'
    
    /*
    
    layername with .png/.9.png/.jpg
    bounds layer #
    
    Export to: ___ [Browser]
    Doc DPI: 
    Export DPIs: 
    
    automateExport(dir, docDPI, exportDPIs);
        
        */
    
    

    var start = new Date().getTime();   
    

    
    //non-recursive action manager traversal function
    function traverseLayersAMFlat(doc, ftn) {
       
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
                 
                ftn(doc, app.activeDocument.activeLayer);    //apply function to this layer

            }//for i-- countdown
        }
    }

    
var iconName;  



    try {
        var exportDir = activeDocument.path + '/' + activeDocument.name + '-assets/res';
    } catch(e) {
        var exportDir = Folder.desktop.fullName + '/' + activeDocument.name + '-assets/res';
    }




var docDPI = 'xhdpi';
var nodpi = false;
var mdpi = hdpi = xhdpi = xxhdpi = xxxhdpi = true;    

//traverseLayersAMFlat

traverseLayersAMFlat(activeDocument, function(){
    
    
        
    if(/\.(png|jpg|gif)$/i.test(activeDocument.activeLayer.name)) {
        //$.writeln(activeDocument.activeLayer.name);
        
        iconName = activeDocument.activeLayer.name;
        
        $.writeln(iconName)
        
        // Get global light
        var globalLightAngle = getGlobalLightAngle();
        var globalLightAltitude = getGlobalLightAltitude();
        
        // copy
        makeNewCopy();
        
        // Set document gobal light
        setDocumentGlobalAngle(globalLightAngle, globalLightAltitude);
        
        // 
        traverseLayersAMFlat(activeDocument, function() {
            
            // Change Fill Color
            //changeSolidColor(0, 0, 0);
            
            if(activeDocument.activeLayer.name == '=') {
                activeDocument.activeLayer.visible = false;
            }
            
            // Hide shadow layer
            if(activeDocument.activeLayer.name == 'shadow') {
                activeDocument.activeLayer.visible = false;
            }
            // Crop
            if(activeDocument.activeLayer.name == '#') {
                selectAlphaChannel();
                activeDocument.activeLayer.visible = false;
                activeDocument.crop(activeDocument.selection.bounds);
            }
        });
        /**/
        
        
        
        
        
        
        // Export PNGs
        
        
        activeDocument.suspendHistory('__', '');
        
        /**/
        
        
        // Create Folders
        if(!Folder(exportDir).exists) {
            Folder(exportDir).create();
        }
    
        
        if(nodpi) {
            if(!Folder(exportDir + '/drawable-nodpi').exists) {
                Folder(exportDir + '/drawable-nodpi').create();
            }
            exportAssets('nodpi');
            //activeDocument.activeHistoryState = activeDocument.historyStates.getByName ('__');
        }

        if(mdpi) {
            if(!Folder(exportDir + '/drawable-mdpi').exists) {
                Folder(exportDir + '/drawable-mdpi').create();
            }
            exportAssets('mdpi');
            //activeDocument.activeHistoryState = activeDocument.historyStates.getByName ('__');
        }
        if(hdpi) {
            if(!Folder(exportDir + '/drawable-hdpi').exists) {
                Folder(exportDir + '/drawable-hdpi').create();
            }
            exportAssets('hdpi');
            //activeDocument.activeHistoryState = activeDocument.historyStates.getByName ('__');
        }
        if(xhdpi) {
            if(!Folder(exportDir + '/drawable-xhdpi').exists) {
                Folder(exportDir + '/drawable-xhdpi').create();
            }
            exportAssets('xhdpi');
            //activeDocument.activeHistoryState = activeDocument.historyStates.getByName ('__');
        }
        if(xxhdpi) {
            if(!Folder(exportDir + '/drawable-xxhdpi').exists) {
                Folder(exportDir + '/drawable-xxhdpi').create();
            }
            exportAssets('xxhdpi');
            //activeDocument.activeHistoryState = activeDocument.historyStates.getByName ('__');
        }
        if(xxxhdpi) {
            if(!Folder(exportDir + '/drawable-xxxhdpi').exists) {
                Folder(exportDir + '/drawable-xxxhdpi').create();
            }
            exportAssets('xxxhdpi');
            //activeDocument.activeHistoryState = activeDocument.historyStates.getByName ('__');
        }
        
        activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }


});



function makeNewCopy() {
    cTID = function(s) { return app.charIDToTypeID(s); };
    sTID = function(s) { return app.stringIDToTypeID(s); };
    
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(cTID('Dcmn'));
    desc1.putReference(cTID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('Usng'), ref2);
    desc1.putInteger(cTID('Vrsn'), 5);
    executeAction(cTID('Mk  '), desc1, DialogModes.NO);
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
    ref.putProperty (stringIDToTypeID ("property"), stringIDToTypeID ("globalAngle"));
    ref.putEnumerated (stringIDToTypeID ("document"), stringIDToTypeID ("ordinal"), stringIDToTypeID ("targetEnum"));
    desc1.putReference (stringIDToTypeID ("target"), ref);
    var desc2 = new ActionDescriptor ();
    desc2.putUnitDouble (stringIDToTypeID ("globalLightingAngle"), stringIDToTypeID ("angleUnit"), globalLightingAngle);
    if (typeof globalAltitude !== 'undefined') {
       desc2.putUnitDouble (stringIDToTypeID ("globalAltitude"), stringIDToTypeID ("angleUnit"), globalAltitude);
    }
    desc1.putObject (stringIDToTypeID ("to"), stringIDToTypeID ("globalAngle"), desc2);
    executeAction (stringIDToTypeID ("set"), desc1, DialogModes.NO);
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
    resize(density(dpiKeyword)/density(docDPI), 'Blnr');
    var targetFile = File(exportDir + '/drawable-' + dpiKeyword + '/' + iconName);
    exportPNG(targetFile);
    
    $.writeln('____________________________________________________');
    try {
        activeDocument.activeHistoryState = activeDocument.historyStates.getByName ('__');
    } catch(e) {}
}


function changeSolidColor(r, g, b) {
    if(activeDocument.activeLayer.typename == 'ArtLayer' && activeDocument.activeLayer.kind == LayerKind.SOLIDFILL) {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(stringIDToTypeID("contentLayer"), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        var desc2 = new ActionDescriptor();
        var desc3 = new ActionDescriptor();
        desc3.putDouble(charIDToTypeID('Rd  '), r);
        desc3.putDouble(charIDToTypeID('Grn '), g);
        desc3.putDouble(charIDToTypeID('Bl  '), b);
        desc2.putObject(charIDToTypeID('Clr '), stringIDToTypeID("RGBColor"), desc3);
        desc1.putObject(charIDToTypeID('T   '), stringIDToTypeID("solidColorLayer"), desc2);
        executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
    }
}

var stop = new Date().getTime();
var elapsed = (stop - start)/1000;
$.writeln(Number(elapsed).toFixed(3) + " secs.");


})();
