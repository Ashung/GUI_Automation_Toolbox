// Make Normal Image for Retina Image
// by Ashung Hung

try {
    var desc1 = new ActionDescriptor();
        desc1.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), 50);
        desc1.putBoolean(stringIDToTypeID("scaleStyles"), true);
        desc1.putBoolean(charIDToTypeID('CnsP'), true);
        desc1.putEnumerated(charIDToTypeID('Intr'), charIDToTypeID('Intp'), stringIDToTypeID('bicubicSharper'));
    executeAction(stringIDToTypeID('imageSize'), desc1, DialogModes.NO);
} catch (e) {
   alert(e.message);
}
