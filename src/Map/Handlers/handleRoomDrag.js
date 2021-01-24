import {findCorners, getGuides, getLineGuideStops, getObjectSnappingEdges} from "../GuideLines";

export const handleRoomDrag = (e, {stageRef, createCorners, createGuides}) => {
    let lineGuideStops = getLineGuideStops(e.target,
        '.room',
        stageRef.current,
        findCorners);
    let itemBounds = getObjectSnappingEdges(e.target);
    let guides = getGuides(lineGuideStops, itemBounds);

    if (!guides.length) {
        createCorners(e.target);
        return;
    }

    createGuides(guides);

    let absPos = e.target.absolutePosition();
    guides.forEach((lg) => {
        switch (lg.snap) {
            case 'start': {
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
            case 'end': {
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
        }
    });
    e.target.absolutePosition(absPos);

    createCorners(e.target);
};