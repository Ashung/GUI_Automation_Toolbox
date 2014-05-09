/**
* @@@BUILDINFO@@@ Android_Asset_Package_For_Adobe_Generator.jsx !Version! Fri May 09 2014 23:39:26 GMT+0800
*/
/*
 * Android Asset Package For Adobe Generator
 * 
 * First use "Android_Layer_Namer_For_Adobe_Generator.jsx" to generate assets, 
 * then use this script to move asset to right folders and change the file name in rightway.
 *
 * Author: Ashung Hung
 *
 */

#target 'photoshop';

var inputs = File.openDialog('X', 'Images:*.png; *.gif; *.jpg', true);

if(inputs != null) {
    
    var dir = inputs[0].path;
    
    if(!Folder(dir + '/drawable-mdpi').exists)
        Folder(dir + '/drawable-mdpi').create();
    if(!Folder(dir + '/drawable-hdpi').exists)
        Folder(dir + '/drawable-hdpi').create();
    if(!Folder(dir + '/drawable-xhdpi').exists)
        Folder(dir + '/drawable-xhdpi').create();
    if(!Folder(dir + '/drawable-xxhdpi').exists)
        Folder(dir + '/drawable-xxhdpi').create();
    if(!Folder(dir + '/drawable-xxxhdpi').exists)
        Folder(dir + '/drawable-xxxhdpi').create();
    
    for(var i = 0; i < inputs.length; i++) {
        
        if(/^mdpi-/i.test(inputs[i].name)) {
            inputs[i].copy(dir + '/drawable-mdpi/' + inputs[i].name.replace(/^mdpi-/i, ''));
            inputs[i].remove();
        }
    
        if(/^hdpi-/i.test(inputs[i].name)) {
            inputs[i].copy(dir + '/drawable-hdpi/' + inputs[i].name.replace(/^hdpi-/i, ''));
            inputs[i].remove();
        }
        
        if(/^xhdpi-/i.test(inputs[i].name)) {
            inputs[i].copy(dir + '/drawable-xhdpi/' + inputs[i].name.replace(/^xhdpi-/i, ''));
            inputs[i].remove();
        }
    
        if(/^xxhdpi-/i.test(inputs[i].name)) {
            inputs[i].copy(dir + '/drawable-xxhdpi/' + inputs[i].name.replace(/^xxhdpi-/i, ''));
            inputs[i].remove();
        }
    
        if(/^xxxhdpi-/i.test(inputs[i].name)) {
            inputs[i].copy(dir + '/drawable-xxxhdpi/' + inputs[i].name.replace(/^xxxhdpi-/i, ''));
            inputs[i].remove();
        }
    
    }

}

