
let canvas = document.getElementById("canvas");

/** @type {CanvasRenderingContext2D} */

let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let h = 30;
let w = 30;

let cantidadFiguras = 0;

function createBoard(){
    let board = new Board(height, width, ctx);
    board.draw();
}

function draw(){

    for (var i = 0;i < cantidadFiguras; i++){
        let posX = Math.random() * width;
        let posY = Math.random() * height;
        let figure = new Figure(generarColor(),h,w,posX,posY,i,ctx);
        figure.draw();
    }

}

/* function generarColor(){

    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);

    return `rgb(${r},${g},${b})`;
} */


function getMousePos(canvas, evt){

    let ClientRect = canvas.getBoundingClientRect();

    return {
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
    }

}

draw();
createBoard();
