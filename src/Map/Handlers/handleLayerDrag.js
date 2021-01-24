import {handleRoomDrag} from "./handleRoomDrag";

const handleLayerDrag = (e, dependencies) => {
    switch (e.target.name()) {
        case 'corner': {
            // handleCornerDrag(e, dependencies);
            return;
        }
        case 'room': {
            handleRoomDrag(e, dependencies);
            return;
        }
        default: {

        }
    }
};

const handleLayerDragEnd = (e, {setGuideLines}) => {
    setGuideLines([]);
};

export {handleLayerDrag, handleLayerDragEnd}