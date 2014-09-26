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
* @@@BUILDINFO@@@ Android_Layer_Namer_For_Adobe_Generator.jsx !Version! Mon Jun 30 2014 21:14:42 GMT+0800
*/
/*
 * Android Layer Namer For Adobe Generator
 * 
 * Rename layer like 'x_mdpi.png, 150% x_hdpi.png', then generate multi density assets.
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

    if(documents.length == 0) {
        $.writeln('NO DOCUMENTS!');
        return;
    }
    
    // Default dpi config.
    var defaultDPI = 'MDPI';
    //var defaultDPI = 'XHDPI';

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
        docDPI: Group {\
            orientation: 'column',\
            alignChildren: 'left', \
            labelFiles: StaticText { text: 'Your document DPI:' },\
            docDPIList: DropDownList {\
                size: [300, 25] \
            }\
        },\
        layerName: Group {\
            orientation: 'column',\
            alignChildren: 'left', \
            labelFiles: StaticText { text: 'Layer name like \"icon.png\", \"photo.jpg\":' },\
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

    // Initialize docDPI DropDownList
    var docDPIList = layerRenamer.docDPI.docDPIList;
        docDPIList.add('item', 'MDPI');
        docDPIList.add('item', 'XHDPI');
    var docDPI;    
    for(var i = 0; i < docDPIList.items.length; i ++) {
        if(docDPIList.items[i].text == defaultDPI) {
            docDPIList.selection = docDPIList.items[i];
            docDPI = docDPIList.selection.text;
        }
    }    
    docDPIList.onChange = function() {
        docDPI = docDPIList.selection.text;
    }    

    var layerName = layerRenamer.layerName.layerNameText;
        layerName.text = getLayerName();
        
        function getLayerName() {
            var ln = activeDocument.activeLayer.name.split(',');
            //return ln[0].replace(/(\d+% )?(mdpi|hdpi|xhdpi|xxhdpi|xxxhdpi)(-|_)/i, '');
            return ln[0].replace(/(\d+% )?/, '').replace(/(-|_)(mdpi|hdpi|xhdpi|xxhdpi|xxxhdpi)/i, '');
        }


    var mdpi = layerRenamer.output.dpis.MPDI;
    var hdpi = layerRenamer.output.dpis.HPDI;
    var xhdpi = layerRenamer.output.dpis.XHPDI;
    var xxhdpi = layerRenamer.output.dpis.XXHPDI;
    var xxxhdpi = layerRenamer.output.dpis.XXHPDI;

    // Button event.
    layerRenamer.buttons.runBtn.onClick = function() {
        
        var inputLayerName = layerName.text;
        
        var fileName = inputLayerName.replace(/.(gif|jpg|png|9.png)$/i, '');
        var fileExt = inputLayerName.replace(fileName, '');
        
        var newName = [];
        
        if(docDPI == 'MDPI') {
            if(mdpi.value)
                //newName.push('mdpi_' + inputLayerName);
                newName.push('' + fileName + '_mdpi' + fileExt);
            if(hdpi.value)
                //newName.push('150% hdpi_' + inputLayerName);
                newName.push('150% ' + fileName + '_hdpi' + fileExt);
            if(xhdpi.value)
                //newName.push('200% xhdpi_' + inputLayerName);
                newName.push('200% ' + fileName + '_xhdpi' + fileExt);
            if(xxhdpi.value)
                //newName.push('300% xxhdpi_' + inputLayerName);
                newName.push('300% ' + fileName + '_xxhdpi' + fileExt);
            if(xxxhdpi.value)
                //newName.push('400% xxxhdpi_' + inputLayerName);
                newName.push('400% ' + fileName + '_xxxhdpi' + fileExt);
        }
        if(docDPI == 'XHDPI') {
            if(mdpi.value)
                //newName.push('50% mdpi_' + inputLayerName);
                newName.push('50% ' + fileName + '_mdpi' + fileExt);
            if(hdpi.value)
                //newName.push('75% hdpi_' + inputLayerName);
                newName.push('75% ' + fileName + '_hdpi' + fileExt);
            if(xhdpi.value)
                //newName.push('xhdpi_' + inputLayerName);
                newName.push('' + fileName + '_xhdpi' + fileExt);
            if(xxhdpi.value)
                //newName.push('150% xxhdpi_' + inputLayerName);
                newName.push('150% ' + fileName + '_xxhdpi' + fileExt);
            if(xxxhdpi.value)
                //newName.push('200% xxxhdpi_' + inputLayerName);
                newName.push('200% ' + fileName + '_xxxhdpi' + fileExt);
        }
        
        $.writeln(newName);
        
        activeDocument.activeLayer.name = newName.join(', ');
        
        layerRenamer.close();
    }

    layerRenamer.show();

})();
