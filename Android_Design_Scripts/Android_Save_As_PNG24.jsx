/**
* @@@BUILDINFO@@@ Android_Save_As_PNG24.jsx !Version! Tue May 20 2014 10:37:41 GMT+0800
*/
/*
 * Android Save As PNG-24
 * 
 * Exprot PNG or .9.PNG for Android devices.
 *
 * Author: Ashung Hung
 *
 */

(function(){
    'use strict'
    
    if(documents.length == 0)
        return;
        
    var targetFile = File.saveDialog('Export PNG-24', 'PNG: *.png, Nine-Patch: *.9.png');
    
    if(targetFile != null) {
        $.writeln('Export PNG to:' +  targetFile);
        
        // PNG-24 Settings
        activeDocument.info = null;
        var png24Options = new ExportOptionsSaveForWeb();
            png24Options.format = SaveDocumentType.PNG;
            png24Options.PNG8 = false;
            png24Options.transparency = true;
            png24Options.interlaced = false;
            png24Options.includeProfile = false;
        activeDocument.exportDocument(targetFile, ExportType.SAVEFORWEB, png24Options);  
    }
    
})();    
