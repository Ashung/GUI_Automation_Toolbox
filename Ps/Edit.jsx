///////////////////////////////////////////////////////////////////////////////
// Se
///////////////////////////////////////////////////////////////////////////////

#include "Ps.jsx";


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

