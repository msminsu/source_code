const getDelegateTarget = (eventTarget, findTarget) => {
    let target = $(eventTarget);

    const checkName = (checkNode) => {
        if (!checkNode.is(findTarget)) {
            checkName(checkNode.parent());
        } else {
            target = checkNode;
        }
    };

    checkName(target);
    return target;
}

export default getDelegateTarget;