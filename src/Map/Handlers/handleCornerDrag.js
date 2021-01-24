import {findCenter, findCorners, getLineGuideStops, getObjectSnappingEdges} from "../GuideLines";

const handleCornerDrag = (e, {polygon, pointNum, stage, createCorners, createGuides}) => {
    // let lineGuideStops = getLineGuideStops(e.target,
    //     '.room',
    //     stage,
    //     findCenter());
    // let itemBounds = getObjectSnappingEdges(e.target);
    // let guides = getCenterGuides(lineGuideStops, itemBounds);
    //
    // if (!guides.length) {
    //     return;
    // }
    //
    // drawGuides(guides);
    //
    // let absPos = e.target.absolutePosition();
    // guides.forEach((lg) => {
    //     switch (lg.snap) {
    //         case 'center': {
    //             switch (lg.orientation) {
    //                 case 'V': {
    //                     absPos.x = lg.lineGuide + lg.offset;
    //                     break;
    //                 }
    //                 case 'H': {
    //                     absPos.y = lg.lineGuide + lg.offset;
    //                     break;
    //                 }
    //             }
    //             break;
    //         }
    //         default:
    //             break;
    //     }
    // });
    // e.target.absolutePosition(absPos);
    //
    // const points = rects[i].points;
    // let newRects = [...rects];
    // let newPoints = newRects[i].points;
    //
    // newPoints[pointNum * 2] = absPos.x - newRects[i].x;
    // newPoints[pointNum * 2 + 1] = absPos.y - newRects[i].y;
    //
    // setRects(newRects);
};