const GUIDELINE_OFFSET = 5;

export function getGuides(lineGuideStops, itemBounds, ...exceptionList) {
    let guides = [];
    const resultV = findStop(lineGuideStops, itemBounds, 'vertical', exceptionList);
    const resultH = findStop(lineGuideStops, itemBounds, 'horizontal', exceptionList);
    const minV = resultV.sort((a, b) => a.diff - b.diff)[0];
    const minH = resultH.sort((a, b) => a.diff - b.diff)[0];

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

function findStop(lineGuideStops, itemBounds, direction, exceptionList) {
    let result = [];

    lineGuideStops[direction].forEach((lineGuide) => {
        itemBounds[direction].forEach((itemBound) => {
            if (! exceptionList.includes(itemBound.snap)) {
                const diff = Math.abs(lineGuide - itemBound.guide);
                if (diff < GUIDELINE_OFFSET) {
                    result.push({
                        lineGuide: lineGuide,
                        diff: diff,
                        snap: itemBound.snap,
                        offset: itemBound.offset,
                    });
                }
            }
        });
    });

    return result;
}

