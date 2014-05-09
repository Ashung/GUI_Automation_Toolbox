/**
* @@@BUILDINFO@@@ Android_Layer_Namer_For_Adobe_Generator.jsx !Version! Fri May 09 2014 17:28:38 GMT+0800
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
            HPDI: Checkbox {\
                value: true,\
                text: 'HPDI'\
            },\
            XHPDI: Checkbox {\
                value: true,\
                text: 'XHPDI'\
            },\
            XXHPDI: Checkbox {\
                value: true,\
                text: 'XXHPDI'\
            },\
            XXXHPDI: Checkbox {\
                value: true,\
                text: 'XXXHPDI'\
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
    
var btn = layerRenamer.buttons.okBtn;

var hdpi = layerRenamer.output.dpis.HPDI.value;
var xhdpi = layerRenamer.output.dpis.XHPDI.value;
var xxhdpi = layerRenamer.output.dpis.XXHPDI.value;
var xxxhdpi = layerRenamer.output.dpis.XXHPDI.value;

//$.writeln(hdpi);

    btn.onClick = function() {
        var inputLayerName = layerName.text;
        var newName = 'mdpi-' + inputLayerName;

        if(hdpi)
            newName += ', 150% hdpi-' + inputLayerName;
        if(xhdpi)
            newName += ', 200% xhdpi-' + inputLayerName;
        if(xxhdpi)
            newName += ', 300% xxhdpi-' + inputLayerName;
        if(xxxhdpi)
            newName += ', 400% xxxhdpi-' + inputLayerName;
        
        activeDocument.activeLayer.name = newName;
    }

    layerRenamer.show();






/*
*/



    
//var layerName = prompt('Layer Name Like: icon.png, photo.jpg', activeDocument.activeLayer.name);
//activeDocument.activeLayer.name = layerName;

// mdpi-x.png, 150% hdpi-x.png, 200% xhdpi-x.png, 300% xxhdpi-x.png, 400% xxxhdpi-x.png
/*
var newLayerName = 'mdpi-' + layerName + ', ' +
                   '150% hdpi-' + layerName + ', ' +
                   '200% xhdpi-' + layerName + ', ' +
                   '300% xxhdpi-' + layerName + ', ' +
                   '400% xxxhdpi-' + layerName;
    */
