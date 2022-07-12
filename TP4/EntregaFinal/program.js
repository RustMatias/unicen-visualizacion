
let character = new Character(
    document.querySelector("#squirrel"),
    document.querySelector("#squirrel").getBoundingClientRect().width,
    document.querySelector("#squirrel").getBoundingClientRect().height,
    document.querySelector("#squirrel").getBoundingClientRect().left,
    document.querySelector("#squirrel").getBoundingClientRect().top,
)

let obstaculo = new Obstaculo(
    document.querySelector("#obstaculo"),
)

let obstaculo2 = new Obstaculo(
    document.querySelector("#obstaculo2"),
)

let Acoin = new coin(
    document.querySelector("#Acoin")
)
    

let interval = null;


let puntosActuales = 0;
let puntosMaximos = 0;
let puntosHTML =document.querySelector("#puntos");

//Boton inicio
document.querySelector("#buttonPlayScroll").addEventListener("click", ()=>{
   
    puntosActuales = 0;
    document.querySelector("#squirrel").style.background = "url(img/squirrel.png)";
    document.querySelector("#inicioGame").style.display = "none"
    
    document.querySelector("#infoRun").classList.toggle("info-run");
    document.querySelector("#squirrel").classList.toggle("squirrel");
    document.querySelector("#squirrel2").classList.toggle("squirrel2");
    document.querySelector("#obstaculo").classList.toggle("obstaculo");
    document.querySelector("#obstaculo2").classList.toggle("ave");
    document.querySelector("#Acoin").classList.toggle("Acoin");
    document.querySelector("#infoRun").style.visibility = "visible";
    document.querySelector("#layer1").classList.toggle("layer-1");
    document.querySelector("#layer2").classList.toggle("layer-2");
    document.querySelector("#layer3").classList.toggle("layer-3");
    document.querySelector("#layer4").classList.toggle("layer-4");
    document.querySelector("#layer5").classList.toggle("layer-5");
    document.querySelector("#layer6").classList.toggle("layer-6");
    document.querySelector("#layer7").classList.toggle("layer-7");
    document.querySelector("#layer8").classList.toggle("layer-8");
    document.querySelector("#layer9").classList.toggle("layer-9");
    document.querySelector("#layer10").classList.toggle("layer-10");
    document.querySelector("#aguila").classList.toggle("aguila");

    if(interval != null){
        clearInterval(interval);
    }
   
    
    interval = setInterval(()=>{
        let obs =Math.random() * 2;
        console.log(obs)
        if(obs > 1){
            document.querySelector("#obstaculo").style.background = "url(img/obs1.png)";
        }else{
            document.querySelector("#obstaculo").style.background = "url(img/obs2.png)";
        }
        
    },5000)
    

    let intervalId = setInterval(function(){
        console.log(puntosActuales);
        puntosHTML.innerHTML = puntosActuales;

        if(puntosActuales>puntosMaximos){
            puntosMaximos = puntosActuales;
            document.querySelector("#maxPuntos").innerHTML = puntosMaximos;
        }
        if(KeyDown){
            character.jump();
        }
    
        if(checkCollisionCoin()){
            document.querySelector("#Acoin").classList.toggle("Acoin");
            setTimeout(()=>{
                document.querySelector("#Acoin").classList.toggle("Acoin");
            },1000)
            character.getingCoin();
            puntosActuales++;
            document.querySelector("#puntajeInfo").innerHTML ="Tu puntaje fue: " + puntosActuales+ "," + "Tu puntaje maximo:" + puntosMaximos;
        }
        if(checkCollision()){
            clearInterval(intervalId);
            fin();
            document.querySelector("#puntajeInfo").innerHTML ="Tu puntaje fue: " + puntosActuales + ", Tu puntaje maximo:" + puntosMaximos;
        }
       
        if(puntosActuales == 10){
            clearInterval(intervalId);
            fin();
            document.querySelector("#puntajeInfo").innerHTML ="GANASTE, HICISTE 10 PUNTOS";
        }
        
    
    }, 50);
})



var KeyDown = false;
window.addEventListener("keydown", ()=>{
    KeyDown = true;
});
window.addEventListener("keyup", ()=>{
    KeyDown = false;
});






function checkCollisionCoin(){
    if (character.getRight() > Acoin.getLeft() && character.getLeft() < Acoin.getRight() && character.getBottom() > Acoin.getBottom()) {

        return true;
    }
    return false;
}


function checkCollision(){
    if (character.getRight() > obstaculo.getLeft() && character.getLeft() < obstaculo.getRight() && character.getBottom() > obstaculo.getBottom()) {

        return true;
    }
    else if (character.getRight() > obstaculo2.getLeft() && character.getLeft() < obstaculo2.getRight() && character.getBottom() > obstaculo.getBottom()){
        
        return true;
    }
    else{
        return false;
    }
    
}



function fin(){
    document.querySelector("#squirrel").style.background = "none";
    document.querySelector("#squirrel").classList.toggle("squirrel");
    document.querySelector("#squirrel2").classList.toggle("squirrel2");
    document.querySelector("#obstaculo").classList.toggle("obstaculo");
    document.querySelector("#inicioGame").style.display = "flex"
    document.querySelector("#infoRun").classList.toggle("info-run");
    document.querySelector("#infoRun").style.visibility = "hidden";
    document.querySelector("#obstaculo2").classList.toggle("ave");
    document.querySelector("#Acoin").classList.toggle("Acoin");
    document.querySelector("#aguila").classList.toggle("aguila");
    document.querySelector("#layer1").classList.toggle("layer-1");
    document.querySelector("#layer2").classList.toggle("layer-2");
    document.querySelector("#layer3").classList.toggle("layer-3");
    document.querySelector("#layer4").classList.toggle("layer-4");
    document.querySelector("#layer5").classList.toggle("layer-5");
    document.querySelector("#layer6").classList.toggle("layer-6");
    document.querySelector("#layer7").classList.toggle("layer-7");
    document.querySelector("#layer8").classList.toggle("layer-8");
    document.querySelector("#layer9").classList.toggle("layer-9");
    document.querySelector("#layer10").classList.toggle("layer-10");
    console.log("collision")
}