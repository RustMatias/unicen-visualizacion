"use-strict"

document.querySelector("#showLogin").addEventListener( "click", ()=>{

    let loginoverlay = document.querySelector("#login");
    let overlay = document.querySelector("#overlay");

    loginoverlay.classList.toggle("show");
    overlay.classList.toggle("show");

}) 
document.querySelector("#closeLogin").addEventListener( "click", ()=>{

    let loginoverlay = document.querySelector("#login");
    let overlay = document.querySelector("#overlay");

    loginoverlay.classList.toggle("show");
    overlay.classList.toggle("show");
}) 

document.querySelector("#overlay").addEventListener( "click", ()=>{

    let loginoverlay = document.querySelector("#login");
    let overlay = document.querySelector("#overlay");
    let registeroverlay = document.querySelector("#register");

    loginoverlay.classList.toggle("show");
    overlay.classList.toggle("show");
    
    if(registeroverlay.classList != "register"){
        registeroverlay.classList.toggle("show");
    }

})




document.querySelector("#goToRegister").addEventListener( "click", ()=>{

    let registeroverlay = document.querySelector("#register");

    registeroverlay.classList.toggle("show");
}  ) 

document.querySelector("#closeRegister").addEventListener( "click", ()=>{

    let registeroverlay = document.querySelector("#register");
    let loginoverlay = document.querySelector("#login");
    let overlay = document.querySelector("#overlay");
    registeroverlay.classList.toggle("show");
    loginoverlay.classList.toggle("show");
    overlay.classList.toggle("show");

}  ) 

document.querySelector("#goToLogin").addEventListener( "click", ()=>{

    let registeroverlay = document.querySelector("#register");
    registeroverlay.classList.toggle("show");
} ) 



//busqueda

document.querySelector("#openBusqueda").addEventListener( "click", ()=>{

    //agarra del dom
    let busqueda = document.querySelector("#busqueda");

    //agrega la clase
    busqueda.classList.toggle("show");

}) 

document.querySelector("#closeBusqueda").addEventListener( "click", ()=>{

    //agarra del dom
    let busqueda = document.querySelector("#busqueda");

    //agrega la clase
    busqueda.classList.toggle("show");

}) 

if(document.querySelector("#openGameInfo") != null){
    document.querySelector("#openGameInfo").addEventListener( "click", ()=>{

    
        //agarra del dom
        let gameInfo = document.querySelector("#gameInfoPopup");
        console.log(gameInfo);
        //agrega la clase
        gameInfo.classList.toggle("show");
    
    }) 
}



document.querySelector("#buscador").addEventListener( "change", ()=>{


    console.log("pepe")
    let html = document.querySelector("#viewGamesSearch")
    let value = document.querySelector("#buscador").value;

    html.innerHTML = ` <div class="view-browser">
                            <a href="">` + 'Search results for "' + value + `" :</a>
                            
                            <div class="visualization">
                                <div class="contenedor cont-browser">
                                    <figure>
                                        <img src="img/game1.jpg" alt="">
                                        <div class="capa">
                                            <h2>Nombre del juego</h2>                
                                        </div>
                                    </figure>
                                    
                                    <figure>
                                        <img src="img/game2.jpg" alt="">
                                        <div class="capa">
                                            <h2>Nombre del juego</h2>                
                                        </div>
                                    </figure>
                                    
                                </div>
                                <div class="contenedor cont-browser">
                                    <figure>
                                        <img src="img/game2.jpg" alt="">
                                        <div class="capa">
                                            <h2>Nombre del juego</h2>                
                                        </div>
                                    </figure>
                                    <figure>
                                        <img src="img/game3.jpg" alt="">
                                        <div class="capa">
                                            <h2>Nombre del juego</h2>                
                                        </div>
                                    </figure>
                                    
                                </div>
                                <div class="contenedor cont-browser">
                                    <figure>
                                        <img src="img/game2.jpg" alt="">
                                        <div class="capa">
                                            <h2>Nombre del juego</h2>                
                                        </div>
                                    </figure>
                                    <figure>
                                        <img src="img/game3.jpg" alt="">
                                        <div class="capa">
                                            <h2>Nombre del juego</h2>                
                                        </div>
                                    </figure>
                                    
                                </div>
                                
                            </div> ` 
}) 

