



//var imgs = Folder.selectDialog('Select Image folder.').getFiles('*.png');
var imgs = Folder('/e/Works/ThemeIcons/5.7/icon/drawable-mdpi').getFiles('*.png');

var txt = 'var icons=[';

for(var i = 0; i < imgs.length; i ++) {
    
    // ![](drawable-mdpi/com.yulong.kuchuan.png) com.yulong.kuchuan.png
    //var line = '\r|![](' + imgs[i].parent.name + '/' + imgs[i].name + ')|`' +  imgs[i].name + '`| |';
    
    var line = (i==0) ? '\r["' + imgs[i].name + '",""]' : ',\r["' + imgs[i].name + '",""]';

    txt += line;
}

    txt += '\r];';

saveTextFile('/e/Works/ThemeIcons/5.7/icon/icons.js', txt);



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