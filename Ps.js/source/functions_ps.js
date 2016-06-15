
// getSelectedLayersIndexs() -> Array
function getSelectedLayersIndexs() {
    var selectedLayers = new Array;
    var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    var desc = executeActionGet(ref);

    if(desc.hasKey(stringIDToTypeID('targetLayers'))) {
        desc = desc.getList(stringIDToTypeID('targetLayers'));
        var c = desc.count;
        var selectedLayers = new Array();
        for(var i = 0; i < c; i++) {
            try {
                activeDocument.backgroundLayer;
                selectedLayers.push(desc.getReference(i).getIndex());
            } catch(e) {
                selectedLayers.push(desc.getReference( i ).getIndex()+1);
            }
        }
    } else {
        var ref = new ActionReference();
        ref.putProperty(charIDToTypeID('Prpr'), charIDToTypeID('ItmI'));
        ref.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
        try {
            activeDocument.backgroundLayer;
            selectedLayers.push(executeActionGet(ref).getInteger(charIDToTypeID('ItmI'))-1);
        } catch(e) {
            selectedLayers.push(executeActionGet(ref).getInteger(charIDToTypeID('ItmI')));
        }
    }
    return selectedLayers;
}

// selectLayerByIndex(index: Number) -> artLayer
function selectLayerByIndex(index) {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
        ref1.putIndex(charIDToTypeID("Lyr "), index);
        desc1.putReference(charIDToTypeID("null"), ref1);
        executeAction(charIDToTypeID("slct"), desc1, DialogModes.NO);
}

// smartobjectReplaceContents(file: File|String)
// file: File("~/Desktop/img.png") | "~/Desktop/img.png"
function smartobjectReplaceContents(file) {
    if(typeof(file) == "string") {
        file = File(file);
    }
    // activeDocument.activeLayer == smartObject;
    if(file.exists && true) {
        var desc1 = new ActionDescriptor();
            desc1.putPath(charIDToTypeID("null"), f);
            executeAction(stringIDToTypeID("placedLayerReplaceContents"), desc1, DialogModes.NO);
    }
}

// traversalLayes(doc: Document|Layer, fn: Function)
// doc: activeDocument | app.activeDocument.activeLayer
// fn: function(){...}
function traversalLayes(doc, fn) {
    //how many layers are there in this document?
    var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    var count = executeActionGet(ref).getInteger(charIDToTypeID('NmbL'));
    //traverse the list backwards (does parents first)
    for (var i = count; i >= 1; i--) {
        try{
            var ref = new ActionReference();
                ref.putIndex(charIDToTypeID('Lyr '), i);
            //access layer index #i
            var desc = executeActionGet(ref);
            //ID for selecting by ID #
            var layerID = desc.getInteger(stringIDToTypeID('layerID'));
            var layerSection = typeIDToStringID(desc.getEnumerationValue(stringIDToTypeID('layerSection')));
            if (layerSection != 'layerSectionEnd') {
                //select layer by id
                var ref = new ActionReference();
                var desc = new ActionDescriptor();
                    ref.putIdentifier(charIDToTypeID('Lyr '), layerID);
                    desc.putReference(charIDToTypeID('null'), ref);
                    desc.putBoolean(charIDToTypeID('MkVs'), false);
                    executeAction(charIDToTypeID('slct'), desc, DialogModes.NO);
                //apply function to selected layer
                fn(app.activeDocument.activeLayer);
            }
        } catch(e) {}
    }
}

// getGlobalLightAngle() -> Number: -180 - 180
function getGlobalLightAngle() {
    var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var angle = executeActionGet(ref).getInteger(stringIDToTypeID('globalAngle'));
    return angle;
}

// getGlobalLightAltitude() -> Number: 0 - 90
function getGlobalLightAltitude() {
    var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("capp"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var altitude = executeActionGet(ref).getObjectValue(stringIDToTypeID('globalAngle')).getUnitDoubleValue(stringIDToTypeID('globalAltitude'));
    return altitude;
}

// setDocumentGlobalAngle(globalLightingAngle: Number, globalAltitude: Number)
// globalLightingAngle: -180 - 180
// globalAltitude: 0 - 90
function setDocumentGlobalAngle(globalLightingAngle, globalAltitude) {
    var desc1 = new ActionDescriptor ();
    var ref = new ActionReference ();
        ref.putProperty(stringIDToTypeID ("property"), stringIDToTypeID ("globalAngle"));
        ref.putEnumerated(stringIDToTypeID ("document"), stringIDToTypeID ("ordinal"), stringIDToTypeID ("targetEnum"));
        desc1.putReference(stringIDToTypeID ("target"), ref);
    var desc2 = new ActionDescriptor ();
        desc2.putUnitDouble(stringIDToTypeID ("globalLightingAngle"), stringIDToTypeID ("angleUnit"), globalLightingAngle);
    if (typeof globalAltitude !== 'undefined') {
        desc2.putUnitDouble(stringIDToTypeID ("globalAltitude"), stringIDToTypeID ("angleUnit"), globalAltitude);
    }
        desc1.putObject(stringIDToTypeID ("to"), stringIDToTypeID ("globalAngle"), desc2);
        executeAction(stringIDToTypeID ("set"), desc1, DialogModes.NO);
}



////////////////////////////////////////////////////////////////////////////////
// PATH
////////////////////////////////////////////////////////////////////////////////


// TODO
function makeRectPath(x, y, width, height)

function makeRoundedRectPath(x, y, width, height, radius)

function makeEllipsePath(x, y, width, height)

function makePolygonPath(pointsArray)

function drawRect(x, y, width, height)

function drawRoundedRect(x, y, width, height, radius)

function drawEllipse(x, y, width, height)

function drawPolygon(pointsArray)

function drawLine(begin_x, begin_y, end_x, end_y, weight)

// rectangleRadius(all: Number)
// rectangleRadius(topleft_bottomright: Number, topright_bottomleft: Number)
// rectangleRadius(topleft: Number, topright_bottomleft: Number, bottomright: Number)
// rectangleRadius(topleft: Number, topright: Number, bottomright: Number, bottomleft: Number)
function rectangleRadius(topleft, topright, bottomright, bottomleft) {
    switch (arguments.length) {
        case 1:
            topleft = topright = bottomright = bottomleft = arguments[0];
            break;
        case 2:
            topleft = bottomright = arguments[0];
            topright = bottomleft = arguments[1];
            break;
        case 3:
            topleft = arguments[0];
            topright = bottomleft = arguments[1];
            bottomright = arguments[2];
            break;
        case 4:
            topleft = arguments[0];
            topright = arguments[1];
            bottomright = arguments[2];
            bottomleft = arguments[3];
            break;
    }
    var desc1 = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
        desc1.putInteger(stringIDToTypeID("keyOriginType"), 1);
        desc2.putInteger(stringIDToTypeID("unitValueQuadVersion"), 1);
        desc2.putUnitDouble(stringIDToTypeID("topRight"), charIDToTypeID("#Pxl"), topright);
        desc2.putUnitDouble(stringIDToTypeID("topLeft"), charIDToTypeID("#Pxl"), topleft);
        desc2.putUnitDouble(stringIDToTypeID("bottomLeft"), charIDToTypeID("#Pxl"), bottomleft);
        desc2.putUnitDouble(stringIDToTypeID("bottomRight"), charIDToTypeID("#Pxl"), bottomright);
        desc1.putObject(stringIDToTypeID("keyOriginRRectRadii"), stringIDToTypeID("radii"), desc2);
    executeAction(stringIDToTypeID("changePathDetails"), desc1, DialogModes.NO);
}

function saveTextFile(savePath, contents) {
    var tf = new File(savePath);
    if(!Folder(tf.path).exists) {
        Folder(tf.path).create();
    }
    if(tf.exists) {
        tf.remove();
    }
    tf.encoding = "UTF8";
    tf.open("e");
    tf.writeln(contents);
    tf.close();
}
