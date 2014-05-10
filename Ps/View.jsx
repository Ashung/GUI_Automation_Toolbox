


_Ps._View._Clear_Slices = function() {
    try {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
            ref1.putEnumerated(charIDToTypeID('Mn  '), charIDToTypeID('MnIt'), stringIDToTypeID("clearSlices"));
            desc1.putReference(charIDToTypeID('null'), ref1);
        executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
    } catch(e) {}
}
