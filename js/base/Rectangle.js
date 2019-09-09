export class Rectangle {
    constructor( x=0,  y=0,  width=0,  height=0){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    intersects(r){
        //1
        let tw = this.width;
        //1
        let th = this.height;
        //2
        let rw = r.width;
        //2
        let rh = r.height;
        //检验

        //1
        let tx = this.x;
        let ty = this.y;
        //2
        let rx = r.x;
        let ry = r.y;

        rw += rx;
        rh += ry;
        tw += tx;
        th += ty;

        return(
            (rw < rx || rw > tx)&&
            (rh < ry || rh > ty)&&
            (tw < tx || tw > rx)&&
            (th < ty || th > ry)
        );
    }
}