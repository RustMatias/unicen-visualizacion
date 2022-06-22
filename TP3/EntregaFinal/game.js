

let canvas = document.getElementById("canvas");
let timerHTML = document.querySelector("#timer");
/** @type {CanvasRenderingContext2D} */

let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;
let board = new Board(height, width, ctx);
let fichaClicked = null;
let posInicialX;
let posInicialY;

let turnoJugador = 1;

let segundos = 0;
let minutos = document.getElementById("timerSelect").value;
let interval;
 
let fichaJ1 = document.getElementById("fichaj1").value;
let fichaJ2 = document.getElementById("fichaj2").value;

document.getElementById("fichaj1").onchange = function(){
    fichaJ1 = document.getElementById("fichaj1").value;
}

document.getElementById("fichaj2").onchange = function(){
    fichaJ2 = document.getElementById("fichaj2").value;
}


document.getElementById("botonInicio").addEventListener("click", ()=>{
    
    createBoard();

})

document.getElementById("timerSelect").addEventListener("click", ()=>{
    
    minutos = document.getElementById("timerSelect").value;

})

document.getElementById("menu").addEventListener("click", ()=>{
    document.getElementById("canvasInicio").style.display = "flex";
    document.getElementById("canvasInfo").style.display = "none";
    clearInterval(interval);
    segundos = 0;
    minutos = document.getElementById("timerSelect").value;
    
    board.reset();
    ctx.clearRect(0,0,width,height);

    document.querySelector("#canvas-info-buttons")
    .innerHTML = '<div class="canvas-info-buttons" id="canvas-info-buttons"> <h3 class="turnos selected"id="T1">Turno Jugador 1</h3><h3 class="turnos"id="T2">Turno Jugador 2</h3></div>'
    turnoJugador = 1;

})


if(document.querySelector("#T1") != null){
    let t1Html = document.querySelector("#T1");
    t1Html.classList.toggle("selected");
}


function createBoard(){
    document.getElementById("canvasInicio").style.display = "none";
    board.draw();
    board.drawFichas(fichaJ1, fichaJ2);
    createTimer();
    document.getElementById("canvasInfo").style.display = "flex";


}



function createTimer(){
    interval = setInterval(()=>{
        timerHTML.innerHTML = minutos + " : " + segundos;
        segundos--
        if(segundos < 0){
            minutos--;
            segundos = 59;
        }
        if(minutos < 0){
            timerHTML.innerHTML = "Fuera de tiempo";
            clearInterval(interval);
        }
    },1000)
}




function getMousePos(canvas, evt){

    let ClientRect = canvas.getBoundingClientRect();

    return {
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
    }

}

function reDrawFichas(){

    for(var i = 0; i<board.fichas.length;i++){

        board.fichas[i].draw(fichaJ1, fichaJ2);

    }

}

function reDrawAll(){

    ctx.clearRect(0,0,width,height);
    board.reDraw();
    reDrawFichas();

}


canvas.onmousedown = function(event){

    var {x,y} = getMousePos(canvas,event);

    
    if(minutos >= 0){
        for(var i=0; i<board.fichas.length;i++){

            if(board.fichas[i].isClicked(x,y)){

        
                if(turnoJugador == 1 && board.fichas[i].jugador == 1){
                    fichaClicked = board.fichas[i];
                    posInicialX = fichaClicked.getPosX();
                    posInicialY = fichaClicked.getPosY();

                    
                    
                }else if(turnoJugador == 2 && board.fichas[i].jugador == 2){
                    fichaClicked = board.fichas[i];
                    posInicialX = fichaClicked.getPosX();
                    posInicialY = fichaClicked.getPosY();

                
                }
            }
        }
    }
}


canvas.onmousemove = function(event){
    
    var {x,y} = getMousePos(canvas,event);

    if(fichaClicked != null){

        fichaClicked.setPosX(x);
        fichaClicked.setPosY(y);
        /* fichaClicked.reDraw(x,y); */
        reDrawAll();

    }
}

canvas.onmouseup = function(event){

    if(fichaClicked != null){

        var {x,y} = getMousePos(canvas,event);
        if(board.esEntrada(x , y, fichaClicked)){
            /*  board.deleteFicha(fichaClicked); */

                if(turnoJugador == 1){
                    turnoJugador = 2;
                }
                else{
                    turnoJugador = 1;
                }

           

            if(document.querySelector("#T1") != null){
                let t1Html = document.querySelector("#T1");
                t1Html.classList.toggle("selected");
            }
            if(document.querySelector("#T1") != null){
                let t2Html = document.querySelector("#T2");
                t2Html.classList.toggle("selected");
            }

            reDrawAll();
        }
        else{
            fichaClicked.setPosX(posInicialX);
            fichaClicked.setPosY(posInicialY);
            reDrawAll();
        }
        fichaClicked = null;

    }

}

canvas.onmouseleave = function(event){

    if(fichaClicked!=null){
        fichaClicked.setPosX(posInicialX);
        fichaClicked.setPosY(posInicialY);
        reDrawAll();
        fichaClicked = null;
    }
    
}

let rstButton = document.querySelector("#rst");
rstButton.addEventListener("click", ()=>{
    document.querySelector("#canvas-info-buttons")
    .innerHTML = '<div class="canvas-info-buttons" id="canvas-info-buttons"> <h3 class="turnos selected"id="T1">Turno Jugador 1</h3><h3 class="turnos"id="T2">Turno Jugador 2</h3></div>'
    turnoJugador = 1;
    clearInterval(interval);
    segundos = 0;
    minutos = document.getElementById("timerSelect").value;
    
    ctx.clearRect(0,0,width,height);
    board.reset();
    createBoard(); 
    
});









/* function generarColor(){

    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);

    return `rgb(${r},${g},${b})`;
} */

