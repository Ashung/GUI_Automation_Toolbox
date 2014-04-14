// iOSIconTemplate.jsx
// (c) 2013 Ashung Hung. 

#target photoshop

cTID=function(s){return app.charIDToTypeID(s);};
sTID=function(s){return app.stringIDToTypeID(s);};

function iOSIcon() {
    newWhiteDoc('iOS Icons', 1656, 1104);
    // http://iconhandbook.co.uk/reference/chart/ios/
    var icons = [
        {'name': 'iTunesArtwork@2x (iTunes 1024-r180)', 'x': 40, 'y': 40, 'width': 1024, 'radius': 180},
        {'name': 'iTunesArtwork (iTunes 512-r90)', 'x': 1104, 'y': 40, 'width': 512, 'radius': 90},
        {'name': 'Icon@2x.png (iPhone App icon @2x 114-r20, apple-touch-icon-114x114-precomposed.png)', 'x': 1104, 'y': 592, 'width': 114, 'radius': 20},
        {'name': 'Icon.png (iPhone App icon 57-r10, apple-touch-icon-precomposed.png)', 'x': 1258, 'y': 649, 'width': 57, 'radius': 10},
        {'name': 'Icon-Small@2x.png (iPhone Small icon @2x 58-r10)', 'x': 1355, 'y': 648, 'width': 58, 'radius': 10},
        {'name': 'Icon-Small.png (iPhone Small icon 29-r5)', 'x': 1453, 'y': 677, 'width': 29, 'radius': 5},
        {'name': 'Icon-72@2x.png (iPad App icon @2x 144-r24, apple-touch-icon-144x144-precomposed.png)', 'x': 1104, 'y': 746, 'width': 144, 'radius': 24},
        {'name': 'Icon-72.png (iPad App icon 72-r12, apple-touch-icon-72x72-precomposed.png)', 'x': 1288, 'y': 818, 'width': 72, 'radius': 12},
        {'name': 'Icon-Small-50@2x.png (iPad Small icon @2x 100-r16)', 'x': 1400, 'y': 790, 'width': 100, 'radius': 16},
        {'name': 'Icon-Small-50.png (iPad Small icon 50-r8)', 'x': 1540, 'y': 840, 'width': 50, 'radius': 8}
    ];
    for(var i = 0; i < icons.length; i ++) {
        newGroup(icons[i].name);
        rect(icons[i].x, icons[i].y, icons[i].width, icons[i].width, 'f5f5f5', 'background');
        roundedRect(icons[i].x, icons[i].y, icons[i].width, icons[i].width, icons[i].radius, 'dddddd', 'rounded');
        selcetTopLayer();
    }
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

function roundedRect(posX, posY, width, height, radius, fillColor, layerName) {
    roundedRectPath(posX, posY, width, height, radius);
    fillPath(fillColor, layerName);
    deselectPath();
}

function roundedRectPath(posX, posY, width, height, radius) {
    var top = posY;
    var left = posX;
    var bottom = height + posY;
    var right = width + posX;
    var rds = radius;
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
        ref1.putProperty(cTID('Path'), cTID('WrPt'));
        desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(cTID('Top '), cTID('#Pxl'), top);
        desc2.putUnitDouble(cTID('Left'), cTID('#Pxl'), left);
        desc2.putUnitDouble(cTID('Btom'), cTID('#Pxl'), bottom);
        desc2.putUnitDouble(cTID('Rght'), cTID('#Pxl'), right);
        desc2.putUnitDouble(cTID('Rds '), cTID('#Pxl'), rds);
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

iOSIcon();
