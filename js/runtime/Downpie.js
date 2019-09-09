import {Pies} from "./Pies.js";
import {DataStore} from "../base/DataStore.js";

export class Downpie extends Pies{
        constructor(top){
            super(
                DataStore.getInstance().res.get('pie_down'),
                top
            )
            this.y = this.y + top + window.innerHeight/5;
        }

}