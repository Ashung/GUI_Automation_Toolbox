

// Select alpha channel (hold down "cmd/ctrl" and click layer thumb) 
function selectAlphaChannel() {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
        ref1.putProperty(charIDToTypeID('Chnl'), stringIDToTypeID("selection"));
        desc1.putReference(charIDToTypeID('null'), ref1);
    var ref2 = new ActionReference();
        ref2.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Trsp'));
        desc1.putReference(charIDToTypeID('T   '), ref2);
    executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
}

for(var i = 0; i < activeDocument.layers.length; i ++) {
    
    $.writeln(activeDocument.layers[i].name);
    if(activeDocument.layers[i].typename == 'LayerSet') {
        var exportDir;
            try{
                exportDir = activeDocument.path + '/res';
            } catch(e){
                exportDir = Folder.desktop.fullName + '/res';
            }
        
        for(var j = 0; j < activeDocument.layers[i].length; j ++) {
            activeDocument.layers[i].layers[j].name == '#';
            activeDocument.activeLayer = activeDocument.layers[i].layers[j];
            selectAlphaChannel();
            activeDocument.crop(activeDocument.selection.bounds);
            break;
        }
    
        
        
        // export
    
    
    
    
    
    }
    
}
