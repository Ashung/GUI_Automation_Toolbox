// AndroidLuncherIconTemplate.jsx
// (c) 2013 Ashung Hung. 

#target photoshop

cTID=function(s){return app.charIDToTypeID(s);};
sTID=function(s){return app.stringIDToTypeID(s);};

function androindLuncherIcon() {
    newWhiteDoc('Android Luncher Icons', 800, 600);
    
    newGroup('Android Luncher Icon LDPI (36px)');
    rect(592, 376, 36, 36, 'eeeeee', 'background');
    selcetTopLayer();
    
    newGroup('Luncher Icon MDPI (48px)');
    rect(592, 288, 48, 48, 'eeeeee', 'background');
    selcetTopLayer();    
    
    newGroup('Luncher Icon HDPI (72px)');
    rect(592, 176, 72, 72, 'eeeeee', 'background');
    selcetTopLayer();
    
    newGroup('Luncher Icon XHDPI (96px)');
    rect(592, 40, 96, 96, 'eeeeee', 'background');
    selcetTopLayer();
    
    newGroup('Google Play Icon (512px)');
    rect(40, 40, 512, 512, 'eeeeee', 'background');
    selcetTopLayer();
}

function newWhiteDoc(docName, docWidth, docHeight) {
    preferences.rulerUnits = Units.PIXELS;
    documents.add(docWidth, docHeight, 72, docName, NewDocumentMode.RGB, DocumentFill.WHITE);
}

function newGroup(groupName) {
    var newGroup = activeDocument.layerSets.add();
        newGroup.name = groupName;
}

function rect(posX, posY, width, height, fillColor, layerName) {
    rectPath(posX, posY, width, height);
    fillPath(fillColor, layerName);
    deselectPath();
}

function rectPath(posX, posY, width, height) {
    var top = posY;
    var left = posX;
    var bottom = height + posY;
    var right = width + posX;
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
        ref1.putProperty(cTID('Path'), cTID('WrPt'));
        desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(cTID('Top '), cTID('#Pxl'), top);
        desc2.putUnitDouble(cTID('Left'), cTID('#Pxl'), left);
        desc2.putUnitDouble(cTID('Btom'), cTID('#Pxl'), bottom);
        desc2.putUnitDouble(cTID('Rght'), cTID('#Pxl'), right);
        desc1.putObject(cTID('T   '), cTID('Rctn'), desc2);
    executeAction(cTID('setd'), desc1, DialogModes.NO);
}

function fillPath(fillColor, layerName) {
    var color = new SolidColor();
        color.rgb.red = parseInt(fillColor.substr(0,2), 16);
        color.rgb.green = parseInt(fillColor.substr(2,2), 16);
        color.rgb.blue = parseInt(fillColor.substr(4,2), 16);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
        ref1.putClass(sTID("contentLayer"));
        desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
        desc2.putString(cTID('Nm  '), layerName);
    var desc3 = new ActionDescriptor();
    var desc4 = new ActionDescriptor();
        desc4.putDouble(cTID('Rd  '), color.rgb.red);
        desc4.putDouble(cTID('Grn '), color.rgb.green);
        desc4.putDouble(cTID('Bl  '), color.rgb.blue);
        desc3.putObject(cTID('Clr '), sTID("RGBColor"), desc4);
        desc2.putObject(cTID('Type'), sTID("solidColorLayer"), desc3);
        desc1.putObject(cTID('Usng'), sTID("contentLayer"), desc2);
    executeAction(cTID('Mk  '), desc1, DialogModes.NO);    
}

function deselectPath() {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(cTID('Path'));
    desc1.putReference(cTID('null'), ref1);
    executeAction(cTID('Dslc'), desc1, DialogModes.NO);    
}

function selcetTopLayer() {
    activeDocument.activeLayer = activeDocument.layers[0];
}

androindLuncherIcon();
