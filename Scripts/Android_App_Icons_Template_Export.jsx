/**
* @@@BUILDINFO@@@ Android_App_Icons_Template_Export.jsx !Version! Fri Aug 15 2014 10:44:06 GMT+0800
*/
/*
 * Android App Icon Template Export
 * 
 * 1, Use "Android_App_Icons_Template.jsx" to create app icon template.
 * 2, Use this script to export all icons.
 *
 * Author: Ashung Hung
 *
 */

(function(){
    'use strict'

    // Global variable
    var root;
        try {
            root = activeDocument.path + '/' + activeDocument.name.replace(/ /g, '_') + '/res';
        } catch(e) {
            root = Folder.desktop.fullName + '/' + activeDocument.name.replace(/ /g, '_') + '/res';
        }
    
    var globalLight = [getGlobalLightAngle(), getGlobalLightAltitude()];

    for(var i = 0; i < activeDocument.layers.length; i ++) {
        
        activeDocument.activeLayer = activeDocument.layers[i];

        if(activeDocument.activeLayer.name == 'Google Play Icon (512px)')
            copyAndExport(root + '/ic_launcher-web.png', globalLight);
        if(activeDocument.activeLayer.name == 'XXXHDPI (192px)')
            copyAndExport(root + '/drawable-xxxhdpi/ic_launcher.png', globalLight);
            
        if(activeDocument.activeLayer.name == 'XXHDPI (144px)')
            copyAndExport(root + '/drawable-xxhdpi/ic_launcher.png', globalLight);
        
        if(activeDocument.activeLayer.name == 'XHDPI (96px)')
            copyAndExport(root + '/drawable-xhdpi/ic_launcher.png', globalLight);
            
        if(activeDocument.activeLayer.name == 'HDPI (72px)')
            copyAndExport(root + '/drawable-hdpi/ic_launcher.png', globalLight);
        
        if(activeDocument.activeLayer.name == 'MDPI (48px)')
            copyAndExport(root + '/drawable-mdpi/ic_launcher.png', globalLight);

    }

    function copyAndExport(savePath, globalLightArray) {
        
        if(!File(savePath).parent.exists) {
            !File(savePath).parent.create();
        }
    
        // copy
        makeNewCopy();
        
        // Set document gobal light
        setDocumentGlobalAngle(globalLightArray[0], globalLightArray[1]);
        
        // Crop
        activeDocument.activeLayer = activeDocument.layers[0].artLayers.getByName('#');
        selectAlphaChannel();
        activeDocument.activeLayer.visible = false;
        activeDocument.crop(activeDocument.selection.bounds);
        
        exportPNG(File(savePath));
        
        $.writeln(activeDocument.layers[0].name + ' -> ' + savePath);
        
        activeDocument.close(SaveOptions.DONOTSAVECHANGES);
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
        // Work for shape layer
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
            ref1.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));
            desc1.putReference(charIDToTypeID("null"), ref1);
        var ref2 = new ActionReference();
            ref2.putEnumerated( charIDToTypeID("Path"), charIDToTypeID("Path"), stringIDToTypeID("vectorMask"));
            desc1.putReference(charIDToTypeID("T   "), ref2 );
        executeAction(charIDToTypeID("setd"), desc1, DialogModes.NO );
    }

    function exportPNG(targetFile) {
        // PNG-24 Settings
        var png24Options = new ExportOptionsSaveForWeb();
            png24Options.format = SaveDocumentType.PNG;
            png24Options.PNG8 = false;
            png24Options.transparency = true;
            png24Options.interlaced = false;
            png24Options.includeProfile = false;
        activeDocument.exportDocument(targetFile, ExportType.SAVEFORWEB, png24Options);  
    }

})();
