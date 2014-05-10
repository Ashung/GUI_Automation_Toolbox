

///////////////////////////////////////////////////////////////////////////////
// Se
///////////////////////////////////////////////////////////////////////////////

#include "Ps.jsx";

_Ps._Select._All_Layers = function() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc.putReference(charIDToTypeID('null'), ref);
    executeAction(stringIDToTypeID('selectAllLayers'), desc, DialogModes.NO);   
}