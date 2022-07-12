class Board {

    constructor(height, width, ctx){
        this.color = '#000';
        this.height = height; //por parametro alto canvas
        this.width = width;  //por parametro ancho canvas
        this.columnas = 7;
        this.filas = 7;
        this.lineWidth = 4;
        this.ctx = ctx; //parametro canvas ctx
        this.fichas = new Array();
        this.fichasEnJuego = new Array();
        this.entradaFichas = new Array();
        this.fichasTotales = 0;
        this.r = 25;
        
    }
                                
    setColumnas(value){
        this.filas = value *2;
        
    }


    moveFicha(){

    }


    esEntrada(mouseX, mouseY, ficha){

        for(var i=0;i<this.entradaFichas.length;i++){
            if(mouseX > this.entradaFichas[i].minX && mouseX < this.entradaFichas[i].maxX
                && mouseY > this.entradaFichas[i].minY && mouseY < this.entradaFichas[i].maxY){

                this.agregarFicha(i, ficha);

                return true;
            }
            
        }
        return false;


    }

   

    agregarFicha(columnaAct, ficha){

        var X = 0;
        var Y = 25;
        var r = this.r;
        var sumaEnY = this.height/10;
        var sumaEnX = this.width/20;
        this.ctx.strokeStyle = '#000';
        
        for(let i = 0; i < this.filas; i++){
            Y += sumaEnY;
            X =  this.width/4;
            
            for(let j = 0; j< this.columnas; j++){
                if(columnaAct==j){
                    
                    if(this.existeFicha(X,Y)
                                            &&
                        !this.existeFicha(X,Y-sumaEnY)
                        ){

                        if(i!=1){
                            Y -= sumaEnY;
                            this.insertarFicha(ficha, X, Y);
                        }
                        //TODO devolver ficha al grupo de fichas
                        else{
                            alert("La columna a culminado");

                        }

                    }
                                        
                    else if(!this.existeFicha(X,Y) && i == this.filas-1){
                        
                        this.insertarFicha(ficha, X, Y);

                    }

                    X += sumaEnX;
                }
                X += sumaEnX;

            
            }
        }
    }

    existeFicha(x, y){
    
        for(var i=0;i<this.fichasEnJuego.length;i++){
            
            if(this.fichasEnJuego[i].posX == x && this.fichasEnJuego[i].posY == y){
                return true;
            }
        }
        return false;

    }

    insertarFicha(ficha, x, y){

        ficha.setPosX(x);
        ficha.setPosY(y);
        
        var tmp = {posX:x,posY:y,color:ficha.color};

        this.fichasEnJuego.push(tmp);
        
        this.deleteFicha(ficha);

    }

    deleteFicha(ficha){

        
         
        var index = this.fichas.indexOf(ficha);
                
        this.fichas.splice(index, 1);


    }

    draw(){
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        
        //Fichero
        this.ctx.strokeRect(0,0,this.width,(this.height/5)*4);
        
        var X = 0;
        var Y = 25;
        var r = this.r;
        
        
        this.ctx.strokeStyle = '#000';
        
        for(let i = 0; i < this.filas; i++){
            Y += this.height/10;
            X =  this.width/4;
            
            for(let j = 0; j< this.columnas; j++){

                //en la primera fila se dibujaran todos los depositos de fichas
                if(i==0){

                    this.ctx.strokeRect(X-r,Y-(r*2),r*2,r*3);

                    var tmp =   {   minX:X-r,
                                    minY:Y-(r*2),
                                    maxX:X-r+(r*2),
                                    maxY:Y-(r*2)+(r*3),
                                    columna: j
                                }

                    this.entradaFichas.push(tmp);

                    X += this.width/20;
                }

                else{
                    this.ctx.beginPath();
                    this.ctx.arc(X, Y, r, 0, 2 * Math.PI);
                    this.ctx.fillStyle = '#000000';
                    this.ctx.fill();

                    this.fichasTotales++;  
                    X += this.width/20;
                }
            }
        }


        //Fichas Jug N°1
        this.ctx.strokeRect(0,(this.height/5)*4,(this.width/4)*0.6,this.height/5);

        //Fichas Jug N°2
        this.ctx.strokeRect((this.width/4)*3.4,(this.height/5)*4,(this.width/4)*0.6,this.height/5);
        
        //Info Games
        this.ctx.strokeRect((this.width/4)*0.6,(this.height/5)*4,(this.width/4)*2.8,this.height/5);

        this.drawFichas();

    }

    drawFichas(){


        var r = this.r;

        for (var i = 0;i <this.fichasTotales/2; i++){
            let posX = (this.width/4)*0.3;
            let posY = (this.height/5)*4.5;
            let figureJug1 = new Figure(posX, posY, r, '#ff0000', ctx);
            figureJug1.draw();
            this.fichas.push(figureJug1);
        }

        for (var i = 0;i <this.fichasTotales/2; i++){
            let posX = (this.width/4)*3.7;
            let posY = (this.height/5)*4.5;
            let figureJug2 = new Figure(posX, posY, r, '#0000ff', ctx);
            figureJug2.draw();
            this.fichas.push(figureJug2);
        }


    }



    reDraw(){

        this.ctx.lineWidth = this.lineWidth;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        
        //Fichero
        this.ctx.strokeRect(0,0,this.width,(this.height/5)*4);
        
        var X = 0;
        var Y = 25;
        var r = this.r;
        this.ctx.strokeStyle = '#000';
        
        for(let i = 0; i < this.columnas; i++){
            Y += this.height/10;
            X =  this.width/4;
            
            for(let j = 0; j< this.filas; j++){

                if(i==0){

                    this.ctx.strokeRect(X-r,Y-(r*2),r*2,r*3);
                    X += this.width/20;

                }

                else{
                    this.ctx.beginPath();
                    this.ctx.arc(X, Y, r, 0, 2 * Math.PI);
                    this.ctx.fillStyle = '#000000';
                    this.ctx.fill();

                    this.fichasTotales++;  
                    X += this.width/20;
                }
            }
        }


        //Redibujar todas las fichas que ya se añadieron al tablero
        for(var i=0;i<this.fichasEnJuego.length;i++){

            this.ctx.beginPath();
                    this.ctx.arc(this.fichasEnJuego[i].posX, this.fichasEnJuego[i].posY, r, 0, 2 * Math.PI);
                    this.ctx.fillStyle = this.fichasEnJuego[i].color;
                    this.ctx.fill();

        }


        //Fichas Jug N°1
        this.ctx.strokeRect(0,(this.height/5)*4,(this.width/4)*0.6,this.height/5);

        //Fichas Jug N°2
        this.ctx.strokeRect((this.width/4)*3.4,(this.height/5)*4,(this.width/4)*0.6,this.height/5);
        
        //Info Games
        this.ctx.strokeRect((this.width/4)*0.6,(this.height/5)*4,(this.width/4)*2.8,this.height/5);


    }

   





}