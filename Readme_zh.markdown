# Ps Automation Kits

Photoshop script for smart designer.

###Android Design Scripts

####Android_App_Icons_Template.jsx & Android_App_Icons_Template_Export.jsx
用于自动生成Android App图标模板和导出图标.

1, 运行Android_App_Icons_Template.jsx生成Android App图标模板.
2, 在图标设计完成后, 运行Android_App_Icons_Template_Export.jsx, 将自动导出图标到'psd_file_name/res/'目录下(文件未保存将导出到桌面).

---

####Android_Assets_Export.jsx
用于资源导出Android各种DPI资源PNG及.9.PNG.

1. 将要导出的PSD图层复制到新的文档中并调整画布大小.
2. 运行脚本.
3. 选择PSD文档相应的DPI, 推荐使用MDPI或XHDPI.
4. 选择保存目录, 默认保存在桌面的res目录下.
5. 输入文件名, 不需要包括后缀(.png/.9.png). 建议文件名使用'_'替换空格.
6. 如果图片是9Patch图片, 需要勾选此项. 必须Patch区黑线长, 黑线间距离, 黑线与边沿距离为偶数dp数值. 例如MDPI的PSD数值为2n PX(偶数), XHDPI的PSD数值为4n PX.
7. 勾选需要导出的DPI资源. 点击OK.

---

####Android_Export_Layers_to_PNG.jsx
用于将图层/图层组导出成各种DPI的PNG图片.

1. 选择"导出所有图层/图层组"或者"导出选中图层组的子图层/图层组"
2. 选择导出图片的文件名类型. 部分文件名类型需要填写附加文字.
3. 选择保存目录, 默认保存在桌面的res目录下.
4. 选择PSD文档相应的DPI.
5. 勾选需要导出的DPI资源.

---

####Android_Layer_Namer_For_Adobe_Generator.jsx
Photoshop CC 14.1+下Generator图层命名脚本. 将图层自动命名为`x_mdpi.png, 150% x_hdpi.png, 200% x_xhdpi.png`. 然后使用File - Generate自动生成图片.

**注意**: Photoshop CC 14.2下的Generator不支持类似33.3%的缩放比例, 此脚本只支持从MDPI或XHDPI的PSD生成资源. 生成资源后使用 Android_Assets_Package_For_Adobe_Generator.jsx 将资源图片自动分类到MDPI/HDPI等目录下.

1. 选择需要重命名的图层或图层组.
2. 运行脚本.
3. 选择PSD文档相应的DPI, Photoshop CC 14.2下Generator仅支持MDPI或XHDPI.
4. 输入文件名, 包括后缀(.png/.jpg/.gif, 不支持.9.png). 建议文件名使用'_'替换空格.
5. 勾选需要导出的DPI资源. 点击OK.

####Android_Assets_Package_For_Adobe_Generator.jsx
自动将Generator生成的xxx-assets目录下的资源打包到res/drawable-?dpi目录下.

**注意**: 如果无assets目录或目录下无文件, 脚本将不运行. 具体信息查看ExtendScript Toolkit的Console窗口.

1. 运行脚本.
2. 选择"不替换文件"或"用户选择". 选择"用户选择"后文件列表将列出所有文件, 选中的文件将会被打包至res目录并替换已有文件.




