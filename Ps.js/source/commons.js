


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
