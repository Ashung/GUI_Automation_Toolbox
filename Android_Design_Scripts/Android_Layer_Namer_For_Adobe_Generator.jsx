/**
* @@@BUILDINFO@@@ Android_Layer_Namer_For_Adobe_Generator.jsx !Version! Mon May 19 2014 16:47:07 GMT+0800
*/
/*
 * Android Layer Namer For Adobe Generator
 * 
 * Rename layer like 'mdpi-x.png, 150% hdpi-x.png', then generate multi density assets.
 * After asset generated use 'Android_Asset_Package_For_Adobe_Generator.jsx' to put assets to 
 * different folder, and change the file name.
 *
 * Only support MDPI and XHDPI psd files, because Adobe Generator can't sacle 66.66% (XXHDPI to XHDPI).
 * 
 * Author: Ashung Hung
 *
 */

(function(){
    'use strict'

    if(documents.length == 0)
        return;
    
    // Default dpi config.
    //var psdDPI = 'MDPI'; // MDPI or XHDPI
    var psdDPI = 'XHDPI';

    // Get dpi from document name.
    if(/\_(mdpi).(psd|pdd|psb)$/i.test(activeDocument.name))
        psdDPI = 'MDPI';
    if(/\_(xhdpi).(psd|pdd|psb)$/i.test(activeDocument.name))
        psdDPI = 'XHDPI';
    
    // Dialog ui.
    var ui = 
    "dialog {\
        text: 'Android Layer Namer For Adobe Generator',\
        alignChildren: 'fill',\
        intro: Group { \
            alignChildren: 'left',\
            content: StaticText { text: 'Your document is " + psdDPI +".'} \
        }, \
        separator1: Panel { preferredSize: [300, 0] },\
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

    var layerRenamer = new Window(ui);

    var layerName = layerRenamer.layerName.layerNameText;
        //layerName.text = activeDocument.activeLayer.name;
        
        layerName.text = getLayerName();
        
        function getLayerName() {
            var ln = activeDocument.activeLayer.name.split(',');
            return ln[0].replace(/(\d+% )?(mdpi|hdpi|xhdpi|xxhdpi|xxxhdpi)(-|_)/i, '');
        }

    var mdpi = layerRenamer.output.dpis.MPDI;
    var hdpi = layerRenamer.output.dpis.HPDI;
    var xhdpi = layerRenamer.output.dpis.XHPDI;
    var xxhdpi = layerRenamer.output.dpis.XXHPDI;
    var xxxhdpi = layerRenamer.output.dpis.XXHPDI;

    // Button event.
    layerRenamer.buttons.runBtn.onClick = function() {
        
        var inputLayerName = layerName.text;
        
        var newName = [];
        
        if(psdDPI == 'MDPI') {
            if(mdpi.value)
                newName.push('mdpi_' + inputLayerName);
            if(hdpi.value)
                newName.push('150% hdpi_' + inputLayerName);
            if(xhdpi.value)
                newName.push('200% xhdpi_' + inputLayerName);
            if(xxhdpi.value)
                newName.push('300% xxhdpi_' + inputLayerName);
            if(xxxhdpi.value)
                newName.push('400% xxxhdpi_' + inputLayerName);
        }
        if(psdDPI == 'XHDPI') {
            if(mdpi.value)
                newName.push('50% mdpi_' + inputLayerName);
            if(hdpi.value)
                newName.push('75% hdpi_' + inputLayerName);
            if(xhdpi.value)
                newName.push('xhdpi_' + inputLayerName);
            if(xxhdpi.value)
                newName.push('150% xxhdpi_' + inputLayerName);
            if(xxxhdpi.value)
                newName.push('200% xxxhdpi_' + inputLayerName);
        }
        
        $.writeln(newName);
        
        activeDocument.activeLayer.name = newName.join(', ');
        
        //app.refresh();
        
        layerRenamer.close();
    }

    layerRenamer.show();

})();
