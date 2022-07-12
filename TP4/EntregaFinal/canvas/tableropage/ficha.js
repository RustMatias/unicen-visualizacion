class Ficha {

    constructor(posX, posY, radio, ctx, jugador){
        this.posX = posX;
        this.posY = posY;
        this.ctx = ctx;
        this.radio = radio;
        this.jugador = jugador;
        this.img = document.createElement('img');
        this.img.src = 'img/empty.png';
        this.setImgJugador(this.jugador);
    }


    //Setear posicion de la ficha y dibujarla
    setPosition(x, y){
      this.posX = x;
      this.posY = y;
      this.draw();
    }


    //Obtener Jugador
    getJugador(){
        return this.state
    }
  

    //Retoria si xy esta sobre el circulo
    isClicked(x, y) {
      const _x = this.posX - x
      const _y = this.posY - y
      return Math.sqrt(_x * _x + _y * _y) < this.radius
    }

    //setea el jugador
    setJugador(jugador){
        this.jugador = jugador;
        this.setImgJugador(jugador);
    }

    //Setea la imagen correspondiente al jugador
    setImgJugador(jugador){
        if (jugador == 1) {
         this.img.src = 'img/greenChip.png'
        } else if (jugador == 2) {
         this.img.src = 'img/purpleChip.png'
        }
    }

    /** Draw the object in the canvas */
    draw(){
        this.ctx.drawImage(
            this.img,
            this.posX,
            this.posY 
        )
    }



  }
  