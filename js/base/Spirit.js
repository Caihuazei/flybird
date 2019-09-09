
import {DataStore} from "./DataStore.js";

export class Spirit {
    constructor(image, srcx = 0, srcy = 0, cutwidth=image.width, cutheight=image.height
                , x=0, y=0, width=image.width, height=image.height){
        this.image = image;
        this.srcx = srcx;
        this.srcy = srcy;
        this.cutwidth = cutwidth;
        this.cutheight = cutheight;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;


        this.datastore = DataStore.getInstance();
    }

    draw(){
        this.datastore.ctx.drawImage(this.image, this.srcx, this.srcy, this.cutwidth, this.cutheight,
            this.x, this.y, this.width, this.height)
    }
}