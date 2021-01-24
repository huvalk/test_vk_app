export const handlePolyClick = (e, {setCurrentPolyId, createCorners}) => {
    e.target.cancelBubble = true;
    setCurrentPolyId(e.target.attrs.id);

    createCorners(e.target);
};