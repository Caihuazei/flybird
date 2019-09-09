//导演类负责游戏逻辑控制
import {DataStore} from "./base/DataStore.js";
import {UpPie} from "./runtime/UpPie.js";
import {Downpie} from "./runtime/Downpie.js";
import {Rectangle} from "./base/Rectangle.js";

export class Director {
    constructor() {
        this.datastore = DataStore.getInstance();
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    //创建一对铅笔
    createPie() {
        const minTop = window.innerHeight / 8;
        const maxTop = window.innerHeight / 2;
        const top = minTop + (Math.random() * (maxTop - minTop));

        this.datastore.get('pies').push(new UpPie(top));
        this.datastore.get('pies').push(new Downpie(top));
    }

    //判断是否生成一对
    isCreatePencil() {
        const pies = this.datastore.get('pies');
        if ((pies[0].x + (pies[0].width)) < (window.innerWidth / 2) && pies.length == 2) {
            this.createPie();
        }
    }

    //移除铅笔
    outPencil() {
        const pies = this.datastore.get('pies');
        if ((pies[0].x + (pies[0].width)) < 0 && pies.length == 4) {
            pies.shift();
            pies.shift();
            this.datastore.get('score').isScore=true;
        }
    }

    //碰装地板的检测方法'
    crashland() {
        let s = false;
        const bird = this.datastore.get('birds');
        const land = this.datastore.get('land');
        if (bird.y + bird.offset + 30 >= land.y) {
            s = true;
        }

        return s;
    }

    //判断铅笔碰撞
    crashPencil() {
        const pencils = this.datastore.get('pies');
        const bird = this.datastore.get('birds');

        // const birdBorder = {
        //     x:bird.x,
        //     y:bird.y+ bird.offset,
        //     width: bird.width,
        //     height: bird.height
        // };
        const birdRect = new Rectangle(bird.x, bird.y + bird.offset, bird.width, bird.height);

        for (let pencil of pencils) {
            // const pencilBorder = {
            //     x:pencil.x,
            //     y:pencil.y,
            //     width: pencil.width,
            //     height: pencil.height
            // }
            const pencilRect = new Rectangle(pencil.x, pencil.y, pencil.width, pencil.height);
            if (birdRect.intersects(pencilRect)) {
                return true;
            }
        }
        return false;
    }

    addScoreNumber(){
        const pencils = this.datastore.get('pies');
        const bird = this.datastore.get('birds');
        const score = this.datastore.get('score');

        //判断Y
        if (bird.x + bird.width >= pencils[0].x && score.isScore){
            score.scoreNumber++;
            score.isScore = false;
        }
    }

    run() {
        if (!this.isGameOver) {

            //绘制背景
            this.datastore.get('background').draw();

            //铅笔
            for (let pencil of  this.datastore.get('pies')) {
                pencil.draw();
            }
            //陆地
            this.datastore.get('land').draw();
            //调用判断是否生成铅笔
            this.isCreatePencil();

            //生成小鸟
            this.datastore.get('birds').draw();

            this.addScoreNumber();
            //生成分数
            this.datastore.get('score').draw();
            this.outPencil();
            //定时器
            let timer = requestAnimationFrame(() => {
                //重新调用RUN方法
                this.run();
            });
            this.datastore.put('timer', timer);

            if (this.crashland()) {
                this.isGameOver = true;
            }
            if (this.crashPencil()) {
                this.isGameOver = true;
            }



        } else {
            cancelAnimationFrame(this.datastore.get('timer'));

            this.datastore.get('start_button').draw();
            //清除map
            this.datastore.destory();


        }


    }
}