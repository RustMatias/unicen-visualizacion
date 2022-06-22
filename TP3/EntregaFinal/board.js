class Board {

    constructor(height, width, ctx){
        this.toWin = 4;
        this.color = '#E5E5E5';
        this.height = height; //por parametro alto canvas
        this.width = width;  //por parametro ancho canvas
        this.columnas = 7;
        this.filas = 7;
        this.lineWidth = 4;
        this.ctx = ctx; //parametro canvas ctx
        this.fichas = new Array();
        this.fichasEnJuego = new Array();
        this.entradaFichas = new Array();
        this.fichasTotales = this.columnas*(this.filas-1);
        this.r = 25;
        this.Mcolumnas = new Array();
        for(var i = 0; i < this.columnas; i++){
            if(this.Mcolumnas[i] == undefined){
                this.Mcolumnas[i] = new Array();
            }
            for(var j  = 0; j < this.filas; j++){
                this.Mcolumnas[i][j] = new Ficha(0,0,0,this.ctx,0,null);
           
            }
        }

        



    }
                                
    setcolumnas(value){
        this.filas = value *2;
        
    }


    reset(){
        this.fichas = new Array();
        this.fichasEnJuego = new Array();
        this.entradaFichas = new Array();
        this.Mcolumnas = new Array();
        for(var i = 0; i < this.columnas; i++){
            if(this.Mcolumnas[i] == undefined){
                this.Mcolumnas[i] = new Array();
            }
            for(var j  = 0; j < this.filas; j++){
                this.Mcolumnas[i][j] = new Ficha(0,0,0,this.ctx,0,null);
           
            }
        }
        

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
        var Y = 50;
        var r = this.r;
        var sumaEnY = this.height/10;
        var sumaEnX = this.width/20;
        this.ctx.strokeStyle = '#E5E5E5';
        
        for(let i = 0; i < this.filas; i++){
            Y += sumaEnY;
            X =  this.width/2-(this.width/20*3);
            
            for(let j = 0; j< this.columnas; j++){
                if(columnaAct==j){
                    

                  
                    if(this.existeFicha(X,Y) && !this.existeFicha(X,Y-sumaEnY)){

                        if(i==2){

                          Y -= sumaEnY;
                          this.insertarFicha(ficha, X, Y);
                          

                          var tmp = {  
                            minX:0,
                            minY:0,
                            maxX:0,
                            maxY:0,
                            columna: j
                          };
                          

                          this.entradaFichas[j] = tmp;

                          break;


                        }
                        else if(i!=1){
                            Y -= sumaEnY;
                            this.insertarFicha(ficha, X, Y);
                            break;
                        }
                        
                        //TODO devolver ficha al grupo de fichas
                        else{
                            this.entradaFichas[i]=null;
                            

                        }

                    }
                  
                                        
                    else if(!this.existeFicha(X,Y) && i == this.filas-1){
                        
                        this.insertarFicha(ficha, X, Y);
                        break;
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
        
        var nuevaFicha = new Ficha(x,y,this.r,ctx,ficha.jugador, ficha.pathImg);
        this.fichasEnJuego.push(nuevaFicha);

        var columna = this.calcularcolumna(ficha.posX, ficha.posY);
        var fila = -1;
        for(let i = 0; i< this.Mcolumnas[columna].length; i ++){
            if(this.Mcolumnas[columna][i].getJugador() == 0){
                fila = i;
                break;
            }
            
        }
        
        
        this.Mcolumnas[columna][fila]= nuevaFicha;        
        
        ficha.setPosX(x);
        ficha.setPosY(y);

        this.deleteFicha(ficha);
            
        this.ctx.clearRect(0,0,width,height);
        this.reDraw();
        for(var i = 0; i<this.fichas.length;i++){

            this.fichas[i].draw();
    
        }

        if(this.verificarGanador(columna, fila)){
          this.fichas = new Array();
          this.fichasEnJuego = new Array();
          this.entradaFichas = new Array();
          this.Mcolumnas = new Array();

          this.ctx.clearRect(0,0,width,height);
          this.draw();

          document.querySelector("#canvas-info-buttons").innerHTML = "<h1 class='selected'> El ganador es el JUGADOR " + ficha.getJugador()+ "</h1>";
        

            
            
              
      
          
            console.log("El Ganador es el Jugador N°"  + ficha.getJugador());
        }
        
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    verificarGanador(columna, fila){

        const numberToWin = this.toWin;

        
        const jugador = this.Mcolumnas[columna][fila].getJugador();

        let chipsSum = 1
    
        //count to left
        chipsSum += this.countLeft(columna, fila, jugador)
        if (chipsSum >= numberToWin) {
          return true
        }
        //count to right
        chipsSum += this.countRight(columna, fila, jugador)
        if (chipsSum >= numberToWin) {
          return true
        }
        //there is no winner horizontally
        chipsSum = 1
    
        //count to down
        chipsSum += this.countDown(columna, fila, jugador)
        if (chipsSum >= numberToWin) {
          return true
        }
        //there is no winner vertically
        chipsSum = 1
    
        //count down right diagonal
        chipsSum += this.countDownRight(columna, fila, jugador)
        if (chipsSum >= numberToWin) {
          return true
        }
        //count up left diagonal
        chipsSum += this.countUpLeft(columna, fila, jugador)
        if (chipsSum >= numberToWin) {
          return true
        }
        //there is no winner down-right/up-left diagonals
        chipsSum = 1
    
        //count down left diagonal
        chipsSum += this.countDownLeft(columna, fila, jugador)
        if (chipsSum >= numberToWin) {
          return true
        }
        //count up right diagonal
        chipsSum += this.countUpRight(columna, fila, jugador)
        if (chipsSum >= numberToWin) {
          return true
        }
    
        return false
      }



      countRight(columna, fila, state){
        let equalsQuantity = 0;
        columna++
        while (
          columna < this.columnas &&
          this.Mcolumnas[columna][fila].getJugador() == state
        ) {
          equalsQuantity++
          columna++
        }
        return equalsQuantity
      }
    
      /** Counts the number of consecutive chips of the same player */
      countLeft(columna , fila , state )  {
        let equalsQuantity = 0
        columna--
        while (columna >= 0 && this.Mcolumnas[columna][fila].getJugador() == state) {
          equalsQuantity++
          columna--
        }
        return equalsQuantity
      }
    
      /** Counts the number of consecutive chips of the same player */
      countDown(columna , fila , state )  {
        let equalsQuantity = 0
        fila--
        while (
          fila >= 0 &&
          this.Mcolumnas[columna][fila].getJugador() == state
        ) {
          equalsQuantity++
          fila--
        }
        return equalsQuantity
      }
    
      /** Counts the number of consecutive chips of the same player */
      countDownLeft(columna , fila , state )  {
        let equalsQuantity = 0
        fila++
        columna--
        while (
          fila < this.filas &&
          columna >= 0 &&
          this.Mcolumnas[columna][fila].getJugador() == state
        ) {
          equalsQuantity++
          fila++
          columna--
        }
        return equalsQuantity
      }
    
      /** Counts the number of consecutive chips of the same player */
      countDownRight(columna , fila , state )  {
        let equalsQuantity = 0
        fila++
        columna++
        while (
          fila < this.filas &&
          columna < this.columnas &&
          this.Mcolumnas[columna][fila].getJugador() == state
        ) {
          equalsQuantity++
          fila++
          columna++
        }
        return equalsQuantity
      }
    
      /** Counts the number of consecutive chips of the same player */
      countUpLeft(columna , fila , state )  {
        let equalsQuantity = 0
        fila--
        columna--
        while (
          fila >= 0 &&
          columna >= 0 &&
          this.Mcolumnas[columna][fila].getJugador() == state
        ) {
          equalsQuantity++
          fila--
          columna--
        }
        return equalsQuantity
      }
    
      /** Counts the number of consecutive chips of the same player */
      countUpRight(columna , fila , state )  {
        let equalsQuantity = 0
        fila--
        columna++
        while (
          fila >= 0 &&
          columna < this.columnas &&
          this.Mcolumnas[columna][fila].getJugador() == state
        ) {
          equalsQuantity++
          fila--
          columna++
        }
        return equalsQuantity
      }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    calcularcolumna(x, y){
       
        for(var i=0;i<this.entradaFichas.length;i++){

            if((x > this.entradaFichas[i].minX) && (x < this.entradaFichas[i].maxX) &&
               (y > this.entradaFichas[i].minY) && (y < this.entradaFichas[i].maxY)){
                
                return i;
            }
            
        }
        
        return -1;

    }

    deleteFicha(ficha){

        
         
        var index = this.fichas.indexOf(ficha);
                
        this.fichas.splice(index, 1);


    }

    draw(){
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#E5E5E5';
        
        //Fichero
        this.ctx.strokeRect((this.width/4)*0.6,0,this.width-(this.width/4)*1.2,this.height);
        
        var X = 0;
        var Y = 50;
        var r = this.r;
        
        
        
        
        for(let i = 0; i < this.filas; i++){
            Y += this.height/10;
            X =  this.width/2-(this.width/20*(3));
            
            for(let j = 0; j< this.columnas; j++){

                //en la primera fila se dibujaran todos los depositos de fichas
                if(i==0){
                  
                    this.ctx.beginPath();
                    this.ctx.moveTo(X,Y+(r-5));
                    this.ctx.lineTo(X-r,Y);
                    this.ctx.lineTo(X+r,Y);
                    this.ctx.closePath();
                    this.ctx.fillStyle='#2FE2A2';
                    this.ctx.fill();
                    
                    /* this.ctx.strokeRect(X-r,Y-(r*2),r*2,r*3); */

                    var tmp =   {  
                                    minX:X-r,
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
                    this.ctx.fillStyle = '#E5E5E5';
                    this.ctx.fill();

                      
                    X += this.width/20;
                }
            }
        }


        //Fichas Jug N°1
        this.ctx.strokeRect(0,0,(this.width/4)*0.6,this.height);

        //Fichas Jug N°2
        this.ctx.strokeRect((this.width/4)*3.4,0,(this.width/4)*0.6,this.height);
        
        //Info Games
        /* this.ctx.strokeRect((this.width/4)*0.6,(this.height/5)*4,(this.width/4)*2.8,this.height/5); */

        

    }

    drawFichas(path1, path2){

        

        var r = this.r;

        let min1 = r+5;
        let max1 = ((this.width/4)*0.6)-(r+5);
        

        let min2 = ((this.width/4)*3.4)+(r+5);
        let max2 = this.width-(r+5);
        
        let posXJ12 = (this.width/4)*0.3;
        let posXJ2 = (this.width/4)*3.7;
        let posY = (this.height/5)*4.5;

        for (var i = 0;i <this.fichasTotales/2; i++){
            
            let figureJug1 = new Ficha(Math.random() * (max1 - min1) + min1, posY, r, ctx, 1, path1);
            this.fichas.push(figureJug1);
            posY -= this.height/(this.fichasTotales/2)-4;
        }

        posY = (this.height/5)*4.5;

        for (var i = 0;i <this.fichasTotales/2; i++){
            
            
            let figureJug2 = new Ficha(Math.random() * (max2 - min2) + min2, posY, r, ctx, 2, path2);
            this.fichas.push(figureJug2);
            posY -= this.height/(this.fichasTotales/2)-4;
        }


    }



    reDraw(){

        this.ctx.lineWidth = this.lineWidth;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        
        //Fichero
        this.ctx.strokeRect((this.width/4)*0.6,0,this.width-(this.width/4)*1.2,this.height);
        
        var X = 0;
        var Y = 50;
        var r = this.r;
        this.ctx.strokeStyle = '#E5E5E5';
        
        for(let i = 0; i < this.columnas; i++){
            Y += this.height/10;
            X =  this.width/2-(this.width/20*3);
            
            for(let j = 0; j< this.filas; j++){

                if(i==0){


                  
                  if(!this.entradaLlena(j)){
                    this.dibujarFlechita(X,Y,r);
                  }
                

                  X += this.width/20;

                }

                else{
                    this.ctx.beginPath();
                    this.ctx.arc(X, Y, r, 0, 2 * Math.PI);
                    this.ctx.fillStyle = '#E5E5E5';
                    this.ctx.fill();

                    
                    X += this.width/20;
                }
            }
        }


        //Redibujar todas las fichas que ya se añadieron al tablero
        for(var i=0;i<this.fichasEnJuego.length;i++){

            this.fichasEnJuego[i].draw();

            /* this.ctx.beginPath();
                    this.ctx.arc(this.fichasEnJuego[i].posX, this.fichasEnJuego[i].posY, r, 0, 2 * Math.PI);
                    this.ctx.fillStyle = this.fichasEnJuego[i].color;
                    this.ctx.fill(); */

        }


        //Fichas Jug N°1
        this.ctx.strokeRect(0,0,(this.width/4)*0.6,this.height);

        //Fichas Jug N°2
        this.ctx.strokeRect((this.width/4)*3.4,0,(this.width/4)*0.6,this.height);
        
        //Info Games
        /* this.ctx.strokeRect((this.width/4)*0.6,(this.height/5)*4,(this.width/4)*2.8,this.height/5); */


    }

    entradaLlena(indice){

      for(var i=0;i<this.entradaFichas.length;i++){

        if(this.entradaFichas[i] == this.entradaFichas[indice] && this.entradaFichas[i].minX == 0){
          return true;
        }

      }
      return false;

    }

    dibujarFlechita(X,Y,r){

      this.ctx.beginPath();
      this.ctx.moveTo(X,Y+(r-5));
      this.ctx.lineTo(X-r,Y);
      this.ctx.lineTo(X+r,Y);
      this.ctx.closePath();
      this.ctx.fillStyle='#2FE2A2';
      this.ctx.fill();

    }





}