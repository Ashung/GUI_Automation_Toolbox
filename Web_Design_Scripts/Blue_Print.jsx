/*
    BLUEPRINT
    The Photoshop script for create blueprint background.
    Author: Ashung.hung@gmail.com
    Web: https://github.com/Ashung/Photoshop_Actions_Package_for_Designers/Scripts
    Published: 2011-12-31
    LastModify: 2012-07-06
*/

function bluePrint(minimumCell, backgroundColor) {
    preferences.rulerUnits = Units.PIXELS;
    doc = app.activeDocument;
    docWidth = doc.width.as('px');
    docHeight = doc.height.as('px');
    
    doc.artLayers.add();
    doc.activeLayer.name = 'bluePrint(' + minimumCell + ', "' + backgroundColor + '"); //bluePrint.jsx create by Ashung Hung, https://github.com/Ashung/Photoshop_Actions_Package_for_Designers/Scripts';
    
    bgColor = new SolidColor();
    bgColor.rgb.hexValue = backgroundColor; 
    doc.selection.select([[0,0],[0,docHeight],[docWidth,docHeight],[docWidth,0]]);
    doc.selection.fill(bgColor);
    
    lineColor = new SolidColor();
    lineColor.rgb.hexValue = 'ffffff';
    
    for(x = 0, i = 0; x < docWidth; x += minimumCell, i++) {
        doc.selection.select([[x,0],[x,docHeight],[x+1,docHeight],[x+1,0]]);
        fillLineColor(lineColor, i);
    } 
    for(y = 0, i = 0; y < docHeight; y += minimumCell, i++) {
        doc.selection.select([[0,y],[docWidth,y],[docWidth,y+1],[0,y+1]]);
        fillLineColor(lineColor, i);
    }
    doc.selection.deselect();
}

function fillLineColor(color, index) {
    if((index/5)%2 == 0) {
        app.activeDocument.selection.fill(color, ColorBlendMode.NORMAL, 35);
    } else if ((index/5)%2 == 1) {
        app.activeDocument.selection.fill(color, ColorBlendMode.NORMAL, 20);
    } else {
        app.activeDocument.selection.fill(color, ColorBlendMode.NORMAL, 10);
    }
}

bluePrint(parseInt(prompt('Insert the space of lines, e.g. 20, 10, 5', 10)), prompt('Insert the backgroud color, e.g. "3385d1", ', '3385d1'));
