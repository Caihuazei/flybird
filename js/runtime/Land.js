import {Spirit} from "../base/Spirit.js";
import {DataStore} from "../base/DataStore.js";

export class Land extends Spirit {
    constructor() {
        const image = DataStore.getInstance().res.get('land');
        super(
            image,
            0,
            0,
            image.width,
            image.height,
            0,
            window.innerHeight - image.height,
            image.width,
            image.height
        );
        //移动X坐标
            this.move = 2;
    }

    draw() {
        this.x = this.x - this.move;
        //循环land图片
        if ((-this.x) >(this.image.width - window.innerWidth ) ) {
            this.x = 0;
        }
        super.draw()
    }


}