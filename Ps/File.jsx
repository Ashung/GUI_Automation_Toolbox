
#include "Ps.jsx";

_Ps._File._New = function()  {
    alert(1);
}

_Ps._File._Save_As = {
    _Psd: function() {},
    
    /*
     * @param File targetFile 
     */
    _Png: function(targetFile) {
        var pngSaveOptions = new PNGSaveOptions();
            pngSaveOptions.compression = 9;
            pngSaveOptions.interlaced = false;
        activeDocument.saveAs(targetFile, pngSaveOptions, true, Extension.LOWERCASE);
    },

    _Jpg: function() {},
    _Gif: function() {},
    
    
}

_Ps._File._Save_As_Web = {
    _Png8: function() {},
    
    /*
     * @param File targetFile 
     */
    _Png24: function(targetFile) {
        var png24Options = new ExportOptionsSaveForWeb();
            png24Options.format = SaveDocumentType.PNG;
            png24Options.PNG8 = false;
            png24Options.transparency = true;
            png24Options.interlaced = false;
            png24Options.includeProfile = false;
        activeDocument.exportDocument(targetFile, ExportType.SAVEFORWEB, png24Options);
    },

    _Jpg: function() {},
    _Gif: function() {}
}

