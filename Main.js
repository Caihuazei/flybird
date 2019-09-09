import {DataStore} from "./js/base/DataStore.js";
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Director} from "./js/Director.js";
import {Background} from "./js/runtime/Background.js";
import {Land} from "./js/runtime/Land.js";
import {Bird} from "./js/runtime/Bird.js";
import {StarButton} from "./js/runtime/StarButton.js";
import {Score} from "./js/player/Score.js";

//游戏主文件
export class Main {
    constructor() {
        //获取canvas画笔
        this.canvas = document.getElementById('bird');
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        //获取图片资源
        const loader = new ResourceLoader();
        loader.onLoaded(map => this.onFirstLoaded(map));
    }

    onFirstLoaded(map) {
        this.dataStore.res = map;
        this.dataStore.ctx = this.ctx;
        this.init();
        this.registerevent();
    }

    init() {
        //背景
        this.dataStore.put('background', new Background());
        //加载铅笔地址
        this.dataStore.put('pies',  []);
        //加载一对铅笔
        this.director.createPie();
        //加载小鸟
        this.dataStore.put('birds',new Bird());
        //添加分数
        this.dataStore.put('score',new Score());

        //添加开始按钮
        this.dataStore.put('start_button', new StarButton());


        this.director.isGameOver = false;
        //陆地
        this.dataStore.put('land', new Land());
        this.director.run();

    }
    //注册事件
        registerevent(){
            this.canvas.addEventListener('touchstart',e =>{
                //屏蔽事件冒泡
                e.preventDefault();
                if (this.director.isGameOver){
                    this.init();
                }else {
                    this.dataStore.get('birds').birdclick();
                }

            })
        }
}