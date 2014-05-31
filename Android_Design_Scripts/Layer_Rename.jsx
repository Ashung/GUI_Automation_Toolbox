
(function(){
    'use strict'

    if(documents.length == 0)
        return;
        
    var ui = 
    "dialog {\
        text: 'Layer Rename',\
        alignChildren: 'fill',\
        layerName: Group {\
            orientation: 'column',\
            alignChildren: 'left', \
            labelFiles: StaticText { text: 'Layer name:' },\
            layerNameText: EditText {\
                size: [200, 25] \
            }\
        },\
        separator: Panel { preferredSize: [200, 0] },\
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


    var layerRenameDialog = new Window(ui);
    
    var layerName = layerRenameDialog.layerName.layerNameText;
        layerName.text = activeDocument.activeLayer.name;
    
    // Button event.
    layerRenameDialog.buttons.runBtn.onClick = function() {
        activeDocument.activeLayer.name = layerName.text;
        layerRenameDialog.close();
    }
    
    layerRenameDialog.show();

})();