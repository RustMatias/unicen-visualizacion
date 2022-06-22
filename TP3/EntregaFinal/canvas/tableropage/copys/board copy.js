class Board {
    
    constructor(height, width, ctx){
        this.color = '#000';
        this.height = height; //por parametro alto canvas
        this.width = width;   //por parametro ancho canvas
        this.lineWidth = 4;
        this.ctx = ctx; //parametro canvas ctx
        this.Fichas
    }

    

    draw(){
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();


        let fichaVacia2 = new Ficha(0, 0, 0, ctx, 0);
        fichaVacia2.draw();
        console.log(fichaVacia2.img);

        this.ctx.drawImage(
            this.img,
            0,
            this.posY 
        )

        //Fichero
        this.ctx.strokeRect(0,0,this.width,(this.height/5)*4);
        
        var X = 0;
        var Y = 25;
        var r = 30;
        var fichasTotales = 0;
        this.ctx.strokeStyle = '#000';
        
        for(let i = 0; i < 5; i++){
            Y += this.height/8.5;
            X =  this.width/14;
            
            for(let j = 0; j< 10; j++){
                this.ctx.beginPath();
                
                let fichaVacia = new Ficha(X, Y, r, ctx, 0);
                fichaVacia.draw();
                fichasTotales++;  
                
                X += this.width/16;
            }
        }
        //constructor(posX, posY, radio, ctx, jugador){

        //Fichas Jug N°1
        this.ctx.strokeRect(0,(this.height/5)*4,(this.width/4)*0.6,this.height/5);

        for (var i = 0;i <fichasTotales/2; i++){
            let posX = (this.width/4)*0.3;
            let posY = (this.height/5)*4.5;
            /* let figure = new Ficha(posX, posY, 30, '#ff0000', ctx); */
            let figure = new Ficha(X, Y, r, ctx, 1);
            figure.draw();
        }
        
        //Fichas Jug N°2
        this.ctx.strokeRect((this.width/4)*3.4,(this.height/5)*4,(this.width/4)*0.6,this.height/5);
        
        for (var i = 0;i <fichasTotales/2; i++){
            let posX = (this.width/4)*3.7;
            let posY = (this.height/5)*4.5;
            let figure = new Ficha(X, Y, r, ctx, 2);
            figure.draw();
        }


        //Info Games
        this.ctx.strokeRect((this.width/4)*0.6,(this.height/5)*4,(this.width/4)*2.8,this.height/5);

        

        
    }





}