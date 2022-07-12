class Figure{

    constructor(posX, posY, radio, color, ctx){
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.ctx = ctx;
        this.radio = radio;

    }

    getPosX(){
        return this.posX;
    }
    
    getPosY(){
        return this.posY;
    }

    getColor(){
        return this.color;
    }

    setPosX(x){
        this.posX = x;
    }

    setPosY(y){
        this.posY = y;
    }

    reDraw(x,y){

        this.setPosX(x);
        this.setPosY(y);
        this.draw();

    }

    setColor(color){
        this.color = color;
    }

    draw(){

        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radio, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();

    }

    isClicked(clickX,clickY){

        if((clickX < this.posX + this.radio && clickX >= this.posX - this.radio)&&
            (clickY < this.posY + this.radio && clickY >= this.posY - this.radio)){
            
            return true;
        }
        else{
            return false;
        }

    }

}