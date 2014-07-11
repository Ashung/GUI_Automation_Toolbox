
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