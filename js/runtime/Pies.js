import {Spirit} from "../base/Spirit.js";

export class Pies extends Spirit {
    constructor(image, top) {
        super(
            image,
            0,
            0,
            image.width,
            image.height,
            window.innerWidth,
            0,
            image.width,
            image.height
        );
        this.top = top;
        this.move = 2;
    }

    draw() {
        this.x = this.x -this.move;
        super.draw();
    }
}