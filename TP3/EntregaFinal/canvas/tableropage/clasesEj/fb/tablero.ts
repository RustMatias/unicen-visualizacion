import { Fichas } from "./fichas";

export class Tablero {
  fichas:Array<Fichas> = [];
  //numero de filas y columnas que deberia tener la tabla (x se va a modificar para poder agregar mas columnas)
  x:number = 7;
  y:number = 6;
  //radio de los circulos
  radio:number = 20;
  //donde inicia las secciones de fichas y tablero
  inicioY:number=120;
  
  cantfichas:number;
  //margen vertical
  margen:number;
  //total width y heigh del canvas
  totalW:number;
  totalH:number;
  //ancho seccion fichas
  secW:number =120;

  radiotablero:number = this.radio+1;


  
  tablero : Array<any> = [];
  depositadores : Array<any> = [];


  //para saber si hay ganadores
  connect = 4;
  


  constructor(private ctx:CanvasRenderingContext2D,w:number,h:number,m:number){
    this.totalW = w;
    this.totalH = h;
    this.margen = m;
  }

  calcularfichas():void{
    this.cantfichas = (this.x*this.y)/2;
  }

  seccionesfichas(w:number,h:number):void{
    var ctx=this.ctx;
    var x1 = this.margen;
    var y = this.inicioY;
    var x2 = this.totalW-this.margen-w;
    ctx.textAlign = "center";
    ctx.strokeText('Jugador 1',x1+w/2,y-this.margen,w);
    ctx.strokeText('Jugador 2',x2+w/2,y-this.margen,w);
    
     ctx.strokeRect(x1,y,w,h);
     ctx.strokeRect(x2,y,w,h);
     this.cargarfichas(w,h,x1,x2,y);
  }

  cargarfichas(w:number,h:number,x1:number,x2:number,y:number):void{
    this.calcularfichas();
    var ctx = this.ctx;
    //radio de las fichas
    var radio = this.radio;
    //margent interno
    var m = 5;
    for (var i =0 ; i < this.cantfichas; i++) {
      //random utilizado abajo Math.floor(Math.random() * (max - min) + min;
      var fichaRojaX= Math.floor(Math.random() * ((w+x1-m-radio) - (x1+m+radio))) + (x1+m+radio);
      var fichasY = Math.floor(Math.random() * ((h+y-m-radio) - (y+m+radio))) + (y+m+radio);
      var fichaAzulX =Math.floor(Math.random() * ((w+x2-m-radio) - (x2+m+radio))) + (x2+m+radio);
      //solo se utilizan en caso de que las secciones sean distintas en altura o posicion de Y; 
      // var fichaRojaY= Math.floor(Math.random() * ((h+y-m-radio) - (y+m+radio))) + (y+m+radio);
      // var fichaAzulY =Math.floor(Math.random() * ((h+y-m-radio) - (y+m+radio))) + (y+m+radio);

      var ficharoja = new Fichas(fichaRojaX,fichasY,'red', radio,ctx,1);
      var fichaazul = new Fichas(fichaAzulX,fichasY ,'blue', radio,ctx,2);

      fichaazul.dibujar();
      ficharoja.dibujar();

      this.fichas.push(fichaazul);
      this.fichas.push(ficharoja);
    }
  }

  dibujar():void{
    var y=this.inicioY;
    var secH =this.totalH - this.margen - y;
    this.seccionesfichas(this.secW,secH);
    var tableroX = (this.margen*2)+this.secW;
    var tableroY = y;
    var tableroWidth = this.totalW-(this.margen*4)-(this.secW*2);
    var tableroHeight = secH;
    //tablero
    this.dibujartablero(tableroX,tableroY,tableroWidth,tableroHeight);
    // this.ctx.strokeRect((this.margen*2)+this.secW,y,this.totalW-(this.margen*4)-(this.secW*2),secH);
    //continuar codeo de tablero de izquierda a derecha en lo posible por columnas
    this.dibujarPrincipal(tableroX,tableroY);
    this.dibujarDepositadores();


    console.log(this.fichas);
  }

  dibujartablero(x:number,y:number,w:number,h:number){
    var ctx = this.ctx;
    ctx.strokeRect(x,y,w,h);
  }  


  dibujarPrincipal(x:number,y:number){
    var ctx = this.ctx;
    var radio = this.radiotablero;

    var margen = 10;
    var origenX = x + margen *10;
    var origenY = y + margen *10;


    var calculoX : number = origenX;
    // Calculo X va a ser la posicion X donde se esta creando la ficha del tablero desocupado, y lo quiero guardar ya que en mi matriz logica voy a guardar los datos asi son mas facil de dibujar luego
    // CalculoX = OrigenX + margen + radio/2;
    var calculoY : number = origenY;
    // CalculoY = OrigenY + margen + altura/2;
    

     for(var i = 0; i < this.y ; i++){
       // por cada fila de la matriz
       // debera modificar calculoY para que se use en toda la generacion de espacios desocupados
       calculoX = origenX;
       let columna : Array<any> = new Array();
         for(var j = 0; j < this.x ; j++){
           // por cada espacio de la columna
           // Aca debera crear una figura de canvas desocupada en el tablero y guardar la posicion X, posicion Y en la matriz logica.
          this.dibujarDesocupado(ctx, calculoX, calculoY, radio);

          var tmp = {
             ocupado: false,
             posX: calculoX,
             posY: calculoY,
             jugador: 0,
          }
          // console.log("X:"+calculoX+" Y:"+calculoY);
          //Ahora debera actualizar la posicion X en la proxima figura canvas
          calculoX += margen + (radio*2);
          columna.push(tmp);

         }

         //Ahora debera actualizar la posicion Y para la proxima fila
        calculoY += margen + (radio*2);
        this.tablero.push(columna);
     }
  }

  reDibujarPrincipal(x:number,y:number){
    var ctx = this.ctx;
    var radio = this.radiotablero;

    var margen = 10;
    var origenX = x + margen *10;
    var origenY = y + margen *10;


    var calculoX : number = origenX;
    // Calculo X va a ser la posicion X donde se esta creando la ficha del tablero desocupado, y lo quiero guardar ya que en mi matriz logica voy a guardar los datos asi son mas facil de dibujar luego
    // CalculoX = OrigenX + margen + radio/2;
    var calculoY : number = origenY;
    for(var i = 0; i < this.y ; i++){
      // por cada fila de la matriz
      // debera modificar calculoY para que se use en toda la generacion de espacios desocupados
      calculoX = origenX;
        for(var j = 0; j < this.x ; j++){
          // por cada espacio de la columna
          // Aca debera crear una figura de canvas desocupada en el tablero y guardar la posicion X, posicion Y en la matriz logica.
        if(this.tablero[i][j].ocupado == false){
          this.dibujarDesocupado(ctx, calculoX, calculoY, radio);
        }
        else if(this.tablero[i][j].numero == 1){
          this.dibujarOcupado(ctx, calculoX, calculoY, radio, 'red');
        } else {
          this.dibujarOcupado(ctx, calculoX, calculoY, radio, 'blue');
        }
         // console.log("X:"+calculoX+" Y:"+calculoY);
         //Ahora debera actualizar la posicion X en la proxima figura canvas
         calculoX += margen + (radio*2);

        }

        //Ahora debera actualizar la posicion Y para la proxima fila
       calculoY += margen + (radio*2);
    }
  }

  dibujarDepositadores(){
    var margen = 10 ;
    var alto = 30;
    var ancho = this.radio*2 + 5;

    for(var i = 0; i < this.x; i++){
      var minX = this.tablero[0][i].posX - margen * 2.2;
      var minY = this.tablero[0][i].posY - this.radio - margen * 5;

      var tmp = {
        minX : minX,
        minY : minY,
        ancho : ancho,
        alto : alto,
        columna : i
      }

      this.ctx.strokeRect(minX,minY,ancho,alto);
      this.depositadores.push(tmp);
    }
  }

  dibujarDesocupado(ctx:CanvasRenderingContext2D, x:number, y:number, radio:number){
    ctx.beginPath();
          ctx.arc(x, y, radio, 0, 2 * Math.PI);
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.lineWidth = 1;
  }

  dibujarOcupado(ctx:CanvasRenderingContext2D, x:number, y:number, radio:number, color:string){
    ctx.beginPath();
          ctx.arc(x, y, radio, 0, 2 * Math.PI);
          ctx.fillStyle = 'black';
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.fillStyle = color;
          ctx.fill();
          ctx.lineWidth = 1;
  }

  colocar(ficha:Fichas , x:number , y:number) :boolean {
    for(var i = 0; i < this.depositadores.length; i++){
      var elem = this.depositadores[i];

      if(( (x >= elem.minX) && (x <= (elem.minX + elem.ancho)) ) && ( (y >= elem.minY ) && (y <= (elem.minY + elem.alto)))){
        
        return this.colocarFicha(this.depositadores[i].columna, ficha);
      }
    }
    return false;
  }

  colocarFicha(columna:number, ficha:Fichas):boolean{
    // Esta funcion encuentra una posicion del arreglo donde este desocupado y coloca la ficha del color que le pasaron.

    var maxH = this.y - 1;
    if(columna<=this.x){
      for(let i = maxH ; i >= 0; i--){
         if(this.tablero[i][columna].ocupado == false){
           this.dibujarOcupado(this.ctx, this.tablero[i][columna].posX , this.tablero[i][columna].posY, this.radio, ficha.color);
           this.tablero[i][columna].ocupado = true;
           if(ficha.jugador == 1){
            this.tablero[i][columna].numero = 1;
           } else {
            this.tablero[i][columna].numero = 2;
           }
           this.eliminarFicha(ficha);
           return true;
         }
      }
    }
    return false;
  }

  eliminarFicha(ficha:Fichas){
    var index = this.fichas.indexOf(ficha);
    this.fichas.splice(index,1);
  }


  //devuelve posicion del mouse
  getMousePosicion(event: MouseEvent) : {x:number,y:number}{
    var clickX =  Math.round(event.clientX - this.ctx.canvas.getBoundingClientRect().x);
    var clickY = Math.round(event.clientY - this.ctx.canvas.getBoundingClientRect().y);    
    return {x:clickX , y:clickY};
  }
  
  redibujar(ficha:Fichas | null){
    this.ctx.clearRect(0,this.inicioY-20,this.totalW,this.totalH)
    var y=this.inicioY;
    var secH =this.totalH - this.margen - y;
    this.redibujarSecciones(this.secW,secH);
    this.redibujarFichas();
    var tableroX = (this.margen*2)+this.secW;
    var tableroY = y;
    var tableroWidth = this.totalW-(this.margen*4)-(this.secW*2);
    var tableroHeight = secH;
    //tablero
    this.dibujartablero(tableroX,tableroY,tableroWidth,tableroHeight);
    // this.ctx.strokeRect((this.margen*2)+this.secW,y,this.totalW-(this.margen*4)-(this.secW*2),secH);
    //continuar codeo de tablero de izquierda a derecha en lo posible por columnas
    this.reDibujarPrincipal(tableroX,tableroY);
    this.dibujarDepositadores();
    if(ficha!=null)
      ficha.dibujar();
  }
  
 // Logica para saber ganadores

 cuentaArriba(x:number, y:number, jugador:number) {
  let startY = (y - this.connect >= 0) ? y - this.connect + 1 : 0;
  let counter = 0;
  for (; startY <= y; startY++) {
      if (this.tablero[startY][x].numero == jugador) {
          counter++;
      } else {
          counter = 0;
      }
  }
  return counter;
}

cuentaDerecha(x:number, y:number, jugador:number) {
  let endX = (x + this.connect < this.x) ? x + this.connect - 1 : this.x - 1;
  let counter = 0;
  for (; x <= endX; x++) {
      if (this.tablero[y][x].numero == jugador) {
          counter++;
      } else {
          counter = 0;
      }
  }
  return counter;
}

cuentaArribaDerecha(x:number, y:number, jugador:number) {
  let endX = (x + this.connect < this.x) ? x + this.connect - 1 : this.x - 1;
  let startY = (y - this.connect >= 0) ? y - this.connect + 1 : 0;
  let counter = 0;
  while (x <= endX && startY <= y) {
      if (this.tablero[y][x].numero == jugador) {
          counter++;
      } else {
          counter = 0;
      }
      x++;
      y--;
  }
  return counter;
}

cuentaAbajoDerecha(x:number, y:number, jugador:number) {
  let endX = (x + this.connect < this.x) ? x + this.connect - 1 : this.x - 1;
  let endY = (y + this.connect < this.y) ? y + this.connect - 1 : this.y - 1;
  let counter = 0;
  while (x <= endX && y <= endY) {
      if (this.tablero[y][x].numero == jugador) {
          counter++;
      } else {
          counter = 0;
      }
      x++;
      y++;
  }
  return counter;
}

verificarGanador():number{
  if(this.hayGanador(1)){
    return 1;
  }
  else if(this.hayGanador(2)){
    return 2;
  } else if(this.hayEmpate()){
    return 3;
  }
return 0;
}

hayGanador(jugador:number) : boolean {
  for (let y = 0; y < this.y; y++) {
      for (let x = 0; x < this.x; x++) {
          let count = 0;
          count = this.cuentaArriba(x, y, jugador);
          if (count >= this.connect) return true;
          count = this.cuentaDerecha(x, y, jugador);
          if (count >= this.connect) return true;
          count = this.cuentaArribaDerecha(x, y, jugador);
          if (count >= this.connect) return true;
          count = this.cuentaAbajoDerecha(x, y, jugador);
          if (count >= this.connect) return true;
      }
  }
  return false;
}

hayEmpate() {
  for (let y = 0; y < this.y; y++) {
      for (let x = 0; x < this.x; x++) {
          const currentCell = this.tablero[y][x];
          if (currentCell.jugador == 0) {
              return false;
          }
      }
  }
  return true;
}

redibujarSecciones(w:number,h:number):void{
    var ctx=this.ctx;
    var x1 = this.margen;
    var y = this.inicioY;
    var x2 = this.totalW-this.margen-w;
    ctx.textAlign = "center";
    ctx.strokeText('Jugador 1',x1+w/2,y-this.margen,w);
    ctx.strokeText('Jugador 2',x2+w/2,y-this.margen,w);
    
     ctx.strokeRect(x1,y,w,h);
     ctx.strokeRect(x2,y,w,h);
  }

redibujarFichas(){
    for (let i=0; i<this.fichas.length;i++){
      this.fichas[i].dibujar();
    }
  }

reiniciar(){
  this.fichas = [];
  this.tablero = [];
  this.depositadores = [];
}

}
