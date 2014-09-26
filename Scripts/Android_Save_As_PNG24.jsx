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
