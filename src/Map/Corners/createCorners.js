import {chunk} from "../Common";

export function createCorners(polygon, setCorners) {
    let newPoints = [];
    chunk(polygon.points(), 2)
        .map((corner) => {
            newPoints.push(corner[0] + polygon.x());
            newPoints.push(corner[1] + polygon.y());
        });

    setCorners(newPoints);
}