import {Spirit} from "../base/Spirit.js";
import {DataStore} from "../base/DataStore.js";

export class Bird extends Spirit {
    constructor() {
        let image = DataStore.getInstance().res.get('birds');
        super(image);
        //小鸟宽34 高24，上下编剧10， 左右边距 9；
        this.cutx = [
            9,
            9 + 34 + 18,
            9 + 34 + 18 + 34 + 18
        ];
        this.cuty = [
            10, 10, 10
        ];

        this.width = 34;
        this.height = 24;

        this.index = 0;
        this.count = 0;
        this.x = window.innerWidth / 8;
        this.y = window.innerHeight / 2.5;

        this.time = 0;
        // this.offset = 0;

    }


    draw() {
        //起始偏移量
        const offsetup = 30;
        //小鸟的垂直掉落
        const g = 0.98 / 2.4;
        this.offset = (g * this.time * (this.time - offsetup) ) / 2;
        this.time++;


        let num = this.index;

        this.datastore.ctx.drawImage(
            this.image,
            this.cutx[num],
            this.cuty[num],
            34,
            24,
            this.x,
            this.y + this.offset,
            34,
            24
        );
        this.count += 0.1;
        this.index = Math.floor(this.index + this.count);
        if (this.index == 2) {
            this.index = 0;
            this.count = 0;
        }
    }
    birdclick(){
        this.time = 0;
        //改变y
        this.y = this.y + this.offset;

        //设置上边界
        if (this.y <=0) {
            this.y = 0;
        }
    }
}
