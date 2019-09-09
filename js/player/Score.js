import {DataStore} from "../base/DataStore.js";

export class Score {
    constructor(){
        this.scoreNumber = 0;
        this.isScore = true;
    }
    draw(){
        let ctx = DataStore.getInstance().ctx;
        ctx.fillStyle = "#ffcbeb";
        ctx.font = '25px  Arial';
        ctx.fillText(this.scoreNumber,
            window.innerWidth/2,
            window.innerHeight/18,
            1000);

    }
}