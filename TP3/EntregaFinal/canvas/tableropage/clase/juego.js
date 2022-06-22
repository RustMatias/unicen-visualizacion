

let canvas = document.querySelector("#myCanvas");
let ctx = canvas.getContext("2d");
let radio = 15;
let array = [];
let contadorRojo = 0;
let contadorAzul = 0;

let cantFichas = 10;

for(let i = 0; i < cantFichas; i++){

    let fichaJuegoRoja = new Ficha(20+radio, 20 * ((i+1)*2), radio, '#ff0000', ctx);
    let fichaJuegoAzul = new Ficha(80+radio, 20 * ((i+1)*2), radio, '#0000ff', ctx);
    fichaJuegoRoja.draw();
    fichaJuegoAzul.draw();
    array.push(fichaJuegoRoja);
    array.push(fichaJuegoAzul);
}
   
canvas.addEventListener("click", function(event){
    
    for(let i = 0; i < array.length ; i++){

        if(array[i].isClicked(getMousePos(canvas,event))){

            if(array[i].color == '#ff0000'){
                contadorRojo++;
            }
            else if(array[i].color == '#0000ff'){
                    contadorAzul++;
            }
            verificarContador();
            console.log("|Rojo: " + contadorRojo + "|Azul: " + contadorAzul + "|")
        }
    }

});

function getMousePos(canvas, event){

    let ClientRect = canvas.getBoundingClientRect();
    return {x: Math.round(event.clientX - ClientRect.left),
            y: Math.round(event.clientY - ClientRect.top)
    }

}

function verificarContador(){
    if(contadorRojo == 3){
        alert("Gano el equipo ROJO");
    }else if(contadorAzul == 3){
        alert("Gano el equipo AZUL");
    }
}
