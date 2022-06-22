

let canvas = document.getElementById("canvas");

/** @type {CanvasRenderingContext2D} */

let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;
let board = new Board(height, width, ctx);
let fichaClicked = null;

let turnoJugador = 1;
if(document.querySelector("#T1") != null){
    let t1Html = document.querySelector("#T1");
    t1Html.classList.toggle("selected");
}

document.querySelector("#select-canvas").onchange = function(){
    console.log(document.querySelector("#select-canvas").value);
    board.setColumnas(document.querySelector("#select-canvas").value);
    reDrawAll();
};


function createBoard(){
    
    board.draw();

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

        board.fichas[i].draw();

    }

}

function reDrawAll(){

    ctx.clearRect(0,0,width,height);
    board.reDraw();
    reDrawFichas();

}


canvas.onmousedown = function(event){

    var {x,y} = getMousePos(canvas,event);

    for(var i=0; i<board.fichas.length;i++){

        if(board.fichas[i].isClicked(x,y)){

     
            if(turnoJugador == 1 && board.fichas[i].color == '#ff0000'){
                fichaClicked = board.fichas[i];

                
                
            }else if(turnoJugador == 2 && board.fichas[i].color == '#0000ff'){
                fichaClicked = board.fichas[i];

            
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

            

            
            reDrawAll();

            if(document.querySelector("#T1") != null){
                let t1Html = document.querySelector("#T1");
                t1Html.classList.toggle("selected");
            }
            if(document.querySelector("#T1") != null){
                let t2Html = document.querySelector("#T2");
                t2Html.classList.toggle("selected");
            }
        }
        fichaClicked = null;

    }

}

createBoard(); 


/* function generarColor(){

    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);

    return `rgb(${r},${g},${b})`;
} */

