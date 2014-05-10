
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