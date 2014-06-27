
#include "Ps.jsx";


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
    var idnull = charIDToTypeID("null");
    var ref1 = new ActionReference();
    var idSnpS = charIDToTypeID("SnpS");
        ref1.putClass( idSnpS );
        desc1.putReference(idnull, ref1);
    var idFrom = charIDToTypeID("From");
    var ref2 = new ActionReference();
    var idHstS = charIDToTypeID("HstS");
    var idCrnH = charIDToTypeID("CrnH");
        ref2.putProperty(idHstS, idCrnH);
        desc1.putReference(idFrom, ref2);
    var idNm = charIDToTypeID("Nm  ");
        desc1.putString(idNm, name);
    var idUsng = charIDToTypeID("Usng");
    var idHstS = charIDToTypeID("HstS");
    var idFllD = charIDToTypeID("FllD");
        desc1.putEnumerated(idUsng, idHstS, idFllD);
        executeAction(idMk, desc1, DialogModes.NO);
}




