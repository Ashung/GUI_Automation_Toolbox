// Copy to New Document
// by Ashung Hung

try {
    cTID = function(s) { return app.charIDToTypeID(s); };
    sTID = function(s) { return app.stringIDToTypeID(s); };
    
    // Make     
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
        ref1.putClass(cTID('Dcmn'));
        desc1.putReference(cTID('null'), ref1);
    var ref2 = new ActionReference();
        ref2.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
        desc1.putReference(cTID('Usng'), ref2);
        desc1.putInteger(cTID('Vrsn'), 5);
    executeAction(cTID('Mk  '), desc1, DialogModes.NO);
    
    // Image - Trim
    var desc2 = new ActionDescriptor();
        desc2.putEnumerated(sTID("trimBasedOn"), sTID("trimBasedOn"), cTID('Trns'));
        desc2.putBoolean(cTID('Top '), true);
        desc2.putBoolean(cTID('Btom'), true);
        desc2.putBoolean(cTID('Left'), true);
        desc2.putBoolean(cTID('Rght'), true);
    executeAction(sTID('trim'), desc2, DialogModes.NO);
    
    // View - Actual Pixels
    var desc3 = new ActionDescriptor();
    var ref3 = new ActionReference();
        ref3.putEnumerated(cTID('Mn  '), cTID('MnIt'), cTID('ActP'));
        desc3.putReference(cTID('null'), ref3);
    executeAction(cTID("slct"), desc3, DialogModes.NO);
    
    // View - Show - None
    var desc4 = new ActionDescriptor();
    var ref4 = new ActionReference();
        ref4.putEnumerated(cTID('Mn  '), cTID('MnIt'), sTID('showNone'));
        desc4.putReference(cTID('null'), ref4);
    executeAction(cTID("slct"), desc4, DialogModes.NO);
   
} catch (e) { }

