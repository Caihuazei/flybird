import {Pies} from "./Pies.js";
import {DataStore} from "../base/DataStore.js";

export class UpPie extends Pies {
    constructor(top) {
        let image = DataStore.getInstance().res.get('pie_up');
        super(image,
        )
        this.y = top - this.image.height;

    }

}