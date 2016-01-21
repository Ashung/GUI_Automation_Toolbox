


var TEMPLATES = {
    "iPhone3" :           { "width" : 320,  "height" : 480,  "ratio" : 1 },
    "iPhone4" :           { "width" : 320,  "height" : 480,  "ratio" : 2 },
    "iPhone5" :           { "width" : 320,  "height" : 568,  "ratio" : 2 },
    "iPhone6" :           { "width" : 375,  "height" : 667,  "ratio" : 3 },
    "iPhone6+" :          { "width" : 414,  "height" : 736,  "ratio" : 3 },
    "iPad" :              { "width" : 768,  "height" : 1024, "ratio" : 1 },
    "iPadRetina" :        { "width" : 768,  "height" : 1024, "ratio" : 2 },
    "iPadPro" :           { "width" : 1,    "height" : 1,    "ratio" : 2 },
    "appleWatch42mm" :    { "width" : 312,  "height" : 390,  "ratio" : 2 },
    "appleWatch38mm" :    { "width" : 272,  "height" : 340,  "ratio" : 2 },
    "androidPhone" :      { "width" : 360,  "height" : 640,  "ratio" : 1 },
    "androidPhone720p" :  { "width" : 360,  "height" : 640,  "ratio" : 2 },
    "androidPhone1080p" : { "width" : 360,  "height" : 640,  "ratio" : 3 },
    "androidPhone2k" :    { "width" : 360,  "height" : 640,  "ratio" : 4 },
    "androidTablet7in" :  { "width" : 600,  "height" : 960,  "ratio" : 2 },
    "androidTablet9in" :  { "width" : 768,  "height" : 1024, "ratio" : 1 },
    "webMobile" :         { "width" : 320,  "height" : 1024, "ratio" : 1 },
    "webTable" :          { "width" : 768,  "height" : 1024, "ratio" : 1 },
    "webDesktop" :        { "width" : 1024, "height" : 1024, "ratio" : 1 }
}

// -> String YYYYMMDD
var DATE = (function(){
    var y = new Date().getFullYear(),
        m = new Date().getMonth() > 8 ? new Date().getMonth() + 1 : "0" + (new Date().getMonth() + 1),
        d = new Date().getDate() > 9 ? new Date().getDate() : "0" + new Date().getDate();
    return "" + y + m + d;
})();

// -> String YYYY-MM-DD
var DATE_FORMAT = (function(){
    var y = new Date().getFullYear(),
        m = new Date().getMonth() > 8 ? new Date().getMonth() + 1 : "0" + (new Date().getMonth() + 1),
        d = new Date().getDate() > 9 ? new Date().getDate() : "0" + new Date().getDate();
    return y + "-" + m + "-" + d;
})();

// -> String HHMMSS
var TIME = (function(){
    var h = new Date().getHours() > 9 ? new Date().getHours() : "0" + new Date().getHours(),
        m = new Date().getMinutes() > 9 ? new Date().getMinutes() : "0" + new Date().getMinutes(),
        s = new Date().getSeconds() > 9 ? new Date().getSeconds() : "0" + new Date().getSeconds();
    return "" + h + m + s;
})();

// -> String HH:MM:SS
var TIME_FORMAT = (function(){
    var h = new Date().getHours() > 9 ? new Date().getHours() : "0" + new Date().getHours(),
        m = new Date().getMinutes() > 9 ? new Date().getMinutes() : "0" + new Date().getMinutes(),
        s = new Date().getSeconds() > 9 ? new Date().getSeconds() : "0" + new Date().getSeconds();
    return h + ":" + m + ":" + s;
})();

// -> String 1441615700807
var TIMESTAMP = new Date().getTime();

// -> String x/xx/Ps.js
var SCRIPTNAME = $.fileName;

// -> String x/xx/
var SCRIPTPATH = $.fileName;

// -> String Macintosh OS 10.10.5/64
var OS = $.os;



// ver DESKTOP;
//
// var USER;
//
// var SYSTEM;
//
// var VERSION

// colorPicker([colorHex: String]) -> SolidColor
// [colorHex: String RRGGBB]
function colorPicker(colorHex) {
    var hex = "000000";
    if(colorHex == undefined) {
        hex = $.colorPicker().toString(16);
    } else {
        var decimal = Number("0x" + colorHex).toString();
        hex = $.colorPicker(decimal).toString(16);
    }
    var l = 6 - hex.length
    for(var i = 0; i < l; i ++) {
        hex = "0" + hex;
    }
    var colorRef = new SolidColor();
        colorRef.rgb.hexValue = hex;
    return colorRef;
}

////////////////////////////////////////////////////////////////////////////////
// File IO
////////////////////////////////////////////////////////////////////////////////

// Graphic file formats
// https://helpx.adobe.com/photoshop/using/supported-file-formats-photoshop-cs6.html
var PHOTOSHOP_READABLE_DOCUMENTS = [
    {
        "ext" : "psd",
        "file" : "Photoshop PSD"
    },
    {
        "ext" : "psb",
        "file" : "Large Document Format PSB"
    },
    {
        "ext" : "bmp",
        "file" : "BMP"
    },
    {
        "ext" : "cin",
        "file" : "Cineon"
    },
    {
        "ext" : "gif",
        "file" : "CompuServe GIF"
    },
    {
        "ext" : "eps",
        "file" : "Photoshop DCS 1.0"
    },
    {
        "ext" : "eps",
        "file" : "Photoshop DCS 2.0"
    },
    {
        "ext" : "dcm",
        "file" : "DICOM"
    },
    {
        "ext" : "eps",
        "file" : "Photoshop EPS"
    },
    {
        "ext" : "iff",
        "file" : "IFF format"
    },
    {
        "ext" : ["jpg", "jpeg", "jpe", "jif", "jfif", "jfi"],
        "file" : "JPEG"
    },
    {
        "ext" : "jpf",
        "file" : "JPEG2000"
    },
    {
        "ext" : "exr",
        "file" : "OpenEXR"
    },
    {
        "ext" : "pcx",
        "file" : "PCX"
    },
    {
        "ext" : "pdf",
        "file" : "Photoshop PDF"
    },
    {
        "ext" : "pxr",
        "file" : "Pixar"
    },
    {
        "ext" : "png",
        "file" : "PNG"
    },
    {
        "ext" : "pbm",
        "file" : "Portable Bit Map"
    },
    {
        "ext" : "raw",
        "file" : "Photoshop Raw"
    },
    {
        "ext" : "sct",
        "file" : "Scitex CT"
    },
    {
        "ext" : "tga",
        "file" : "Targa"
    },
    {
        "ext" : ["tif", "tiff"],
        "file" : "TIFF"
    },
    {
        "ext" : "wbmp",
        "file" : "Wireless Bitmap"
    },
    {
        "ext" : "psd",
        "file" : "Photoshop 2.0 (Mac only)"
    },
    {
        "ext" : ["pict", "pct", "pic"],
        "file" : "PICT (read only)"
    },
    {
        "ext" : ["pict", "pct", "pic"],
        "file" : "PICT Resource (Mac only, can open only)"
    },
    {
        "ext" : ["pic", "hdr", "rgbe", "xyze"],
        "file" : "Radiance"
    }
];

// getFileExtension(file: String|File) -> String
// file: String|File
function getFileExtension(file) {
    var name = "";
    if(typeof(file) == "string") {
        name = file;
    }
    if(file instanceof File) {
        name = file.name;
    }
    var ext = name.substring(name.lastIndexOf(".") + 1, name.length);
    return ext;
}

// isReadable(file: String|File, readableDocList: Array) -> Boolean
// file: File("~/Desktop/img.png") | "~/Desktop/img.png"
// readableDocList: PHOTOSHOP_READABLE_DOCUMENTS
function isReadable(file, readableDocList) {
    var ext = getFileExtension(file);
    if(ext == "")
        return false;
    for(var i = 0; i < readableDocList.length; i++) {
        if (readableDocList[i]["ext"] == ext) {
            return true;
        }
        if (readableDocList[i]["ext"] instanceof Array) {
            for(var j = 0; j < readableDocList[i]["ext"].length; j++) {
                if (readableDocList[i]["ext"][j] == ext) {
                    return true;
                }
            }
        }
    }
    return false;
}

// isPsd(file: String|File) -> Boolean
function isPsd(file) {
    return /.(psd|psb)$/i.test(file);
}

function isPng(file) {
    return /.png$/i.test(file);
}

function isJpg(file) {
    return /.(jpg|jpeg|jpe|jif|jfif|jfi)$/i.test(file);
}

function isGif(file) {
    return /.gif$/i.test(file);
}

function isTiff(file) {
    return /.(tif|tiff)$/i.test(file);
}

// directoryTraversal(dir: String|Folder, fn: function)
function directoryTraversal(dir, fn) {
    var folder;
    if(typeof(dir) == "string") {
        folder = Folder(dir);
    }
    if(folder.exists) {
        var files = folder.getFiles();
        for(var i = 0; i < files.length; i++) {
            if(files[i] instanceof Folder) {
                directoryTraversal(files[i], fn);
            }
            if(files[i] instanceof File) {
                fn(files[i]);
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////// File////////////////////////////////////////////////////////////////////////////////// newDoc(width: Number, height: Number, [name: String], [initialFill: String]) -> Document// width | height: 100px// name: 'icon'// initialFill: transparent(default) | background | white | #RRGGBBfunction newDoc(width, height, name, initialFill) {    var desc1 = new ActionDescriptor();    var desc2 = new ActionDescriptor();    if(name) {        desc2.putString(charIDToTypeID("Nm  "), name);    } else {        desc2.putString(charIDToTypeID("Nm  "), "Untitled-" + DATE + TIME);    }        desc2.putClass(charIDToTypeID("Md  "), charIDToTypeID("RGBM"));        desc2.putUnitDouble(charIDToTypeID("Wdth"), charIDToTypeID("#Rlt"), width);    if(height) {        desc2.putUnitDouble(charIDToTypeID("Hght"), charIDToTypeID("#Rlt"), height);    } else {        desc2.putUnitDouble(charIDToTypeID("Hght"), charIDToTypeID("#Rlt"), width);    }        desc2.putUnitDouble(charIDToTypeID("Rslt"), charIDToTypeID("#Rsl"), 72);        desc2.putDouble(stringIDToTypeID("pixelScaleFactor"), 1);    var idFl = charIDToTypeID("Fl  ");    if(initialFill == 'transparent') {        desc2.putEnumerated(idFl, idFl, charIDToTypeID("Trns"));    } else if(initialFill == 'background') {        desc2.putEnumerated(idFl, idFl, charIDToTypeID("BckC"));    } else if(initialFill == 'white') {        desc2.putEnumerated(idFl, idFl, charIDToTypeID("Wht "));    } else if(/#[0-9A-Fa-f]{6}/.test(initialFill)) {        var r = parseInt('0x' + initialFill.substr(1, 2)),            g = parseInt('0x' + initialFill.substr(3, 2)),            b = parseInt('0x' + initialFill.substr(5, 2));        var desc3 = new ActionDescriptor();            desc3.putDouble(charIDToTypeID("Rd  "), r);            desc3.putDouble(charIDToTypeID("Grn "), g);            desc3.putDouble(charIDToTypeID("Bl  "), b);            desc2.putEnumerated(idFl, idFl, charIDToTypeID("Clr "));            desc2.putObject(charIDToTypeID("FlCl"), charIDToTypeID("RGBC"), desc3);    } else {        desc2.putEnumerated(idFl, idFl, charIDToTypeID("Trns"));    }    desc2.putInteger(charIDToTypeID("Dpth"), 8);    desc2.putString(stringIDToTypeID("profile"), "sRGB IEC61966-2.1");    desc1.putObject(charIDToTypeID("Nw  "), charIDToTypeID("Dcmn"), desc2);    executeAction(charIDToTypeID("Mk  "), desc1, DialogModes.NO);}// open(file: File|String, [smartObject: Boolean]) -> Document// file: File("~/Desktop/img.png") | "~/Desktop/img.png"function open(file) {    if(typeof(file) == "string") {        file = File(file);    }    if(isReadable(file, PHOTOSHOP_READABLE_DOCUMENTS) && file.exists) {        try {            if(isPng(file) || isJpg(file) || isGif(file)) {                app.open(file, true);                activeDocument.changeMode = ChangeMode.RGB;            } else {                app.open(file);            }        } catch (e) {            $.wrtieln(e);        }    }}// openAsSmartObject(file: File|String) -> Document// file: File("~/Desktop/img.png") | "~/Desktop/img.png"function openAsSmartObject(file) {    open(file, true)}function close() {    if(documents.length > 0) {        activeDocument.close(SaveOptions.DONOTSAVECHANGES);    }}function save() {    if(documents.length > 0 && activeDocument.fullname != undefined) {        activeDocument.save();    }}// saveAs(fileType: String, file: File|String)// filetype: psd | png | jpg// file: File("~/Desktop/img.png") | "~/Desktop/img.png"function saveAs(fileType, file) {    if(typeof(file) == "string") {        file = File(file);    }    // Create Folder    if(!file.parent.exists) {        file.parent.create();    }    // File readonly    if(file.exists && file.readonly == true) {        file.readonly = false;    }    if(fileType.toLowerCase() == "psd") {        var psdSaveOptions = new PhotoshopSaveOptions();            psdSaveOptions.alphaChannels = true;            psdSaveOptions.annotations = true;            psdSaveOptions.embedColorProfile = true;            psdSaveOptions.layers = true;            psdSaveOptions.spotColors = true;        activeDocument.saveAs(file, psdSaveOptions, true, Extension.LOWERCASE);    }    if(fileType.toLowerCase() == "png") {        var pngSaveOptions = new PNGSaveOptions();            pngSaveOptions.compression = 9; // [0...9]            pngSaveOptions.interlaced = false;        activeDocument.saveAs(file, pngSaveOptions, true, Extension.LOWERCASE);    }    if(fileType.toLowerCase() == "jpg") {        var jpegSaveOptions = new JPEGSaveOptions();            jpegSaveOptions.jpegSaveOptions = true;            // OPTIMIZEDBASELINE | PROGRESSIVE | STANDARDBASELINE            jpegSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;            // BACKGROUND | BLACK | FOREGROUND | NETSCAPE | NONE | SEMIGRAY | WHITE            jpegSaveOptions.matte = MatteType.WHITE            jpegSaveOptions.quality = 12; // [0..12]            // FormatOptions.PROGRESSIVE            // jpegSaveOptions.scans = 3; // [3..5]        activeDocument.saveAs(file, jpegSaveOptions, true, Extension.LOWERCASE);    }}// exportAs(fileType: String, file: File|String)// filetype: png8 | png24 | jpg | gif// file: File("~/Desktop/img.png") | "~/Desktop/img.png"function exportAs(fileType, file) {    if(typeof(file) == "string") {        file = File(file);    }    // Create Folder    if(!file.parent.exists) {        file.parent.create();    }    // File readonly    if(file.exists && file.readonly == true) {        file.readonly = false;    }    // GIF    if(fileType.toLowerCase() == "gif") {        var gifOptions = new ExportOptionsSaveForWeb();            gifOptions.format = SaveDocumentType.COMPUSERVEGIF;            gifOptions.colors = 256; // [0...256]            gifOptions.dither = Dither.NONE;            gifOptions.transparency = true;            png8Options.matteColor = app.backgroundColor.rgb;            gifOptions.includeProfile = false;    }    // PNG8    if(fileType.toLowerCase() == "png8") {        var png8Options = new ExportOptionsSaveForWeb();            png8Options.format = SaveDocumentType.PNG;            png8Options.PNG8 = true;            png8Options.colors = 256; // [0...256]            png8Options.colorReduction = ColorReductionType.PERCEPTUAL;            png8Options.dither = Dither.NONE;            png8Options.transparency = true;            png8Options.matteColor = app.backgroundColor.rgb;            png8Options.interlaced = false;            png8Options.includeProfile = false;        activeDocument.exportDocument(file, ExportType.SAVEFORWEB, png8Options);    }    // PNG24    if(fileType.toLowerCase() == ("png" || "png24")) {        var png24Options = new ExportOptionsSaveForWeb();            png24Options.format = SaveDocumentType.PNG;            png24Options.PNG8 = false;            png24Options.transparency = true;            png24Options.interlaced = false;            png24Options.includeProfile = false;        activeDocument.exportDocument(file, ExportType.SAVEFORWEB, png24Options);    }    // JPG    if(fileType.toLowerCase() == "jpg") {        var jpgOptions = new ExportOptionsSaveForWeb();            jpgOptions.format = SaveDocumentType.JPEG;            jpgOptions.optimized = true;            jpgOptions.quality = 80; // [0...100]            jpgOptions.matteColor = app.backgroundColor.rgb;            jpgOptions.interlaced = false;            jpgOptions.includeProfile = false;        activeDocument.exportDocument(file, ExportType.SAVEFORWEB, jpgOptions);    }    // PDF    if(fileType.toLowerCase() == "pdf") {        var pdfSaveOptions = new PDFSaveOptions();            pdfSaveOptions.alphaChannels = true;            pdfSaveOptions.annotations = false;            pdfSaveOptions.colorConversion = false;            pdfSaveOptions.convertToEightBit = true;            pdfSaveOptions.description = "";            pdfSaveOptions.downSample = PDFResample.NONE;            pdfSaveOptions.embedColorProfile = false;            pdfSaveOptions.embedFonts = false;            pdfSaveOptions.embedThumbnail = false;            pdfSaveOptions.encoding = PDFEncoding.PDFZIP;            pdfSaveOptions.layers = false;            pdfSaveOptions.optimizeForWeb = true;            pdfSaveOptions.outputCondition = "";            pdfSaveOptions.outputConditionID = "";            pdfSaveOptions.PDFCompatibility = PDFCompatibility.PDF13;            pdfSaveOptions.PDFStandard = PDFStandard.NONE;            pdfSaveOptions.preserveEditing = false;            pdfSaveOptions.profileInclusionPolicy = false;            pdfSaveOptions.registryName = "";            pdfSaveOptions.spotColors = false;            pdfSaveOptions.view = false;    }    // SVG}function revert() {    executeAction(charIDToTypeID('Rvrt'), undefined, DialogModes.NO);}// placeEmbedded(file: File|String)// file: File("~/Desktop/img.png") | "~/Desktop/img.png"function placeEmbedded(file) {    if(typeof(file) == "string") {        file = File(file);    }    if(file.exists) {        var desc1 = new ActionDescriptor();            desc1.putPath(charIDToTypeID("null"), file);            desc1.putEnumerated(charIDToTypeID("FTcs"), charIDToTypeID("QCSt"), charIDToTypeID("Qcsa"));        var desc2 = new ActionDescriptor();            desc2.putUnitDouble(charIDToTypeID("Hrzn"), charIDToTypeID("#Pxl"), 0);            desc2.putUnitDouble(charIDToTypeID("Vrtc"), charIDToTypeID("#Pxl"), 0);            desc1.putObject(charIDToTypeID("Ofst"), charIDToTypeID("Ofst"), desc2);        executeAction(charIDToTypeID("Plc "), desc1, DialogModes.NO);    }}// placeLinked(file: File|String)function placeLinked(file) {    if(typeof(file) == "string") {        file = File(file);    }    if(file.exists) {        var desc1 = new ActionDescriptor();            desc1.putPath(charIDToTypeID("null"), file);            desc1.putBoolean(charIDToTypeID("Lnkd"), true);            desc1.putEnumerated(charIDToTypeID("FTcs"), charIDToTypeID("QCSt"), charIDToTypeID("Qcs0"));            executeAction(charIDToTypeID("Plc "), desc1, DialogModes.NO);    }}// runScript(file: File|String)function runScript(file) {    if(typeof(file) == "string") {        file = File(file);    }    if(file.exists) {        try {            var desc1 = new ActionDescriptor();                desc1.putPath(charIDToTypeID("jsCt"), file);                desc1.putString(charIDToTypeID("jsMs"), "undefined");            executeAction( stringIDToTypeID("AdobeScriptAutomation Scripts"), desc1, DialogModes.NO);        } catch(e) {}    }}////////////////////////////////////////////////////////////////////////////////// Edit////////////////////////////////////////////////////////////////////////////////function pasteInPlace() {    var desc1 = new ActionDescriptor();        desc1.putBoolean(stringIDToTypeID("inPlace"), true);        desc1.putEnumerated(charIDToTypeID("AntA"), charIDToTypeID("Annt"), charIDToTypeID("Anno"));        executeAction(charIDToTypeID("past"), desc1, DialogModes.NO);}////////////////////////////////////////////////////////////////////////////////// Image////////////////////////////////////////////////////////////////////////////////// imageSize(width: Number|UnitValue, height: Number|UnitValue, options: Object)// width|height: 2 | UnitValue(192, 'px')// options.resolution: Number// options.resample: Object//      ResampleMethod.NEARESTNEIGHBOR - Nearest Neighbor (preserve hard edges)//      ResampleMethod.BILINEAR - Bilinear,//      ResampleMethod.BICUBIC - Bicubic (best for smooth gradients)],//      ResampleMethod.BICUBICSMOOTHER - Bicubic Smoother (best for enlargement)//      ResampleMethod.BICUBICSHARPER - Bicubic Sharper (best for reduction)//      ResampleMethod.BICUBICAUTOMATIC - Bicubic Automatic// options.scaleStyle: Boolean//// DEFAULT OPTIONS// options: {//              "resolution" : 72,//              "resample" : ResampleMethod.BICUBICAUTOMATIC,//              "scaleStyle" : true//          }//function imageSize(width, height, options) {    var scale = 1;    var desc1 = new ActionDescriptor();    if(height == undefined) {        height = width;    }    if(typeof(width) == "number" && typeof(height) == "number") {        height = width;        scale = width;        desc1.putUnitDouble(charIDToTypeID('Wdth'), charIDToTypeID('#Prc'), width * 100);        desc1.putUnitDouble(charIDToTypeID('Hght'), charIDToTypeID('#Prc'), height * 100);    }    if(scale instanceof UnitValue) {        scale = width.as("px") / activeDocument.width.as("px");        desc1.putUnitDouble(charIDToTypeID("Wdth"), charIDToTypeID("#Pxl"), width.as("px"));        desc1.putUnitDouble(charIDToTypeID("Hght"), charIDToTypeID("#Pxl"), height.as("px"));    }    if(options.resolution == undefined) {        options.resolution = 72    }    if(options.resample == undefined) {        options.resample = ResampleMethod.BICUBICAUTOMATIC;    }    if(options.scaleStyle == undefined) {        options.scaleStyle = true    }    var idResample = stringIDToTypeID("automaticInterpolation");    switch(options.resample) {        case ResampleMethod.BICUBICSMOOTHER:            idResample = stringIDToTypeID("bicubicSmoother");            break;        case ResampleMethod.BICUBICSHARPER:            idResample = stringIDToTypeID("bicubicSharper");            break;        case ResampleMethod.BICUBIC:            idResample = charIDToTypeID("Bcbc");            break;        case ResampleMethod.BILINEAR:            idResample = charIDToTypeID("Blnr");            break;        case ResampleMethod.NEARESTNEIGHBOR:            idResample = charIDToTypeID("Nrst");            break;        default:            idResample = stringIDToTypeID("automaticInterpolation");    }    // Scale style    if(options.scaleStyle === false) {        desc1.putBoolean(stringIDToTypeID("scaleStyles"), false);    } else {        desc1.putBoolean(stringIDToTypeID("scaleStyles"), true);    }    desc1.putBoolean(charIDToTypeID("CnsP"), true);    desc1.putEnumerated(charIDToTypeID("Intr"), charIDToTypeID("Intp"), idResample);    executeAction(stringIDToTypeID('imageSize'), desc1, DialogModes.NO);    // Change resolution    if(options.resolution != undefined) {        activeDocument.resizeImage(width, height, options.resolution, options.resample);    }    // Shape layer feather    if(typeof(traversalLayes) === "function") {        traversalLayes(app.activeDocument, function(activeLayer) {            if(activeLayer.kind == LayerKind.SOLIDFILL || activeLayer.kind == LayerKind.GRADIENTFILL || activeLayer.kind == LayerKind.PATTERNFILL) {                if(activeLayer.vectorMaskFeather != 0) {                    // Feather: 0 - 1000                    var feather = activeLayer.vectorMaskFeather * scale;                    activeLayer.vectorMaskFeather = feather > 1000 ? 1000 : feather;                }            }        });    }}////////////////////////////////////////////////////////////////////////////////// Layer////////////////////////////////////////////////////////////////////////////////// TODOfunction newArtboard() {    var idMk = charIDToTypeID( "Mk  " );    var desc948 = new ActionDescriptor();    var idnull = charIDToTypeID( "null" );        var ref459 = new ActionReference();        var idartboardSection = stringIDToTypeID( "artboardSection" );        ref459.putClass( idartboardSection );    desc948.putReference( idnull, ref459 );    var idartboardRect = stringIDToTypeID( "artboardRect" );        var desc949 = new ActionDescriptor();        var idTop = charIDToTypeID( "Top " );        desc949.putDouble( idTop, -260.000000 );        var idLeft = charIDToTypeID( "Left" );        desc949.putDouble( idLeft, 1640.000000 );        var idBtom = charIDToTypeID( "Btom" );        desc949.putDouble( idBtom, -212.000000 );        var idRght = charIDToTypeID( "Rght" );        desc949.putDouble( idRght, 1688.000000 );    var idclassFloatRect = stringIDToTypeID( "classFloatRect" );    desc948.putObject( idartboardRect, idclassFloatRect, desc949 );executeAction( idMk, desc948, DialogModes.NO );//var idMk = charIDToTypeID( "Mk  " );    var desc1042 = new ActionDescriptor();    var idnull = charIDToTypeID( "null" );        var ref517 = new ActionReference();        var idartboardSection = stringIDToTypeID( "artboardSection" );        ref517.putClass( idartboardSection );    desc1042.putReference( idnull, ref517 );    var idartboardRect = stringIDToTypeID( "artboardRect" );        var desc1043 = new ActionDescriptor();        var idTop = charIDToTypeID( "Top " );        desc1043.putDouble( idTop, 96.000000 );        var idLeft = charIDToTypeID( "Left" );        desc1043.putDouble( idLeft, 1831.000000 );        var idBtom = charIDToTypeID( "Btom" );        desc1043.putDouble( idBtom, 144.000000 );        var idRght = charIDToTypeID( "Rght" );        desc1043.putDouble( idRght, 1879.000000 );    var idclassFloatRect = stringIDToTypeID( "classFloatRect" );    desc1042.putObject( idartboardRect, idclassFloatRect, desc1043 );executeAction( idMk, desc1042, DialogModes.NO );//var idMk = charIDToTypeID( "Mk  " );    var desc1048 = new ActionDescriptor();    var idnull = charIDToTypeID( "null" );        var ref519 = new ActionReference();        var idartboardSection = stringIDToTypeID( "artboardSection" );        ref519.putClass( idartboardSection );    desc1048.putReference( idnull, ref519 );    var idUsng = charIDToTypeID( "Usng" );        var desc1049 = new ActionDescriptor();        var idNm = charIDToTypeID( "Nm  " );        desc1049.putString( idNm, """XXX""" );    var idartboardSection = stringIDToTypeID( "artboardSection" );    desc1048.putObject( idUsng, idartboardSection, desc1049 );    var idartboardRect = stringIDToTypeID( "artboardRect" );        var desc1050 = new ActionDescriptor();        var idTop = charIDToTypeID( "Top " );        desc1050.putDouble( idTop, 96.000000 );        var idLeft = charIDToTypeID( "Left" );        desc1050.putDouble( idLeft, 2000.000000 );        var idBtom = charIDToTypeID( "Btom" );        desc1050.putDouble( idBtom, 196.000000 );        var idRght = charIDToTypeID( "Rght" );        desc1050.putDouble( idRght, 2100.000000 );    var idclassFloatRect = stringIDToTypeID( "classFloatRect" );    desc1048.putObject( idartboardRect, idclassFloatRect, desc1050 );executeAction( idMk, desc1048, DialogModes.NO );}function newArtboardFromLayer() {    var idMk = charIDToTypeID( "Mk  " );    var desc1016 = new ActionDescriptor();    var idnull = charIDToTypeID( "null" );        var ref497 = new ActionReference();        var idartboardSection = stringIDToTypeID( "artboardSection" );        ref497.putClass( idartboardSection );    desc1016.putReference( idnull, ref497 );    var idFrom = charIDToTypeID( "From" );        var ref498 = new ActionReference();        var idLyr = charIDToTypeID( "Lyr " );        var idOrdn = charIDToTypeID( "Ordn" );        var idTrgt = charIDToTypeID( "Trgt" );        ref498.putEnumerated( idLyr, idOrdn, idTrgt );    desc1016.putReference( idFrom, ref498 );    var idlayerSectionStart = stringIDToTypeID( "layerSectionStart" );    desc1016.putInteger( idlayerSectionStart, 23 );    var idlayerSectionEnd = stringIDToTypeID( "layerSectionEnd" );    desc1016.putInteger( idlayerSectionEnd, 24 );    var idNm = charIDToTypeID( "Nm  " );    desc1016.putString( idNm, """Artboard 5""" );executeAction( idMk, desc1016, DialogModes.NO );}function newArtboardFromGroup() {    var desc1 = new ActionDescriptor();    var ref1 = new ActionReference();        ref506.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));        desc1.putReference(charIDToTypeID("null"), ref1);        executeAction(stringIDToTypeID("artboardFromLayerGroupEvent"), desc1, DialogModes.NO);}function newLayerViaCopy() {    executeAction(stringIDToTypeID('copyToLayer'), undefined, DialogModes.NO);}function newLayerViaCut() {    try {        executeAction(stringIDToTypeID('cutToLayer'), undefined, DialogModes.NO);    } catch(e) {}}function bringToFront() {    var desc1 = new ActionDescriptor();    var ref1 = new ActionReference();    var ref2 = new ActionReference();        ref1.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));        desc1.putReference(charIDToTypeID("null"), ref1);        ref2.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Frnt"));        desc1.putReference(charIDToTypeID("T   "), ref2);        executeAction(charIDToTypeID("move"), desc1, DialogModes.NO);}function sendToBack() {    var desc1 = new ActionDescriptor();    var ref1 = new ActionReference();    var ref2 = new ActionReference();        ref1.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));        desc1.putReference(charIDToTypeID("null"), ref1);        ref2.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Back"));        desc1.putReference(charIDToTypeID("T   "), ref2);        executeAction(charIDToTypeID("move"), desc1, DialogModes.NO);}function bringForward() {    var desc1 = new ActionDescriptor();    var ref1 = new ActionReference();    var ref2 = new ActionReference();        ref1.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));        desc1.putReference(charIDToTypeID("null"), ref1);        ref2.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Nxt "));        desc1.putReference(charIDToTypeID("T   "), ref2);        executeAction(charIDToTypeID("move"), desc1, DialogModes.NO);}function sendBackward() {    var desc1 = new ActionDescriptor();    var ref1 = new ActionReference();    var ref2 = new ActionReference();        ref1.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));        desc1.putReference(charIDToTypeID("null"), ref1);        ref2.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Prvs"));        desc1.putReference(charIDToTypeID("T   "), ref2);        executeAction(charIDToTypeID("move"), desc1, DialogModes.NO);}function reverse() {    var desc1 = new ActionDescriptor();    var ref1 = new ActionReference();        ref1.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));        desc1.putReference(charIDToTypeID("null"), ref1 );        executeAction(charIDToTypeID("Rvrs"), desc1, DialogModes.NO);}////////////////////////////////////////////////////////////////////////////////// Select////////////////////////////////////////////////////////////////////////////////// TODOfunction selectAll() {}function selectDeselect() {}function selectInverse() {}function selectAllLayers() {    var desc = new ActionDescriptor();    var ref = new ActionReference();        ref.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));        desc.putReference(charIDToTypeID('null'), ref);        executeAction(stringIDToTypeID('selectAllLayers'), desc, DialogModes.NO);}function selectDeselectLayers() {}// selectionFromActiveLayer() => Selection// hold down "cmd/ctrl" and click layer thumb, or use Select - Load Selection...function selectionFromActiveLayer() {    var desc1 = new ActionDescriptor();    var ref1 = new ActionReference();    var ref2 = new ActionReference();        ref1.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));        desc1.putReference(charIDToTypeID("null"), ref1);        if(activeDocument.activeLayer.kind == LayerKind.SOLIDFILL             || activeDocument.activeLayer.kind == LayerKind.GRADIENTFILL            || activeDocument.activeLayer.kind == LayerKind.PATTERNFILL)) {            // shape layer            ref2.putEnumerated(charIDToTypeID("Path"), charIDToTypeID("Path"), stringIDToTypeID("vectorMask"));        } else {            ref2.putEnumerated(charIDToTypeID("Chnl"), charIDToTypeID("Chnl"), charIDToTypeID("Trsp"));        }        desc1.putReference(charIDToTypeID("T   "), ref2);        executeAction(charIDToTypeID("setd"), desc1, DialogModes.NO);}function todo() {}

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
