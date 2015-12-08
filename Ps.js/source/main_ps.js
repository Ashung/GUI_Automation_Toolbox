/*
 * Copyright (c) 2015 Ashung Hung (Ashung.hung@gmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Ps =
{
    file :
    {
        newDoc : newDoc,
        open : open,
        openAsSmartObject : openAsSmartObject,
        close : close,
        save : save,
        saveAs : saveAs,
        exportAs : exportAs,
        revert : revert,
        placeEmbedded : placeEmbedded,
        placeLinked : placeLinked,
        script : runScript
    },
    edit :
    {
        pasteInPlace : pasteInPlace
    }
    image :
    {
        imageSize : imageSize
    }
    layer :
    {
        new :
        {
            layer : todo,
            background : todo,
            group : todo,
            groupFromLayers: todo,
            artboard : todo,
            artboardFromGroup : todo,
            artboardFromLayers : todo
        },
        duplicate : todo,
        delete : todo,
        show : todo,
        hide : todo,
        rename : todo,
        mask : todo,
        vectorMask : todo,
        clippingMask : todo,
        smartObject : todo,
        group : todo,
        ungroup : todo,
        align : todo,
        alignToSelection : todo,
        alignToCanvas : todo,
        arrange :
        {
            bringToFront : bringToFront,
            bringForward : bringForward,
            sendBackward : sendBackward,
            sendToBack : sendToBack,
            reverse : reverse
        }
    },
    select :
    {
        all : selectAll,
        deselect : selectDeselect,
        inverse : selectInverse,
        allLayers : selectAllLayers,
        deselectLayers : selectDeselectLayers,
        loadSelectionFromActiveLayer : selectionFromActiveLayer
    }
}
