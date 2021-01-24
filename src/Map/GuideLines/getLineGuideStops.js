function getLineGuideStops(skipShape, shapeClass, stage, ...find) {
    let vertical = [0, stage.width()];
    let horizontal = [0, stage.height()];

    stage.find(shapeClass).forEach((guideItem) => {
        if (guideItem === skipShape || guideItem.attrs.id === skipShape) {
            return;
        }

        for (let func of find) {
            const lines = func(guideItem);

            vertical.push(lines.vertical);
            horizontal.push(lines.horizontal);
        }
    });
    return {
        vertical: vertical.flat(),
        horizontal: horizontal.flat(),
    };
}

function findCorners(shape) {
    const box = shape.getClientRect();

    return {
        vertical: [box.x, box.x + box.width],
        horizontal: [box.y, box.y + box.height],
    }
}

function findCenter(shape) {
    const box = shape.getClientRect();

    return {
        vertical: [(box.x + box.width) / 2],
        horizontal: [(box.y + box.height) / 2],
    }
}

export {getLineGuideStops, findCorners, findCenter};