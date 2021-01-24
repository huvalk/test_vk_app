import React from 'react';
import Konva from 'konva'
import { Stage, Layer, Rect, Line, Circle, Group, Transformer } from 'react-konva';
import {getObjectSnappingEdges, getGuides, getCenterGuides, getLineGuideStops, getLineGuideCenterStops} from "./GuideLines";
import {chunk, isTouchEnabled} from "./Common";

const INITIAL_RECT = [];
const LAYER = React.createRef();

const Map = () => {
    const [rects, setRects] = React.useState(INITIAL_RECT);
    const [guideLines, setGuideLines] = React.useState([]);
    const [corners, setCorners] = React.useState([]);
    const [currentPolyId, setCurrentPolyId] = React.useState(undefined);
    let stageRef = React.createRef();

    const handleClick = (e) => {
        const stage = e.currentTarget;
        if (! (e.target instanceof Konva.Stage)) {
            return;
        }

        let x = 0;
        let y = 0;

        console.log(e.evt);

        if (isTouchEnabled() && e.evt.type === 'touchend' && e.evt.changedTouches.length !== 0) {
            console.log('touch');
            x = (e.evt.changedTouches[0].pageX - stage.x()) / stage.scaleX();
            y = (e.evt.changedTouches[0].pageY - stage.y()) / stage.scaleY();
        } else if (!isTouchEnabled() && e.evt.type === 'mouseup') {
            console.log('mouse');
            x = (e.evt.pageX - stage.x()) / stage.scaleX();
            y = (e.evt.pageY - stage.y()) / stage.scaleY();
        } else {
            console.log('return');
            return;
        }
        console.log('continue');

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
    const handleWheel = (e) => {
        // e.evt.preventDefault();
        // const stage = e.currentTarget;
        //
        // let oldScale = stage.scaleX();
        // let pointer = stage.getPointerPosition();
        // let mousePointTo = {
        //     x: (pointer.x - stage.x()) / oldScale,
        //     y: (pointer.y - stage.y()) / oldScale,
        // };
        //
        // let newScale =
        //     e.evt.deltaY > 0 ? oldScale * 1.2 : oldScale / 1.2;
        // stage.scale({ x: newScale, y: newScale });
        //
        // let newPos = {
        //     x: pointer.x - mousePointTo.x * newScale,
        //     y: pointer.y - mousePointTo.y * newScale,
        // };
        // stage.position(newPos);
        // stage.batchDraw();
    };
    function createCorners(polygon) {
        let newPoints = [];
        chunk(polygon.points(), 2)
            .map((corner) => {
                newPoints.push(corner[0] + polygon.x());
                newPoints.push(corner[1] + polygon.y());
            });

        setCorners(newPoints);
    }
    function drawGuides(guides) {
        guideLines.length = 0;
        guides.forEach((lg) => {
            if (lg.orientation === 'H') {
                let line = {
                    id: guideLines.length,
                    x: 0,
                    y: lg.lineGuide - stageRef.current.y(),
                    points: [-6000, 0, 6000, 0],
                    stroke: 'rgb(0, 161, 255)',
                    strokeWidth: 1,
                    name: 'guid-line',
                    dash: [4, 6],
                };
                setGuideLines(guideLines.concat(line));
            } else if (lg.orientation === 'V') {
                let line = {
                    id: guideLines.length,
                    x: lg.lineGuide - stageRef.current.x(),
                    y: 0,
                    points: [0, -6000, 0, 6000],
                    stroke: 'rgb(0, 161, 255)',
                    strokeWidth: 1,
                    name: 'guid-line',
                    dash: [4, 6],
                };
                setGuideLines(guideLines.concat(line));
            }
        });
    }
    const handlePolyClick = (e) => {
        e.target.cancelBubble = true;
        setCurrentPolyId(e.target.attrs.id);

        createCorners(e.target);
    };
    const handleRoomDrag = (e, currentPolyId) => {
        const polygon = e.target;
        let newPoints = [];

        let lineGuideStops = getLineGuideStops(e.target, stageRef.current);
        let itemBounds = getObjectSnappingEdges(e.target);
        let guides = getGuides(lineGuideStops, itemBounds);

        if (!guides.length) {
            createCorners(e.target);
            return;
        }

        drawGuides(guides);

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
    const handleCornerDrag = (e, i, pointNum) => {
        let lineGuideStops = getLineGuideCenterStops(currentPolyId, stageRef.current);
        let itemBounds = getObjectSnappingEdges(e.target);
        let guides = getCenterGuides(lineGuideStops, itemBounds);

        if (!guides.length) {
            return;
        }

        drawGuides(guides);

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

        const points = rects[i].points;
        let newRects = [...rects];
        let newPoints = newRects[i].points;

        newPoints[pointNum * 2] = absPos.x - newRects[i].x;
        newPoints[pointNum * 2 + 1] = absPos.y - newRects[i].y;

        setRects(newRects);
    };
    const handleLayerDrag = (e, currentPolyId) => {
        switch (e.target.name()) {
            case 'corner': {
                // handleCornerDrag(e, currentPolyId);
                return;
            }
            case 'room': {
                handleRoomDrag(e, currentPolyId);
                return;
            }
            default: {

            }
        }
    };
    const handleLayerDragEnd = (e) => {
        setGuideLines([]);
    };

    const map='map';

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            draggable
            onClick={handleClick}
            onTap={handleClick}
            onWheel={handleWheel}
            ref={stageRef}>
            <Layer
                onDragMove={(e) => handleLayerDrag(e, currentPolyId)}
                onDragEnd={handleLayerDragEnd}
                ref={LAYER}
                >
                {rects.map((rect) => (
                    <Line
                        onMouseDown={(e) => handlePolyClick(e, currentPolyId)}
                        onTouchStart={(e) => handlePolyClick(e, currentPolyId)}
                        closed
                        key={rect.id}
                        x={rect.x}
                        y={rect.y}
                        name={rect.name}
                        id={rect.id}
                        points={rect.points}
                        fill={rect.fill}
                        stroke={rect.stroke}
                        strokeWidth={rect.strokeWidth}
                        opacity={0.8}
                        draggable
                    />
                ))}
                <Group
                    clipFunc={function (ctx) {
                        if (corners.length === 0) {
                            return;
                        }

                        ctx.moveTo(corners[0], corners[1]);
                        for (let i = 1; i < corners.length / 2; i++) {
                            ctx.lineTo(corners[2 * i], corners[2 * i + 1]);
                        }
                    }}
                >
                    {chunk(corners, 2).map((corner, i) => (
                        <Circle
                            key={2000 + 2*i}
                            x={corner[0]}
                            y={corner[1]}
                            radius={10}
                            fill={'red'}
                            name={'corner'}
                            // draggable
                            // onDragMove={(e) => handleCornerDrag(e, currentPolyId, i)}
                        />
                    ))}
                </Group>
                {guideLines.map((line) => (
                    <Line
                        key={1000 + line.id}
                        points={line.points}
                        stroke={line.stroke}
                        strokeWidth={line.width}
                        name={line.name}
                        dash={line.dash}
                        x={line.x}
                        y={line.y}
                    />
                ))}
            </Layer>

            <Layer>
            </Layer>
        </Stage>
    );
};

export default Map;