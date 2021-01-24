import React from 'react';
import { Stage, Layer, Rect, Line, Circle, Group } from 'react-konva';
import "./GuideLines";
import {chunk, isTouchEnabled} from "./Common";
import {
    handleClick,
    handleCornerDrag,
    handleLayerDrag,
    handleLayerDragEnd,
    handlePolyClick,
    handleWheel
} from "./Handlers";

const INITIAL_RECT = [];
const LAYER = React.createRef();

const Map = () => {
    const [rects, setRects] = React.useState(INITIAL_RECT);
    const [guideLines, setGuideLines] = React.useState([]);
    const [corners, setCorners] = React.useState([]);
    const [currentPolyId, setCurrentPolyId] = React.useState(undefined);
    let stageRef = React.createRef();

    function createCorners(polygon) {
        let newPoints = [];
        chunk(polygon.points(), 2)
            .map((corner) => {
                newPoints.push(corner[0] + polygon.x());
                newPoints.push(corner[1] + polygon.y());
            });

        setCorners(newPoints);
    }
    function createGuides(guides) {
        let newGuideLines = [];

        guides.forEach((lg) => {
            if (lg.orientation === 'H') {
                let line = {
                    id: newGuideLines.length,
                    x: 0,
                    y: lg.lineGuide - stageRef.current.y(),
                    points: [-6000, 0, 6000, 0],
                    stroke: 'rgb(0, 161, 255)',
                    strokeWidth: 1,
                    name: 'guid-line',
                    dash: [4, 6],
                };
                newGuideLines.push(line);
            } else if (lg.orientation === 'V') {
                let line = {
                    id: newGuideLines.length,
                    x: lg.lineGuide - stageRef.current.x(),
                    y: 0,
                    points: [0, -6000, 0, 6000],
                    stroke: 'rgb(0, 161, 255)',
                    strokeWidth: 1,
                    name: 'guid-line',
                    dash: [4, 6],
                };
                newGuideLines.push(line);
            }
        });

        setGuideLines(newGuideLines);
    }

    const handleClickDep = {
        rects,
        setRects,
    };
    const handleLayerDragDep = {
        stageRef,
        createCorners,
        createGuides,
    };
    const handleLayerDragEndDep = {
        setGuideLines,
    };
    const handleCornerDragDep = (pointIndex) => {
        return {
            rectIndex: currentPolyId,
            pointIndex,
            stageRef,
            rects,
            setRects,
            createGuides
        };
    };

    const handlePolyClickDep = {
        setCurrentPolyId,
        createCorners,
    };


    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            draggable
            onClick={(e) => handleClick(e, handleClickDep)}
            onTap={(e) => handleClick(e, handleClickDep)}
            onWheel={handleWheel}
            ref={stageRef}>
            <Layer
                onDragMove={(e) => handleLayerDrag(e, handleLayerDragDep)}
                onDragEnd={(e) => handleLayerDragEnd(e, handleLayerDragEndDep)}
                ref={LAYER}
                >
                {rects.map((rect) => (
                    <Line
                        onMouseDown={(e) => handlePolyClick(e, handlePolyClickDep)}
                        onTouchStart={(e) => handlePolyClick(e, handlePolyClickDep)}
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
                            // onDragMove={(e) => handleCornerDrag(e, handleCornerDragDep(i))}
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
        </Stage>
    );
};

export default Map;