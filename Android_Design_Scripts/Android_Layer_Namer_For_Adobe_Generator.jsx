/**
* @@@BUILDINFO@@@ Android_Layer_Namer_For_Adobe_Generator.jsx !Version! Mon May 12 2014 19:40:16 GMT+0800
*/
/*
 * Android Layer Namer For Adobe Generator
 * 
 * Rename layer like 'mdpi-x.png, 150% hdpi-x.png', then generate multi density assets.
 * After asset generated use 'Android_Asset_Package_For_Adobe_Generator.jsx' to put assets to 
 * different folder, and change the file name.
 *
 * Author: Ashung Hung
 *
 */
/*
    intro: Panel { \
        alignChildren: 'left',\
        content: StaticText { text: '!'},\
    },\    
    */
(function(){
    'use strict'

    if(documents.length == 0)
        return;
    
    // Default dpi config.
    var psdDPI = 'MDPI'; // MDPI or XHDPI

    // Get dpi from document name.
    if(/\_(mdpi).(psd|pdd|psb)$/i.test(activeDocument.name))
        padDPI = 'MDPI';
    if(/\_(xhdpi).(psd|pdd|psb)$/i.test(activeDocument.name))
        padDPI = 'XHDPI';
    
    // Dialog ui.
    var ui = 
    "dialog {\
        text: 'Android Layer Namer For Adobe Generator',\
        alignChildren: 'fill',\
        layerName: Group {\
            orientation: 'column',\
            alignChildren: 'left', \
            labelFiles: StaticText { text: 'Layer name like \"icon.png, photo.jpg\":' },\
            layerNameText: EditText {\
                size: [300, 25] \
            }\
        },\
        output: Group {\
            orientation: 'column',\
            alignChildren: 'left', \
            label: StaticText { text: 'Generate:'},\
            dpis: Group {\
                orientation: 'row',\
                MPDI: Checkbox {\
                    value: true,\
                    text: 'mdpi'\
                },\
                HPDI: Checkbox {\
                    value: true,\
                    text: 'hdpi'\
                },\
                XHPDI: Checkbox {\
                    value: true,\
                    text: 'xhdpi'\
                },\
                XXHPDI: Checkbox {\
                    value: true,\
                    text: 'xxhdpi'\
                },\
                XXXHPDI: Checkbox {\
                    value: true,\
                    text: 'xxxhdpi'\
                }\
            }\
        },\
        separator: Panel { preferredSize: [300, 0] },\
        buttons: Group {\
            orientation: 'row',\
            okBtn: Button {\
                alignment: ['right', 'center'], \
                text: 'OK'\
            },\
            cancelBtn: Button {\
                alignment: ['right', 'center'], \
                text: 'Cancel'\
            }\
        }\
    }";

    var layerRenamer = new Window(ui);

    var layerName = layerRenamer.layerName.layerNameText;
        layerName.text = activeDocument.activeLayer.name;

    var mdpi = layerRenamer.output.dpis.MPDI;
    var hdpi = layerRenamer.output.dpis.HPDI;
    var xhdpi = layerRenamer.output.dpis.XHPDI;
    var xxhdpi = layerRenamer.output.dpis.XXHPDI;
    var xxxhdpi = layerRenamer.output.dpis.XXHPDI;

        layerRenamer.show();

    // Button event.
    layerRenamer.buttons.okBtn.onClick = function() {
        var inputLayerName = layerName.text; //.split(',')
        
        
        
        var newName = [];
        if(psdDPI == 'MDPI') {
            if(mdpi.value)
                newName.push('mdpi-' + inputLayerName);
            if(hdpi.value)
                newName.push('150% hdpi-' + inputLayerName);
            if(xhdpi.value)
                newName.push('200% xhdpi-' + inputLayerName);
            if(xxhdpi.value)
                newName.push('300% xxhdpi-' + inputLayerName);
            if(xxxhdpi.value)
                newName.push('400% xxxhdpi-' + inputLayerName);
        }
        if(psdDPI == 'XHDPI') {
            if(mdpi.value)
                newName.push('50% mdpi-' + inputLayerName);
            if(hdpi.value)
                newName.push('75% hdpi-' + inputLayerName);
            if(xhdpi.value)
                newName.push('xhdpi-' + inputLayerName);
            if(xxhdpi.value)
                newName.push('150% xxhdpi-' + inputLayerName);
            if(xxxhdpi.value)
                newName.push('200% xxxhdpi-' + inputLayerName);
        }
        activeDocument.activeLayer.name = newName.join(', ');
        
        app.refresh();
        
        layerRenamer.close();
    }

    

})();
