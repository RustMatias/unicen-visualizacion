
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

let obstaculo3 = new Obstaculo(
    document.querySelector("#obstaculo3"),
)

let Acoin = new coin(
    document.querySelector("#Acoin")
)
    

let interval = null;
let hard = false;
let spiderIsOn = false;
let puntosActuales = 0;
let puntosMaximos = 0;
let puntosHTML =document.querySelector("#puntos");

//Boton inicio
document.querySelector("#buttonPlayScroll").addEventListener("click", ()=>{
   
    puntosActuales = 0;
    document.querySelector("#squirrel").style.background = "url(img/squirrel.png)";
    document.querySelector("#inicioGame").style.display = "none"
    document.querySelector("#buttons-game-down").style.marginTop = "408px";
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
    document.querySelector("#layer3").style.backgroundImage = "url(./img/3.png)"
    document.querySelector("#layer4").style.backgroundImage = "url(./img/4.png)"
    document.querySelector("#layer5").style.backgroundImage = "url(./img/5.png)"
    document.querySelector("#layer6").style.backgroundImage = "url(./img/6.png)"
    document.querySelector("#layer7").style.backgroundImage = "url(./img/7.png)"
    document.querySelector("#layer8").style.backgroundImage = "url(./img/8.png)"
    document.querySelector("#layer10").style.backgroundImage = "url(./img/10.png)"

    
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
            document.querySelector("#puntajeInfo").innerHTML ="Tu puntaje fue: " + puntosActuales+ " | " + "Tu puntaje maximo:   " + puntosMaximos;
        }

        if(puntosActuales >=5 && !spiderIsOn){
            let obs = Math.random() * 100;
            if (obs < 2 ){
                spiderIsOn = true;
                document.querySelector("#arania").classList.toggle("arania");
                document.querySelector("#obstaculo3").classList.toggle("obstaculooff");
                document.querySelector("#obstaculo3").classList.toggle("obstaculo3");
                setTimeout(()=>{
                    if(spiderIsOn){
                        document.querySelector("#obstaculo3").classList.toggle("obstaculooff");
                        document.querySelector("#arania").classList.toggle("arania");
                        document.querySelector("#obstaculo3").classList.toggle("obstaculo3");    
                        spiderIsOn = false;
                    }
                    
                },3000)
                
                
                
            }
            if(!hard){
                hard = true;

                document.querySelector("#layer3").style.backgroundImage = "url(./img/32.png)"
                document.querySelector("#layer4").style.backgroundImage = "url(./img/42.png)"
                document.querySelector("#layer5").style.backgroundImage = "url(./img/52.png)"
                document.querySelector("#layer6").style.backgroundImage = "url(./img/62.png)"
                document.querySelector("#layer7").style.backgroundImage = "url(./img/72.png)"
                document.querySelector("#layer8").style.backgroundImage = "url(./img/82.png)"
                document.querySelector("#layer10").style.backgroundImage = "url(./img/102.png)"
                 
            }
        }


        if(checkCollision()){
            clearInterval(intervalId);
            fin();
            hard = false;
            document.querySelector("#puntajeInfo").innerHTML ="Tu puntaje fue: " + puntosActuales + " | Tu puntaje maximo: " + puntosMaximos;
        }
       
        if(puntosActuales == 10){
            clearInterval(intervalId);
            fin();

            document.querySelector("#puntajeInfo").innerHTML ="¡GANASTE! HICISTE 10 PUNTOS";
            puntosMaximos = 0;
            document.querySelector("#maxPuntos").innerHTML = puntosMaximos;
        }
        
       
        

        

    
    }, 50);
})



var KeyDown = false;
window.addEventListener("keydown", (event)=>{
    if(event.key == "w" || event.key == "W"){
        KeyDown = true;
    } 
    console.log(event)
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
    //obstaculo1
    if (character.getRight() > obstaculo.getLeft() && character.getLeft() < obstaculo.getRight() && character.getBottom() > obstaculo.getBottom()) {

        return true;
    }

    //obstaculo2
    else if (character.getRight() > obstaculo2.getLeft() && character.getLeft() < obstaculo2.getRight() && character.getBottom() > obstaculo.getBottom()){
        
        return true;
    }

    //obstaculo3
    else if (character.getRight() > obstaculo3.getLeft() && character.getLeft() < obstaculo3.getRight() && character.getTop() < obstaculo3.getTop()){
        
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
    document.querySelector("#layer3").style.backgroundImage = "none"
    document.querySelector("#layer4").style.backgroundImage = "none"
    document.querySelector("#layer5").style.backgroundImage = "none"
    document.querySelector("#layer6").style.backgroundImage = "none"
    document.querySelector("#layer7").style.backgroundImage = "none"
    document.querySelector("#layer8").style.backgroundImage = "none"
    document.querySelector("#layer10").style.backgroundImage = "none"

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
        document.querySelector("#buttons-game-down").style.marginTop = "353px";
    if(spiderIsOn){
        document.querySelector("#obstaculo3").classList.toggle("obstaculooff");
        document.querySelector("#arania").classList.toggle("arania");
        document.querySelector("#obstaculo3").classList.toggle("obstaculo3"); 
        spiderIsOn = false;
    }
}