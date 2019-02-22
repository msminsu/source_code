const getWheelDirection = (e) => {
    if(e.type === "DOMMouseScroll") return e.originalEvent.detail > 0 ? 1 : -1;
    if(e.originalEvent.wheelDeltaY) return e.originalEvent.wheelDeltaY > 0 ? 1 : -1;
    return e.originalEvent.wheelDelta > 0 ? -1 : 1;
};

export default getWheelDirection;