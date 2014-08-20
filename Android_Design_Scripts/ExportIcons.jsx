
(function(){
    'use strict'
    
    //exportAssets(1, 'res/drawable-mdpi');
    //exportAssets(1.5, 'res/drawable-hdpi');
    //exportAssets(2, 'res/drawable-xhdpi');
    //exportAssets(3, 'res/drawable-xxhdpi');
    //exportAssets(4, 'res/drawable-xxxhdpi');

exportAssets(0.5, 'res/drawable-mdpi');
exportAssets(0.75, 'res/drawable-hdpi');
exportAssets(1, 'res/drawable-xhdpi');
exportAssets(1.5, 'res/drawable-xxhdpi');
exportAssets(2, 'res/drawable-xxxhdpi');


    function exportAssets(scale, dir) {
        // History
        try{
            activeDocument.activeHistoryState = activeDocument.historyStates.getByName ('XXXXXXXXXX');
        } catch(e) {
            snapShot('XXXXXXXXXX');
        }

        // outputFolder
        try{
            var outputFolder = activeDocument.path + dir;
        } catch(e) {
            var outputFolder = Folder(Folder.desktop.fullName + '/' + activeDocument.name.replace(/\.[^\.]+$/, '') + '-assets/' + dir);
        }
            
        if(!outputFolder.exists)
            outputFolder.create();   
            
        // Scale
        resize(scale);

        // Hide all layers
        var rootLayer = activeDocument;
        // var rootLayer = activeDocument.layers[0];
        
        for(var i = 0; i < rootLayer.layers.length; i++) {
            rootLayer.layers[i].visible = false;
        }
            
        for(var i = 0; i < rootLayer.layers.length; i++) {
            
            if(i > 0) {
                rootLayer.layers[i-1].visible = false;
            }
            rootLayer.layers[i].visible = true;

            // Export PNG       
            var targetFile = File(outputFolder + '/' + rootLayer.layers[i].name.replace(/ /g, '_') + '.png');
            //var targetFile = File(outputFolder + '/calendar_' + rootLayer.layers[i].name + '.png');
            
            
            $.writeln('Export to: ' +  targetFile.fsName);
                
            var png24Options = new ExportOptionsSaveForWeb();
                png24Options.format = SaveDocumentType.PNG;
                png24Options.PNG8 = false;
                png24Options.transparency = true;
                png24Options.interlaced = false;
                png24Options.includeProfile = false;
            activeDocument.exportDocument(targetFile, ExportType.SAVEFORWEB, png24Options);
        }

        activeDocument.activeHistoryState = activeDocument.historyStates.getByName ('XXXXXXXXXX');
    }

    function snapShot(name) {
        var idMk = charIDToTypeID("Mk  ");
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
            ref1.putClass(charIDToTypeID("SnpS"));
            desc1.putReference(charIDToTypeID("null"), ref1);
        var ref2 = new ActionReference();
            ref2.putProperty(charIDToTypeID("HstS"), charIDToTypeID("CrnH"));
            desc1.putReference(charIDToTypeID("From"), ref2);
            desc1.putString(charIDToTypeID("Nm  "), name);
            desc1.putEnumerated(charIDToTypeID("Usng"), charIDToTypeID("HstS"), charIDToTypeID("FllD"));
            executeAction(idMk, desc1, DialogModes.NO);
    }

    function resize(scale) {
        var desc1 = new ActionDescriptor();
            desc1.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), scale * 100);
            desc1.putBoolean(stringIDToTypeID("scaleStyles"), true);
            desc1.putBoolean(charIDToTypeID('CnsP'), true);
            desc1.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), charIDToTypeID('Blnr'));
        executeAction(stringIDToTypeID('imageSize'), desc1, DialogModes.NO);
    }


})();