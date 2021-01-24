export const handleWheel = (e) => {
    e.evt.preventDefault();
    const stage = e.currentTarget;

    let oldScale = stage.scaleX();
    let pointer = stage.getPointerPosition();
    let mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
    };

    let newScale =
        e.evt.deltaY > 0 ? oldScale * 1.2 : oldScale / 1.2;
    stage.scale({ x: newScale, y: newScale });

    let newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
    stage.batchDraw();
};