#target photoshop
//
// 11111111111111111111111111111111111.jsx
//

//
// Generated Tue Nov 18 2014 20:00:59 GMT+0800
//

cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };

//
//==================== Action 1 ==============
//
function Action1() {
  // Set
  function step1(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('Path'), cTID('WrPt'));
    desc1.putReference(cTID('null'), ref1);
    var list1 = new ActionList();
    var desc2 = new ActionDescriptor();
    desc2.putEnumerated(sTID("shapeOperation"), sTID("shapeOperation"), cTID('Add '));
    desc2.putBoolean(sTID("windingFill"), true);
    var list2 = new ActionList();
    var desc3 = new ActionDescriptor();
    var list3 = new ActionList();
    var desc4 = new ActionDescriptor();
    var desc5 = new ActionDescriptor();
    desc5.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 41.27396);
    desc5.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), -1.13686839415682e-14);
    desc4.putObject(cTID('Anch'), cTID('Pnt '), desc5);
    list3.putObject(cTID('Pthp'), desc4);
    var desc6 = new ActionDescriptor();
    var desc7 = new ActionDescriptor();
    desc7.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 78.72604);
    desc7.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), -1.13686839415682e-14);
    desc6.putObject(cTID('Anch'), cTID('Pnt '), desc7);
    var desc8 = new ActionDescriptor();
    desc8.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 90.61068);
    desc8.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), -1.13686839415682e-14);
    desc6.putObject(cTID('Fwd '), cTID('Pnt '), desc8);
    var desc9 = new ActionDescriptor();
    desc9.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 78.72604);
    desc9.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), -1.13686839415682e-14);
    desc6.putObject(cTID('Bwd '), cTID('Pnt '), desc9);
    desc6.putBoolean(cTID('Smoo'), false);
    list3.putObject(cTID('Pthp'), desc6);
    var desc10 = new ActionDescriptor();
    var desc11 = new ActionDescriptor();
    desc11.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 102.94968);
    desc11.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 2.02260003013909);
    desc10.putObject(cTID('Anch'), cTID('Pnt '), desc11);
    var desc12 = new ActionDescriptor();
    desc12.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 109.93376);
    desc12.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 4.56460006801782);
    desc10.putObject(cTID('Fwd '), cTID('Pnt '), desc12);
    var desc13 = new ActionDescriptor();
    desc13.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 96.5530000000001);
    desc13.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), -1.13686839415682e-14);
    desc10.putObject(cTID('Bwd '), cTID('Pnt '), desc13);
    desc10.putBoolean(cTID('Smoo'), false);
    list3.putObject(cTID('Pthp'), desc10);
    var desc14 = new ActionDescriptor();
    var desc15 = new ActionDescriptor();
    desc15.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 117.9774);
    desc15.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 17.0503202540696);
    desc14.putObject(cTID('Anch'), cTID('Pnt '), desc15);
    var desc16 = new ActionDescriptor();
    desc16.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 120);
    desc16.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 23.4470003493875);
    desc14.putObject(cTID('Fwd '), cTID('Pnt '), desc16);
    var desc17 = new ActionDescriptor();
    desc17.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 115.4354);
    desc17.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 10.0662401499986);
    desc14.putObject(cTID('Bwd '), cTID('Pnt '), desc17);
    desc14.putBoolean(cTID('Smoo'), false);
    list3.putObject(cTID('Pthp'), desc14);
    var desc18 = new ActionDescriptor();
    var desc19 = new ActionDescriptor();
    desc19.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 120);
    desc19.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 41.2739606150299);
    desc18.putObject(cTID('Anch'), cTID('Pnt '), desc19);
    var desc20 = new ActionDescriptor();
    desc20.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 120);
    desc20.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 41.2739606150299);
    desc18.putObject(cTID('Fwd '), cTID('Pnt '), desc20);
    var desc21 = new ActionDescriptor();
    desc21.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 120);
    desc21.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 29.389320437935);
    desc18.putObject(cTID('Bwd '), cTID('Pnt '), desc21);
    desc18.putBoolean(cTID('Smoo'), false);
    list3.putObject(cTID('Pthp'), desc18);
    var desc22 = new ActionDescriptor();
    var desc23 = new ActionDescriptor();
    desc23.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 120);
    desc23.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 78.7260411731094);
    desc22.putObject(cTID('Anch'), cTID('Pnt '), desc23);
    var desc24 = new ActionDescriptor();
    desc24.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 120);
    desc24.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 90.6106813502043);
    desc22.putObject(cTID('Fwd '), cTID('Pnt '), desc24);
    var desc25 = new ActionDescriptor();
    desc25.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 120);
    desc25.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 78.7260411731094);
    desc22.putObject(cTID('Bwd '), cTID('Pnt '), desc25);
    desc22.putBoolean(cTID('Smoo'), false);
    list3.putObject(cTID('Pthp'), desc22);
    var desc26 = new ActionDescriptor();
    var desc27 = new ActionDescriptor();
    desc27.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 117.9774);
    desc27.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 102.94968153407);
    desc26.putObject(cTID('Anch'), cTID('Pnt '), desc27);
    var desc28 = new ActionDescriptor();
    desc28.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 115.4354);
    desc28.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 109.933761638141);
    desc26.putObject(cTID('Fwd '), cTID('Pnt '), desc28);
    var desc29 = new ActionDescriptor();
    desc29.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 120);
    desc29.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 96.5530014387518);
    desc26.putObject(cTID('Bwd '), cTID('Pnt '), desc29);
    desc26.putBoolean(cTID('Smoo'), false);
    list3.putObject(cTID('Pthp'), desc26);
    var desc30 = new ActionDescriptor();
    var desc31 = new ActionDescriptor();
    desc31.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 102.94968);
    desc31.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 117.977401758);
    desc30.putObject(cTID('Anch'), cTID('Pnt '), desc31);
    var desc32 = new ActionDescriptor();
    desc32.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 96.5530000000001);
    desc32.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 120.000001788139);
    desc30.putObject(cTID('Fwd '), cTID('Pnt '), desc32);
    var desc33 = new ActionDescriptor();
    desc33.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 109.93376);
    desc33.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 115.435401720122);
    desc30.putObject(cTID('Bwd '), cTID('Pnt '), desc33);
    desc30.putBoolean(cTID('Smoo'), false);
    list3.putObject(cTID('Pthp'), desc30);
    var desc34 = new ActionDescriptor();
    var desc35 = new ActionDescriptor();
    desc35.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 78.72604);
    desc35.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 120.000001788139);
    desc34.putObject(cTID('Anch'), cTID('Pnt '), desc35);
    var desc36 = new ActionDescriptor();
    desc36.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 78.72604);
    desc36.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 120.000001788139);
    desc34.putObject(cTID('Fwd '), cTID('Pnt '), desc36);
    var desc37 = new ActionDescriptor();
    desc37.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 90.61068);
    desc37.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 120.000001788139);
    desc34.putObject(cTID('Bwd '), cTID('Pnt '), desc37);
    desc34.putBoolean(cTID('Smoo'), false);
    list3.putObject(cTID('Pthp'), desc34);
    var desc38 = new ActionDescriptor();
    var desc39 = new ActionDescriptor();
    desc39.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 41.27396);
    desc39.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 120.000001788139);
    desc38.putObject(cTID('Anch'), cTID('Pnt '), desc39);
    var desc40 = new ActionDescriptor();
    desc40.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 29.38932);
    desc40.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 120.000001788139);
    desc38.putObject(cTID('Fwd '), cTID('Pnt '), desc40);
    var desc41 = new ActionDescriptor();
    desc41.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 41.27396);
    desc41.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 120.000001788139);
    desc38.putObject(cTID('Bwd '), cTID('Pnt '), desc41);
    desc38.putBoolean(cTID('Smoo'), false);
    list3.putObject(cTID('Pthp'), desc38);
    var desc42 = new ActionDescriptor();
    var desc43 = new ActionDescriptor();
    desc43.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 17.05032);
    desc43.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 117.977401758);
    desc42.putObject(cTID('Anch'), cTID('Pnt '), desc43);
    var desc44 = new ActionDescriptor();
    desc44.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 10.06624);
    desc44.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 115.435401720122);
    desc42.putObject(cTID('Fwd '), cTID('Pnt '), desc44);
    var desc45 = new ActionDescriptor();
    desc45.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 23.447);
    desc45.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 120.000001788139);
    desc42.putObject(cTID('Bwd '), cTID('Pnt '), desc45);
    desc42.putBoolean(cTID('Smoo'), false);
    list3.putObject(cTID('Pthp'), desc42);
    var desc46 = new ActionDescriptor();
    var desc47 = new ActionDescriptor();
    desc47.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 2.02260000000001);
    desc47.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 102.94968153407);
    desc46.putObject(cTID('Anch'), cTID('Pnt '), desc47);
    var desc48 = new ActionDescriptor();
    desc48.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
    desc48.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 96.5530014387518);
    desc46.putObject(cTID('Fwd '), cTID('Pnt '), desc48);
    var desc49 = new ActionDescriptor();
    desc49.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 4.56459999999997);
    desc49.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 109.933761638141);
    desc46.putObject(cTID('Bwd '), cTID('Pnt '), desc49);
    desc46.putBoolean(cTID('Smoo'), false);
    list3.putObject(cTID('Pthp'), desc46);
    var desc50 = new ActionDescriptor();
    var desc51 = new ActionDescriptor();
    desc51.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
    desc51.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 78.7260411731094);
    desc50.putObject(cTID('Anch'), cTID('Pnt '), desc51);
    var desc52 = new ActionDescriptor();
    desc52.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
    desc52.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 78.7260411731094);
    desc50.putObject(cTID('Fwd '), cTID('Pnt '), desc52);
    var desc53 = new ActionDescriptor();
    desc53.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
    desc53.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 90.6106813502043);
    desc50.putObject(cTID('Bwd '), cTID('Pnt '), desc53);
    desc50.putBoolean(cTID('Smoo'), false);
    list3.putObject(cTID('Pthp'), desc50);
    var desc54 = new ActionDescriptor();
    var desc55 = new ActionDescriptor();
    desc55.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
    desc55.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 41.2739606150299);
    desc54.putObject(cTID('Anch'), cTID('Pnt '), desc55);
    var desc56 = new ActionDescriptor();
    desc56.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
    desc56.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 29.389320437935);
    desc54.putObject(cTID('Fwd '), cTID('Pnt '), desc56);
    var desc57 = new ActionDescriptor();
    desc57.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
    desc57.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 41.2739606150299);
    desc54.putObject(cTID('Bwd '), cTID('Pnt '), desc57);
    desc54.putBoolean(cTID('Smoo'), false);
    list3.putObject(cTID('Pthp'), desc54);
    var desc58 = new ActionDescriptor();
    var desc59 = new ActionDescriptor();
    desc59.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 2.02260000000001);
    desc59.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 17.0503202540696);
    desc58.putObject(cTID('Anch'), cTID('Pnt '), desc59);
    var desc60 = new ActionDescriptor();
    desc60.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 4.56459999999997);
    desc60.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 10.0662401499986);
    desc58.putObject(cTID('Fwd '), cTID('Pnt '), desc60);
    var desc61 = new ActionDescriptor();
    desc61.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
    desc61.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 23.4470003493875);
    desc58.putObject(cTID('Bwd '), cTID('Pnt '), desc61);
    desc58.putBoolean(cTID('Smoo'), false);
    list3.putObject(cTID('Pthp'), desc58);
    var desc62 = new ActionDescriptor();
    var desc63 = new ActionDescriptor();
    desc63.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 17.05032);
    desc63.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 2.02260003013909);
    desc62.putObject(cTID('Anch'), cTID('Pnt '), desc63);
    var desc64 = new ActionDescriptor();
    desc64.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 23.447);
    desc64.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), -1.13686839415682e-14);
    desc62.putObject(cTID('Fwd '), cTID('Pnt '), desc64);
    var desc65 = new ActionDescriptor();
    desc65.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 10.06624);
    desc65.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 4.56460006801782);
    desc62.putObject(cTID('Bwd '), cTID('Pnt '), desc65);
    desc62.putBoolean(cTID('Smoo'), false);
    list3.putObject(cTID('Pthp'), desc62);
    var desc66 = new ActionDescriptor();
    var desc67 = new ActionDescriptor();
    desc67.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 41.27396);
    desc67.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), -1.13686839415682e-14);
    desc66.putObject(cTID('Anch'), cTID('Pnt '), desc67);
    var desc68 = new ActionDescriptor();
    desc68.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 41.27396);
    desc68.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), -1.13686839415682e-14);
    desc66.putObject(cTID('Fwd '), cTID('Pnt '), desc68);
    var desc69 = new ActionDescriptor();
    desc69.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 29.38932);
    desc69.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), -1.13686839415682e-14);
    desc66.putObject(cTID('Bwd '), cTID('Pnt '), desc69);
    desc66.putBoolean(cTID('Smoo'), false);
    list3.putObject(cTID('Pthp'), desc66);
    var desc70 = new ActionDescriptor();
    var desc71 = new ActionDescriptor();
    desc71.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 41.27396);
    desc71.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), -1.13686839415682e-14);
    desc70.putObject(cTID('Anch'), cTID('Pnt '), desc71);
    list3.putObject(cTID('Pthp'), desc70);
    desc3.putList(cTID('Pts '), list3);
    list2.putObject(cTID('Sbpl'), desc3);
    desc2.putList(cTID('SbpL'), list2);
    list1.putObject(cTID('PaCm'), desc2);
    desc1.putList(cTID('T   '), list1);
    executeAction(cTID('setd'), desc1, dialogMode);
  };

  // Transform
  function step2(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Path'), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    desc1.putEnumerated(cTID('FTcs'), cTID('QCSt'), sTID("QCSCorner0"));
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
    desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 0);
    desc1.putObject(cTID('Ofst'), cTID('Ofst'), desc2);
    desc1.putUnitDouble(cTID('Wdth'), cTID('#Prc'), 166.67);
    desc1.putUnitDouble(cTID('Hght'), cTID('#Prc'), 166.670000553131);
    desc1.putBoolean(cTID('Lnkd'), true);
    executeAction(cTID('Trnf'), desc1, dialogMode);
  };

  // Transform
  function step3(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Path'), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    desc1.putEnumerated(cTID('FTcs'), cTID('QCSt'), sTID("QCSCorner0"));
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
    desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 0);
    desc1.putObject(cTID('Ofst'), cTID('Ofst'), desc2);
    desc1.putUnitDouble(cTID('Wdth'), cTID('#Prc'), 50);
    desc1.putUnitDouble(cTID('Hght'), cTID('#Prc'), 50);
    desc1.putBoolean(cTID('Lnkd'), true);
    executeAction(cTID('Trnf'), desc1, dialogMode);
  };

  step1();      // Set
  step2();      // Transform
  step3();      // Transform
};



//=========================================
//                    Action1.main
//=========================================
//

Action1.main = function () {
  Action1();
};

Action1.main();

// EOF

"11111111111111111111111111111111111.jsx"
// EOF
