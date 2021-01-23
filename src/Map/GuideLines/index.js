function getObjectSnappingEdges(node) {
    let box = node.getClientRect();
    let absPos = node.absolutePosition();

    return {
        vertical: [
            {
                guide: Math.round(box.x),
                offset: Math.round(absPos.x - box.x),
                snap: 'start',
            },
            {
                guide: Math.round(box.x + box.width / 2),
                offset: Math.round(absPos.x - box.x - box.width / 2),
                snap: 'center',
            },
            {
                guide: Math.round(box.x + box.width),
                offset: Math.round(absPos.x - box.x - box.width),
                snap: 'end',
            },
        ],
        horizontal: [
            {
                guide: Math.round(box.y),
                offset: Math.round(absPos.y - box.y),
                snap: 'start',
            },
            {
                guide: Math.round(box.y + box.height / 2),
                offset: Math.round(absPos.y - box.y - box.height / 2),
                snap: 'center',
            },
            {
                guide: Math.round(box.y + box.height),
                offset: Math.round(absPos.y - box.y - box.height),
                snap: 'end',
            },
        ],
    };
}

let GUIDELINE_OFFSET = 5;
// find all snapping possibilities
function getGuides(lineGuideStops, itemBounds) {
    let resultV = [];
    let resultH = [];

    lineGuideStops.vertical.forEach((lineGuide) => {
        itemBounds.vertical.forEach((itemBound) => {
            if (itemBound.snap !== 'center') {
                let diff = Math.abs(lineGuide - itemBound.guide);
                // if the distance between guild line and object snap point is close we can consider this for snapping
                if (diff < GUIDELINE_OFFSET) {
                    resultV.push({
                        lineGuide: lineGuide,
                        diff: diff,
                        snap: itemBound.snap,
                        offset: itemBound.offset,
                    });
                }
            }
        });
    });

    lineGuideStops.horizontal.forEach((lineGuide) => {
        itemBounds.horizontal.forEach((itemBound) => {
            if (itemBound.snap !== 'center') {
                let diff = Math.abs(lineGuide - itemBound.guide);
                if (diff < GUIDELINE_OFFSET) {
                    resultH.push({
                        lineGuide: lineGuide,
                        diff: diff,
                        snap: itemBound.snap,
                        offset: itemBound.offset,
                    });
                }
            }
        });
    });

    let guides = [];

    // find closest snap
    let minV = resultV.sort((a, b) => a.diff - b.diff)[0];
    let minH = resultH.sort((a, b) => a.diff - b.diff)[0];
    if (minV) {
        guides.push({
            lineGuide: minV.lineGuide,
            offset: minV.offset,
            orientation: 'V',
            snap: minV.snap,
        });
    }
    if (minH) {
        guides.push({
            lineGuide: minH.lineGuide,
            offset: minH.offset,
            orientation: 'H',
            snap: minH.snap,
        });
    }
    return guides;
}

// were can we snap our objects?
function getLineGuideStops(skipShape, stage) {
    // we can snap to stage borders and the center of the stage
    let vertical = [0, stage.width()];
    let horizontal = [0, stage.height()];

    // and we snap over edges and center of each object on the canvas
    stage.find('.room').forEach((guideItem) => {
        if (guideItem === skipShape) {
            return;
        }
        let box = guideItem.getClientRect();
        // and we can snap to all edges of shapes
        vertical.push([box.x, box.x + box.width]);
        horizontal.push([box.y, box.y + box.height]);
    });

    return {
        vertical: vertical.flat(),
        horizontal: horizontal.flat(),
    };
}

// were can we snap our objects?
function getLineGuideCenterStops(skipShape, stage) {
    // we can snap to stage borders and the center of the stage
    let vertical = [0, stage.width()];
    let horizontal = [0, stage.height()];

    // and we snap over edges and center of each object on the canvas
    stage.find('.room').forEach((guideItem) => {
        if (guideItem.attrs.id === skipShape) {
            return;
        }
        let box = guideItem.getClientRect();
        // and we can snap to all edges of shapes
        vertical.push([box.x, box.x + box.width]);
        horizontal.push([box.y, box.y + box.height]);
    });
    return {
        vertical: vertical.flat(),
        horizontal: horizontal.flat(),
    };
}

function getCenterGuides(lineGuideStops, itemBounds) {
    let resultV = [];
    let resultH = [];

    lineGuideStops.vertical.forEach((lineGuide) => {
        itemBounds.vertical.forEach((itemBound) => {
            if (itemBound.snap === 'center') {
                let diff = Math.abs(lineGuide - itemBound.guide);
                // if the distance between guild line and object snap point is close we can consider this for snapping
                if (diff < GUIDELINE_OFFSET) {
                    resultV.push({
                        lineGuide: lineGuide,
                        diff: diff,
                        snap: itemBound.snap,
                        offset: itemBound.offset,
                    });
                }
            }
        });
    });

    lineGuideStops.horizontal.forEach((lineGuide) => {
        itemBounds.horizontal.forEach((itemBound) => {
            if (itemBound.snap === 'center') {
                let diff = Math.abs(lineGuide - itemBound.guide);
                if (diff < GUIDELINE_OFFSET) {
                    resultH.push({
                        lineGuide: lineGuide,
                        diff: diff,
                        snap: itemBound.snap,
                        offset: itemBound.offset,
                    });
                }
            }
        });
    });

    let guides = [];

    // find closest snap
    let minV = resultV.sort((a, b) => a.diff - b.diff)[0];
    let minH = resultH.sort((a, b) => a.diff - b.diff)[0];
    if (minV) {
        guides.push({
            lineGuide: minV.lineGuide,
            offset: minV.offset,
            orientation: 'V',
            snap: minV.snap,
        });
    }
    if (minH) {
        guides.push({
            lineGuide: minH.lineGuide,
            offset: minH.offset,
            orientation: 'H',
            snap: minH.snap,
        });
    }
    return guides;
}

export {getObjectSnappingEdges, getGuides, getCenterGuides, getLineGuideStops, getLineGuideCenterStops};