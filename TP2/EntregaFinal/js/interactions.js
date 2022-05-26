"use-strict"
if( document.querySelector("#showLogin") != null){
    document.querySelector("#showLogin").addEventListener( "click", ()=>{

        let loginoverlay = document.querySelector("#login");
        let overlay = document.querySelector("#overlay");
    
        loginoverlay.classList.toggle("show");
        overlay.classList.toggle("show");
    
    }) 
}


if(document.querySelector("#closeLogin") != null){
    document.querySelector("#closeLogin").addEventListener( "click", ()=>{

        let loginoverlay = document.querySelector("#login");
        let overlay = document.querySelector("#overlay");
    
        loginoverlay.classList.toggle("show");
        overlay.classList.toggle("show");
    }) 
}


if(  document.querySelector("#overlay") != null){
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
}




if(document.querySelector("#goToRegister") != null){
    document.querySelector("#goToRegister").addEventListener( "click", ()=>{

        let registeroverlay = document.querySelector("#register");
    
        registeroverlay.classList.toggle("show");
    }  )     
}


if(document.querySelector("#closeRegister") != null){
    document.querySelector("#closeRegister").addEventListener( "click", ()=>{

        let registeroverlay = document.querySelector("#register");
        let loginoverlay = document.querySelector("#login");
        let overlay = document.querySelector("#overlay");
        registeroverlay.classList.toggle("show");
        loginoverlay.classList.toggle("show");
        overlay.classList.toggle("show");
    
    }  )   
}



if(document.querySelector("#goToLogin") !=null){
    document.querySelector("#goToLogin").addEventListener( "click", ()=>{

        let registeroverlay = document.querySelector("#register");
        registeroverlay.classList.toggle("show");
    } ) 
}




//busqueda
if( document.querySelector("#openBusqueda") != null){
    document.querySelector("#openBusqueda").addEventListener( "click", ()=>{

        //agarra del dom
        let busqueda = document.querySelector("#busqueda");
    
        //agrega la clase
        busqueda.classList.toggle("show");
    
    })  
}


if(document.querySelector("#closeBusqueda") != null){
    document.querySelector("#closeBusqueda").addEventListener( "click", ()=>{

        //agarra del dom
        let busqueda = document.querySelector("#busqueda");
    
        //agrega la clase
        busqueda.classList.toggle("show");
    
    })  
}


if(document.querySelector("#gameInfoPopup") != null){
    document.querySelector("#openGameInfo").addEventListener( "click", ()=>{

        console.log(gameInfo);
        //agarra del dom
        let gameInfo = document.querySelector("#gameInfoPopup");
        console.log(gameInfo);
        //agrega la clase
        gameInfo.classList.toggle("show");
    
    }) 
}


if(document.querySelector("#viewGamesSearch") != null){
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
                                    <div class="capa" id="openGameInfo">
                                        <h2>Nombre del juego</h2> 
                                        <div class="play-fav">   
        
                                            <a href=""><img src="./img/noFavGame.png" alt="" class="fav-contenedor"></a>
                                            <butto href="" class="a-play-contenedor" id="goToGamePage"><img src="./img/play.png" alt="" class="play-contenedor"></butto>
                                        </div>               
                                    </div>
                                </figure>
                                        
                                <figure>
                                <img src="img/game1.jpg" alt="">
                                <div class="capa" id="openGameInfo">
                                    <h2>Nombre del juego</h2> 
                                    <div class="play-fav">   
    
                                        <a href=""><img src="./img/noFavGame.png" alt="" class="fav-contenedor"></a>
                                        <butto href="" class="a-play-contenedor" id="goToGamePage"><img src="./img/play.png" alt="" class="play-contenedor"></butto>
                                    </div>               
                                </div>
                            </figure>
                                        
                                    </div>
                                    <div class="contenedor cont-browser">
                                    <figure>
                                    <img src="img/game2.jpg" alt="">
                                    <div class="capa" id="openGameInfo">
                                        <h2>Nombre del juego</h2> 
                                        <div class="play-fav">   
        
                                            <a href=""><img src="./img/noFavGame.png" alt="" class="fav-contenedor"></a>
                                            <butto href="" class="a-play-contenedor" id="goToGamePage"><img src="./img/play.png" alt="" class="play-contenedor"></butto>
                                        </div>               
                                    </div>
                                </figure>
                                <figure>
                                <img src="img/game3.jpg" alt="">
                                <div class="capa" id="openGameInfo">
                                    <h2>Nombre del juego</h2> 
                                    <div class="play-fav">   
    
                                        <a href=""><img src="./img/noFavGame.png" alt="" class="fav-contenedor"></a>
                                        <butto href="" class="a-play-contenedor" id="goToGamePage"><img src="./img/play.png" alt="" class="play-contenedor"></butto>
                                    </div>               
                                </div>
                            </figure>
                                        
                                    </div>
                                    <div class="contenedor cont-browser">
                                    <figure>
                                    <img src="img/game1.jpg" alt="">
                                    <div class="capa" id="openGameInfo">
                                        <h2>Nombre del juego</h2> 
                                        <div class="play-fav">   
        
                                            <a href=""><img src="./img/noFavGame.png" alt="" class="fav-contenedor"></a>
                                            <butto href="" class="a-play-contenedor" id="goToGamePage"><img src="./img/play.png" alt="" class="play-contenedor"></butto>
                                        </div>               
                                    </div>
                                </figure>
                                <figure>
                                <img src="img/game2.jpg" alt="">
                                <div class="capa" id="openGameInfo">
                                    <h2>Nombre del juego</h2> 
                                    <div class="play-fav">   
    
                                        <a href=""><img src="./img/noFavGame.png" alt="" class="fav-contenedor"></a>
                                        <butto href="" class="a-play-contenedor" id="goToGamePage"><img src="./img/play.png" alt="" class="play-contenedor"></butto>
                                    </div>               
                                </div>
                            </figure>
                                        
                                    </div>
                                    
                                </div> ` 
    }) 
}

if(document.querySelector("#goToGamePage") != null){
//redireccionando botones de overlay hacia games con loading
    document.querySelector("#goToGamePage").addEventListener( "click", ()=>{

        let loading = document.querySelector("#loadingOverlay");
        loading.classList.toggle("show");
        
        function loading1(){
            location.href="game.html";
        }
        
        setTimeout(loading1, 3000);

    }) 
}

if(document.querySelector("#goToAllGames") != null){
    //redireccionando botones de allGames hacia allgames.page con loading
    document.querySelector("#goToAllGames").addEventListener( "click", ()=>{

        let loading = document.querySelector("#loadingOverlay");
        loading.classList.toggle("show");
        
        function loading2(){
            location.href="allgames.html";
        }
        
        setTimeout(loading2, 3000);

    }) 
}

if(document.querySelector("#goToCategorie") != null){
    //redireccionando botones de Categories hacia categories.page con loading
    document.querySelector("#goToCategorie").addEventListener( "click", (event)=>{
        event.preventDefault();

        let loading = document.querySelector("#loadingOverlay");
        loading.classList.toggle("show");
        
        function loading3(){
            location.href="categorie.html";
        }
        
        setTimeout(loading3, 3000);

    }) 

}

if(document.querySelector("#goToFavorite")!= null){
    document.querySelector("#goToFavorite").addEventListener( "click", (event)=>{
        event.preventDefault();
    
        let loading = document.querySelector("#loadingOverlay");
        loading.classList.toggle("show");
        
        function loading4(){
            location.href="favorite.html";
        }
          
        setTimeout(loading4, 3000);
    
    }) 
}




if(document.querySelector("#goToUser")!= null){
    document.querySelector("#goToUser").addEventListener( "click", (event)=>{
        event.preventDefault();
    
        let loading = document.querySelector("#loadingOverlay");
        loading.classList.toggle("show");
        
        function loading5(){
            location.href="user.html";
        }
          
        setTimeout(loading5, 3000);
    
    }) 
}


