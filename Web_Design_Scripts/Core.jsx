


function cTID(s) {
    return app.charIDToTypeID(s);
}

function sTID(s) {
    return app.stringIDToTypeID(s);
}

function newSwatch(r, g, b, name) {
    var color = new SolidColor();
        color.rgb.red = r;
        color.rgb.green = g;
        color.rgb.blue = b;
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
        ref1.putClass(cTID('Clrs'));
        desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
        desc2.putString(cTID('Nm  '), name);
    var desc3 = new ActionDescriptor();
        desc3.putDouble(cTID('Rd  '), color.rgb.red);
        desc3.putDouble(cTID('Grn '), color.rgb.green);
        desc3.putDouble(cTID('Bl  '), color.rgb.blue);
        desc2.putObject(cTID('Clr '), sTID("RGBColor"), desc3);
        desc1.putObject(cTID('Usng'), cTID('Clrs'), desc2);
    executeAction(cTID('Mk  '), desc1, DialogModes.NO);    
}
