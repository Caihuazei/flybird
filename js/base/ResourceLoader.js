//资源加载器
import Resource from "./Resource.js";

export class ResourceLoader {

    constructor(){
        //资源的数组转化map
        this.map = new Map(Resource);
        //遍历图片地址 对象
        for (let [key, value] of this.map){
            const image = new Image();
            image.src = value;
            this.map.set(key, image);
        }
    }

    onLoaded(callback){
        let loadCount = 0;
        for (let value of this.map.values()) {
            value.onload= ()=>{
            loadCount++;
                if (loadCount >= this.map.size) {
                    callback(this.map);
                }

            }
        }
    }
}