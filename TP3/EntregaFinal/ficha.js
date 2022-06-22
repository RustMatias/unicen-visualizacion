class Ficha{

    constructor(posX, posY, radio, ctx, jugador, path = null){
        this.posX = posX;
        this.posY = posY;
        this.ctx = ctx;
        this.radio = radio;
        this.jugador = jugador;
        this.img = new Image();
        
        this.img.onload = ()=> {
            this.draw();
        }
        
        this.pathImg = path;
        this.img.src = path;

    }
    
    setSRC(path){
        this.img.src = path;
    }
    getPosX(){
        return this.posX;
    }
    
    getPosY(){
        return this.posY;
    }

    getJugador(){
        return this.jugador;
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

    draw(){
        this.ctx.drawImage(this.img, this.posX-this.radio, this.posY-this.radio);
    }

    /* draw(){

        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radio, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();

    } */

    isClicked(clickX,clickY){


        var dx = this.getPosX() - clickX;
        var dy = this.getPosY() - clickY;
        return Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2))<this.radio;
    }

}