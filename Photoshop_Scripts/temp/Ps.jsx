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
 *
 * Version: 1.0.0
 * Author: Ashung Hung (Ashung.hung@gmail.com)
 *
 */

var _Ps = {
    _File: {},
    _Edit: {
        _Paste_Special: {},
        _Transform: {}
    },
    _Image: {},
    _Layer: {},
    _Type: {},
    _Select: {},
    _Filter: {},
    _View: {},
    _Window: {
        _Adjustment: {},
        _Channels: {},
        _Colors: {},
        _History: {},
        _LayerComps: {},
        _Layers: {},
        _Paths: {},
        _Styles: {},
        _Swatches: {},
        _Tools: {},
    }
}


///////////////////////////////////////////////////////////////////////////////
//  File
///////////////////////////////////////////////////////////////////////////////

_Ps._File._New = function() {
    alert(1);
}

_Ps._File._Open = function() {
    alert(1);
}

_Ps._File._Script = function() {
    alert(1);
}

_Ps._File._Save_As = {
    _Psd: function() {},
    
    /*
     * @param File targetFile 
     */
    _Png: function(targetFile) {
        var pngSaveOptions = new PNGSaveOptions();
            pngSaveOptions.compression = 9;
            pngSaveOptions.interlaced = false;
        activeDocument.saveAs(targetFile, pngSaveOptions, true, Extension.LOWERCASE);
    },

    _Jpg: function() {},
    _Gif: function() {},
    
    
}

_Ps._File._Save_As_Web = {
    _Png8: function() {},
    
    /*
     * @param File targetFile 
     */
    _Png24: function(targetFile) {
        var png24Options = new ExportOptionsSaveForWeb();
            png24Options.format = SaveDocumentType.PNG;
            png24Options.PNG8 = false;
            png24Options.transparency = true;
            png24Options.interlaced = false;
            png24Options.includeProfile = false;
        activeDocument.exportDocument(targetFile, ExportType.SAVEFORWEB, png24Options);
    },

    _Jpg: function() {},
    _Gif: function() {}
}


///////////////////////////////////////////////////////////////////////////////
// Edit
///////////////////////////////////////////////////////////////////////////////

_Ps._Edit._Paste_Special._Paste_in_Place = function() {
    var idpast = charIDToTypeID("past");
    var idinPlace = stringIDToTypeID("inPlace");
    var idAntA = charIDToTypeID("AntA");
    var idAnnt = charIDToTypeID("Annt");
    var idAnno = charIDToTypeID("Anno");
    var desc = new ActionDescriptor();
    desc.putBoolean(idinPlace, true);
    desc.putEnumerated(idAntA, idAnnt, idAnno);
    executeAction(idpast, desc, DialogModes.NO);
}

///////////////////////////////////////////////////////////////////////////////
// Image
///////////////////////////////////////////////////////////////////////////////


/*
 * @param UnitValue  width
 * @param UnitValue  height 
 * @param Number  resolution
 * @param Object  resample
 * @param Boolean scaleStyle
 * @param Number reduceNoise [0-100]
 */
_Ps._Image._Image_Size = function(width, height, resolution, resample, scaleStyle, reduceNoise) {

    var desc1 = new ActionDescriptor();
        desc1.putUnitDouble(charIDToTypeID("Wdth"), charIDToTypeID("#Pxl"), width.as('px'));
        desc1.putUnitDouble(charIDToTypeID("Hght"), charIDToTypeID("#Pxl"), height.as('px'));
 
    var idResample;
    switch(resample) {
        case ResampleMethod.PRESERVEDETAILS:
            idResample = stringIDToTypeID("preserveDetailsUpscale");
            if(reduceNoise != undefined) {
                desc1.putInteger(charIDToTypeID("Nose"), reduceNoise);
            } else {
                desc1.putInteger(charIDToTypeID("Nose"), 0);
            }
            break;
        case ResampleMethod.BICUBICSMOOTHER:
            idResample = stringIDToTypeID("bicubicSmoother");
            break;
        case ResampleMethod.BICUBICSHARPER:
            idResample = stringIDToTypeID("bicubicSharper");
            break;
        case ResampleMethod.BICUBIC:
            idResample = charIDToTypeID("Bcbc");
            break;
        case ResampleMethod.BILINEAR:
            idResample = charIDToTypeID("Blnr");
            break;
        case ResampleMethod.NEARESTNEIGHBOR:
            idResample = charIDToTypeID("Nrst");
            break;    
        // AUTOMATIC
        default:
            idResample = stringIDToTypeID("automaticInterpolation");
    }
    desc1.putBoolean(charIDToTypeID("CnsP"), true);
    desc1.putEnumerated(charIDToTypeID("Intr"), charIDToTypeID("Intp"), idResample);
        
    // Scale style
    if(scaleStyle === false) {
        desc1.putBoolean(stringIDToTypeID("scaleStyles"), false);
    } else {
        desc1.putBoolean(stringIDToTypeID("scaleStyles"), true);
    }    

    executeAction(charIDToTypeID("ImgS"), desc1, DialogModes.NO);
    
    // Change resolution
    if(resolution != undefined) {
        activeDocument.resizeImage(width, height, resolution, resample);
    }
}


///////////////////////////////////////////////////////////////////////////////
// Layer
///////////////////////////////////////////////////////////////////////////////

_Ps._Layer._New = {
    _Layer: {},
    _Background_from_Layer: {},
    _Group: {},
    _Group_from_Layers: {},
    
    _Layer_Via_Copy: function() {
        executeAction(stringIDToTypeID('copyToLayer'), undefined, DialogModes.NO);
    },
    _Layer_Via_Cut: function() {
        try {
            executeAction(stringIDToTypeID('cutToLayer'), undefined, DialogModes.NO);
        } catch(e) {}
    }
}

_Ps._Layer._Hide_Layers = function() {
    var idHd = charIDToTypeID("Hd  ");
    var desc1 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var list1 = new ActionList();
    var ref1 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref1.putEnumerated(idLyr, idOrdn, idTrgt);
    list1.putReference(ref1 );
    desc1.putList(idnull, list1);
    executeAction(idHd, desc1, DialogModes.NO);
}

_Ps._Layer._Show_Layers = function() {
    var idShw = charIDToTypeID("Shw ");
    var desc1 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var list1 = new ActionList();
    var ref1 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref1.putEnumerated(idLyr, idOrdn, idTrgt);
    list1.putReference(ref1);
    desc1.putList(idnull, list1);
    executeAction(idShw, desc1, DialogModes.NO);
}



_Ps._Layer._Layer_Content_Options = function() {
    
    
    
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(stringIDToTypeID("contentLayer"), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    var desc2 = new ActionDescriptor();
    var desc3 = new ActionDescriptor();
    desc3.putDouble(charIDToTypeID('Rd  '), 51.0031127929688);
    desc3.putDouble(charIDToTypeID('Grn '), 51.0031127929688);
    desc3.putDouble(charIDToTypeID('Bl  '), 51.0031127929688);
    desc2.putObject(charIDToTypeID('Clr '), stringIDToTypeID("RGBColor"), desc3);
    desc1.putObject(charIDToTypeID('T   '), stringIDToTypeID("solidColorLayer"), desc2);
    executeAction(charIDToTypeID('setd'), desc1, DialogModes.NO);
}


///////////////////////////////////////////////////////////////////////////////
// Type
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
// Select
///////////////////////////////////////////////////////////////////////////////

_Ps._Select._All_Layers = function() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc.putReference(charIDToTypeID('null'), ref);
    executeAction(stringIDToTypeID('selectAllLayers'), desc, DialogModes.NO);   
}

///////////////////////////////////////////////////////////////////////////////
// Filter
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// View
///////////////////////////////////////////////////////////////////////////////

_Ps._View._Clear_Slices = function() {
    try {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
            ref1.putEnumerated(charIDToTypeID('Mn  '), charIDToTypeID('MnIt'), stringIDToTypeID("clearSlices"));
            desc1.putReference(charIDToTypeID('null'), ref1);
        executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
    } catch(e) {}
}

///////////////////////////////////////////////////////////////////////////////
// Window
///////////////////////////////////////////////////////////////////////////////

//selectTool('moveTool');
//selectTool('marqueeRectTool');
//selectTool('marqueeEllipTool');
//selectTool('marqueeSingleRowTool');
//selectTool('marqueeSingleColumnTool');
//selectTool('lassoTool');
//selectTool('polySelTool');
//selectTool('magneticLassoTool');
//selectTool('quickSelectTool');
//selectTool('magicWandTool');
//selectTool('cropTool');
//selectTool('sliceTool');
//selectTool('sliceSelectTool');
//selectTool('spotHealingBrushTool');
//selectTool('magicStampTool');
//selectTool('patchSelection');
//selectTool('redEyeTool');
//selectTool('paintbrushTool');
//selectTool('pencilTool');
//selectTool('colorReplacementBrushTool');
//selectTool('cloneStampTool');
//selectTool('patternStampTool');
//selectTool('historyBrushTool');
//selectTool('artBrushTool');
//selectTool('eraserTool');
//selectTool('backgroundEraserTool');
//selectTool('magicEraserTool');
//selectTool('gradientTool');
//selectTool('bucketTool');
//selectTool('blurTool');
//selectTool('sharpenTool');
//selectTool('smudgeTool');
//selectTool('dodgeTool');
//selectTool('burnInTool');
//selectTool('saturationTool');
//selectTool('penTool');
//selectTool('freeformPenTool');
//selectTool('addKnotTool');
//selectTool('deleteKnotTool');
//selectTool('convertKnotTool');
//selectTool('typeCreateOrEditTool');
//selectTool('typeVerticalCreateOrEditTool');
//selectTool('typeCreateMaskTool');
//selectTool('typeVerticalCreateMaskTool');
//selectTool('pathComponentSelectTool');
//selectTool('directSelectTool');
//selectTool('rectangleTool');
//selectTool('roundedRectangleTool');
//selectTool('ellipseTool');
//selectTool('polygonTool');
//selectTool('lineTool');
//selectTool('customShapeTool');
//selectTool('textAnnotTool');
//selectTool('soundAnnotTool');
//selectTool('eyedropperTool');
//selectTool('colorSamplerTool');
//selectTool('rulerTool');
//selectTool('handTool');
//selectTool('zoomTool');

function selectTool(tool) {
    var desc9 = new ActionDescriptor();
        var ref7 = new ActionReference();
        ref7.putClass( app.stringIDToTypeID(tool) );
    desc9.putReference( app.charIDToTypeID('null'), ref7 );
    executeAction( app.charIDToTypeID('slct'), desc9, DialogModes.NO );
};


_Ps._Windows._History._NewSnapShot(name) {
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
