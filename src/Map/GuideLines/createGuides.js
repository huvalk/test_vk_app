export function createGuides(guides, setGuideLines, stageRef) {
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