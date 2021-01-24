import {findCenter, getGuides, getLineGuideStops, getObjectSnappingEdges} from "../GuideLines";

export const handleCornerDrag = (e, {rectIndex, pointIndex, stageRef, rects, setRects, createGuides}) => {
    let lineGuideStops = getLineGuideStops(e.target,
        '.room',
        stageRef.current,
        findCenter);
    let itemBounds = getObjectSnappingEdges(e.target);
    let guides = getGuides(lineGuideStops, itemBounds, 'start', 'end');

    if (!guides.length) {
        return;
    }

    createGuides(guides);

    let absPos = e.target.absolutePosition();
    guides.forEach((lg) => {
        switch (lg.snap) {
            case 'center': {
                switch (lg.orientation) {
                    case 'V': {
                        absPos.x = lg.lineGuide + lg.offset;
                        break;
                    }
                    case 'H': {
                        absPos.y = lg.lineGuide + lg.offset;
                        break;
                    }
                }
                break;
            }
            default:
                break;
        }
    });
    e.target.absolutePosition(absPos);

    let newRects = [...rects];
    let newPoints = newRects[rectIndex].points;

    newPoints[pointIndex * 2] = absPos.x - newRects[rectIndex].x;
    newPoints[pointIndex * 2 + 1] = absPos.y - newRects[rectIndex].y;

    setRects(newRects);
};