import Konva from "konva";
import {isTouchEnabled} from "../Common";

export const handleClick = (e, {rects, setRects}) => {
    const stage = e.currentTarget;
    if (! (e.target instanceof Konva.Stage)) {
        return;
    }

    let x = 0;
    let y = 0;

    if (isTouchEnabled() && e.evt.type === 'touchend' && e.evt.changedTouches.length !== 0) {
        x = (e.evt.changedTouches[0].pageX - stage.x()) / stage.scaleX();
        y = (e.evt.changedTouches[0].pageY - stage.y()) / stage.scaleY();
    } else if (!isTouchEnabled() && e.evt.type === 'mouseup') {
        x = (e.evt.pageX - stage.x()) / stage.scaleX();
        y = (e.evt.pageY - stage.y()) / stage.scaleY();
    } else {
        return;
    }

    const width = Math.floor(50 + Math.random() * 50);
    const height = Math.floor(50 + Math.random() * 50);

    setRects(rects.concat({
        id: rects.length,
        x: x,
        y: y,
        width: width,
        height: height,
        points: [0, 0, width, 0, width, height, 0, height],
        fill: 'rgb(120, 120, 120)',
        name: 'room',
        stroke: 'rgb(50, 50, 50)',
        strokeWidth: 1,
    }));
};