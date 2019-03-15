const reSizeBackground = (sprite, w, h) => {
    let imgSize = {w:sprite.texture.width, h:sprite.texture.height},
        spRatio = imgSize.w / imgSize.h,
        conRation = w / h,
        scale = 1,
        pos = new PIXI.Point(0, 0);

        if(conRatio > spRation) {
            scale = w / imgSize.w;
            pos.y = -((imgSize.h * scale)-h)/2;
        }else{
            scale = h / imgSize.h;
            pos.x = -((imgSize.w * scale)-w)/2;
        }
        sprite.scale.x = scale;
        sprite.scale.y = scale;
        sprite.position.x = pos.x;
        sprite.position.y = pos.y;

        return;
}

const rePostionContents = (obj, nW, nH, cW, cH, fixedY = false) => {
    obj.position.x = nW/2 - cW/2;
    if(!fixedY)obj.position.y = nH/2 - cH/2;
    return;
}

export {reSizeBackground, rePostionContents}