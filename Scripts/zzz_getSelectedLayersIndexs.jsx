

function getSelectedLayersIndexs() {
    var selectedLayers = new Array;
    var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    var desc = executeActionGet(ref);
    
    if(desc.hasKey(stringIDToTypeID('targetLayers'))) {
        desc = desc.getList(stringIDToTypeID('targetLayers'));
        var c = desc.count;
        var selectedLayers = new Array();
        for(var i = 0; i < c; i++) {
            try {
                activeDocument.backgroundLayer;
                selectedLayers.push(desc.getReference(i).getIndex());
            } catch(e) {
                selectedLayers.push(desc.getReference( i ).getIndex()+1);
            }
        }
    } else {
        var ref = new ActionReference();
        ref.putProperty(charIDToTypeID('Prpr'), charIDToTypeID('ItmI'));
        ref.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
        try {
            activeDocument.backgroundLayer;
            selectedLayers.push(executeActionGet(ref).getInteger(charIDToTypeID('ItmI'))-1);
        } catch(e) {
            selectedLayers.push(executeActionGet(ref).getInteger(charIDToTypeID('ItmI')));
        }
    }
    return selectedLayers;
}




var selectedLayers = getSelectedLayersIndexs();

for(var i = 0; i < selectedLayers.length; i++) {
    
    

        selectLayerByIndex(selectedLayers[i]);
    

    function selectLayerByIndex(index) {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
            ref1.putIndex(charIDToTypeID("Lyr "), index);
            desc1.putReference(charIDToTypeID("null"), ref1);
            executeAction(charIDToTypeID("slct"), desc1, DialogModes.NO);
    }

    $.writeln(activeDocument.activeLayer.name)
    
    if(activeDocument.activeLayer.typename == 'LayerSet') {
        activeDocument.activeLayer.name = activeDocument.activeLayer.name + '.png';
    }
}

/*
    var ref, desc, adjustmentDesc, layerSectionType;
   ref = new ActionReference();
   ref.putIndex(charIDToTypeID( "Lyr " ), index );
   desc =  executeActionGet(ref);   
    
    */


