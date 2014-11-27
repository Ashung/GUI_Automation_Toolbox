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
 * Layer Rename
 * 
 * Version: 20141112
 * Author: Ashung Hung (Ashung.hung@gmail.com)
 *
 */








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
                size: [300, 25] \
            }\
        },\
        t: Group {\
            orientation: 'column',\
            alignChildren: 'left' \
        }, \
        separator: Panel { preferredSize: [300, 0] },\
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


    var LRD = new Window(ui);
    
    var layerName = LRD.layerName.layerNameText;
        layerName.text = activeDocument.activeLayer.name;
    
    // Button event.
    LRD.buttons.runBtn.onClick = function() {
        activeDocument.activeLayer.name = layerName.text;
        LRD.close();
    }

    LRD.t.t1 = LRD.t.add('group');
    LRD.t.t1.btn1 = LRD.t.t1.add('button', undefined, '#');
    LRD.t.t1.btn1.size = [25, 25];
    LRD.t.t1.btn1.onClick = function() {
        replaceStr(LRD.layerName.layerNameText.text, '#');
    }
    LRD.t.t1.btn2 = LRD.t.t1.add('button', undefined, '@main');
    LRD.t.t1.btn2.size = [50, 25];
    LRD.t.t1.btn2.onClick = function() {
        replaceStr(LRD.layerName.layerNameText.text, '@main');
    }
    LRD.t.t1.btn3 = LRD.t.t1.add('button', undefined, '@bg');
    LRD.t.t1.btn3.size = [40, 25];
    LRD.t.t1.btn3.onClick = function() {
        replaceStr(LRD.layerName.layerNameText.text, '@bg');
    }
    LRD.t.t1.btn4 = LRD.t.t1.add('button', undefined, 'main');
    LRD.t.t1.btn4.size = [40, 25];
    LRD.t.t1.btn4.onClick = function() {
        replaceStr(LRD.layerName.layerNameText.text, 'main');
    }
    LRD.t.t1.btn5 = LRD.t.t1.add('button', undefined, 'bg');
    LRD.t.t1.btn5.size = [30, 25];
    LRD.t.t1.btn5.onClick = function() {
        replaceStr(LRD.layerName.layerNameText.text, 'bg');
    }
    LRD.t.t1.btn6 = LRD.t.t1.add('button', undefined, '=');
    LRD.t.t1.btn6.size = [25, 25];
    LRD.t.t1.btn6.onClick = function() {
        replaceStr(LRD.layerName.layerNameText.text, '=');
    }

    LRD.t.t2 = LRD.t.add('group');
    LRD.t.t2.btn1 = LRD.t.t2.add('button', undefined, '+.png');
    LRD.t.t2.btn1.size = [45, 25];
    LRD.t.t2.btn1.onClick = function() {
        joinStr(LRD.layerName.layerNameText.text.replace(/.(9.png|png|jpg|gif)$/i, ''), '.png');
    }
    LRD.t.t2.btn2 = LRD.t.t2.add('button', undefined, '+@2x.png');
    LRD.t.t2.btn2.size = [70, 25];
    LRD.t.t2.btn2.onClick = function() {
        joinStr(LRD.layerName.layerNameText.text.replace(/.(@\dx.png|9.png|png|jpg|gif)$/i, ''), '.@2x.png');
    }
    LRD.t.t2.btn3 = LRD.t.t2.add('button', undefined, '+@3x.png');
    LRD.t.t2.btn3.size = [70, 25];
    LRD.t.t2.btn3.onClick = function() {
        joinStr(LRD.layerName.layerNameText.text.replace(/.(@\dx.png|9.png|png|jpg|gif)$/i, ''), '.@3x.png');
    }
    LRD.t.t2.btn4 = LRD.t.t2.add('button', undefined, '+.9.png');
    LRD.t.t2.btn4.size = [60, 25];
    LRD.t.t2.btn4.onClick = function() {
        joinStr(LRD.layerName.layerNameText.text.replace(/.(9.png|png|jpg|gif)$/i, ''), '.9.png');
    }


    LRD.show();
    
    
    function replaceStr(str1, str2) {
        var newStr = LRD.layerName.layerNameText.text;
        layerName.text = newStr.replace(str1, str2);
    }
    
    function joinStr(str1, str2) {
        layerName.text = str1 + str2;
    }

})();