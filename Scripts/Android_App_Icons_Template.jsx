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
/*
 * Android App Icon Template
 * 
 * Automation create Android app icon template for all dpis.
 *
 * Author: Ashung Hung
 *
 */

(function(){
    'use strict'

    androidAppIcon();

    function androidAppIcon() {
        newWhiteDoc('Android Launcher Icons', 800, 700);
        
        /*
        newGroup('LDPI (36px)');
        rect(592, 376, 36, 36, 'eeeeee', '#');
        selcetTopLayer();
        */
        
        newGroup('MDPI (48px)');
        rect(572, 624, 48, 48, 'eeeeee', '#');
        selcetTopLayer();    
        
        newGroup('HDPI (72px)');
        rect(572, 532, 72, 72, 'eeeeee', '#');
        selcetTopLayer();
        
        newGroup('XHDPI (96px)');
        rect(572, 416, 96, 96, 'eeeeee', '#');
        selcetTopLayer();
        
        newGroup('XXHDPI (144px)');
        rect(572, 252, 144, 144, 'eeeeee', '#');
        selcetTopLayer();
        
        newGroup('XXXHDPI (192px)');
        rect(572, 40, 192, 192, 'eeeeee', '#');
        selcetTopLayer();
        
        newGroup('Google Play Icon (512px)');
        rect(40, 40, 512, 512, 'eeeeee', '#');
        selcetTopLayer();
    }

    function newWhiteDoc(docName, docWidth, docHeight) {
        preferences.rulerUnits = Units.PIXELS;
        documents.add(docWidth, docHeight, 72, docName, NewDocumentMode.RGB, DocumentFill.WHITE);
    }

    function newGroup(groupName) {
        var newGroup = activeDocument.layerSets.add();
            newGroup.name = groupName;
    }

    function rect(posX, posY, width, height, fillColor, layerName) {
        rectPath(posX, posY, width, height);
        fillPath(fillColor, layerName);
        deselectPath();
    }

    function rectPath(posX, posY, width, height) {
        var top = posY;
        var left = posX;
        var bottom = height + posY;
        var right = width + posX;
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
            ref1.putProperty(charIDToTypeID('Path'), charIDToTypeID('WrPt'));
            desc1.putReference(charIDToTypeID('null'), ref1);
        var desc2 = new ActionDescriptor();
            desc2.putUnitDouble(charIDToTypeID('Top '), charIDToTypeID('#Pxl'), top);
            desc2.putUnitDouble(charIDToTypeID('Left'), charIDToTypeID('#Pxl'), left);
            desc2.putUnitDouble(charIDToTypeID('Btom'), charIDToTypeID('#Pxl'), bottom);
            desc2.putUnitDouble(charIDToTypeID('Rght'), charIDToTypeID('#Pxl'), right);
            desc1.putObject(charIDToTypeID('T   '), charIDToTypeID('Rctn'), desc2);
        executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
    }

    function fillPath(fillColor, layerName) {
        var color = new SolidColor();
            color.rgb.red = parseInt(fillColor.substr(0,2), 16);
            color.rgb.green = parseInt(fillColor.substr(2,2), 16);
            color.rgb.blue = parseInt(fillColor.substr(4,2), 16);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
            ref1.putClass(stringIDToTypeID("contentLayer"));
            desc1.putReference(charIDToTypeID('null'), ref1);
        var desc2 = new ActionDescriptor();
            desc2.putString(charIDToTypeID('Nm  '), layerName);
        var desc3 = new ActionDescriptor();
        var desc4 = new ActionDescriptor();
            desc4.putDouble(charIDToTypeID('Rd  '), color.rgb.red);
            desc4.putDouble(charIDToTypeID('Grn '), color.rgb.green);
            desc4.putDouble(charIDToTypeID('Bl  '), color.rgb.blue);
            desc3.putObject(charIDToTypeID('Clr '), stringIDToTypeID("RGBColor"), desc4);
            desc2.putObject(charIDToTypeID('Type'), stringIDToTypeID("solidColorLayer"), desc3);
            desc1.putObject(charIDToTypeID('Usng'), stringIDToTypeID("contentLayer"), desc2);
        executeAction(charIDToTypeID('Mk  '), desc1, DialogModes.NO);    
    }

    function deselectPath() {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putClass(charIDToTypeID('Path'));
        desc1.putReference(charIDToTypeID('null'), ref1);
        executeAction(charIDToTypeID('Dslc'), desc1, DialogModes.NO);    
    }

    function selcetTopLayer() {
        activeDocument.activeLayer = activeDocument.layers[0];
    }

})();
