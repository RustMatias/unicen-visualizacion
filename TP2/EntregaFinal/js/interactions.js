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


if(document.querySelector("#overlay") != null){
    document.querySelector("#overlay").addEventListener( "click", ()=>{

        if(document.querySelector("#login")!=null){

            let loginoverlay = document.querySelector("#login");
            loginoverlay.classList.toggle("show");

            if(loginoverlay.classList != "login"){
                loginoverlay.classList.toggle("show");
            }
        }
        let overlay = document.querySelector("#overlay");
        
        if(document.querySelector("#register")!=null){
        
            let registeroverlay = document.querySelector("#register");
            
            if(registeroverlay.classList != "register"){
                registeroverlay.classList.toggle("show");
            }
        }
            let gameoverlay = document.querySelector("#gameInfoPopup"); 

        
        overlay.classList.toggle("show");

        if(gameoverlay.classList != "gameInfoPopup"){
            gameoverlay.classList.toggle("show");
        }

        if(document.querySelector("#gameInfoPopup") != null &&
        document.querySelector("#gameInfoPopup").classList != "game-info-popup"){
            document.querySelector("#gameInfoPopup").classList.toggle("show");
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

if(document.querySelector("#closeInfo") != null){
    document.querySelector("#closeInfo").addEventListener( "click", ()=>{


        let overlay2 = document.querySelector("#overlay");
        let gameoverlay = document.querySelector("#gameInfoPopup"); 
        gameoverlay.classList.toggle("show");
        overlay2.classList.toggle("show");
    
    }  )   
}



if(document.querySelector("#goToLogin") !=null){
    document.querySelector("#goToLogin").addEventListener( "click", ()=>{

        let registeroverlay = document.querySelector("#register");
        registeroverlay.classList.toggle("show");
    } ) 
}




function openBusqueda(){
    //agarra del dom
    let busqueda = document.querySelector("#busqueda");
        
    //agrega la clase
    busqueda.classList.toggle("show");
}






function openGameInfo(){

    window.scrollTo(0,0);
        //agarra del dom
        let gameInfo = document.querySelector("#gameInfoPopup");
        console.log(gameInfo);
        //agrega la clase
        gameInfo.classList.toggle("show");
        
        let overlay = document.querySelector("#overlay");
        overlay.classList.toggle("show");

    
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
                                        <h2>`+ value +" y la cueva olvidada" +`</h2> 
                                        <div class="play-fav">   
        
                                            <a href=""><img src="./img/noFavGame.png" alt="" class="fav-contenedor"></a>
                                            <butto href="" class="a-play-contenedor" onclick="loadingGamePage()"><img src="./img/play.png" alt="" class="play-contenedor"></butto>
                                        </div>               
                                    </div>
                                </figure>
                                        
                                <figure>
                                <img src="img/game1.jpg" alt="">
                                <div class="capa" id="openGameInfo">
                                <h2>`+ value +" del caribe" +`</h2> 
                                    <div class="play-fav">   
    
                                        <a href=""><img src="./img/noFavGame.png" alt="" class="fav-contenedor"></a>
                                        <butto href="" class="a-play-contenedor" onclick="loadingGamePage()"><img src="./img/play.png" alt="" class="play-contenedor"></butto>
                                    </div>               
                                </div>
                            </figure>
                                        
                                    </div>
                                    <div class="contenedor cont-browser">
                                    <figure>
                                    <img src="img/game2.jpg" alt="">
                                    <div class="capa" id="openGameInfo">
                                    <h2>`+ value +" y furioso" +`</h2> 
                                        <div class="play-fav">   
        
                                            <a href=""><img src="./img/noFavGame.png" alt="" class="fav-contenedor"></a>
                                            <butto href="" class="a-play-contenedor" onclick="loadingGamePage()"><img src="./img/play.png" alt="" class="play-contenedor"></butto>
                                        </div>               
                                    </div>
                                </figure>
                                <figure>
                                <img src="img/game3.jpg" alt="">
                                <div class="capa" id="openGameInfo">
                                <h2>`+ "el laberito de "+ value  +`</h2> 
                                    <div class="play-fav">   
    
                                        <a href=""><img src="./img/noFavGame.png" alt="" class="fav-contenedor"></a>
                                        <butto href="" class="a-play-contenedor" onclick="loadingGamePage()"><img src="./img/play.png" alt="" class="play-contenedor"></butto>
                                    </div>               
                                </div>
                            </figure>
                                        
                                    </div>
                                    <div class="contenedor cont-browser">
                                    <figure>
                                    <img src="img/game1.jpg" alt="">
                                    <div class="capa" id="openGameInfo">
                                    <h2>`+ "la venganza de "+ value  +`</h2> 
                                        <div class="play-fav">   
        
                                            <a href=""><img src="./img/noFavGame.png" alt="" class="fav-contenedor"></a>
                                            <butto href="" class="a-play-contenedor" onclick="loadingGamePage()"><img src="./img/play.png" alt="" class="play-contenedor"></butto>
                                        </div>               
                                    </div>
                                </figure>
                                <figure>
                                <img src="img/game2.jpg" alt="">
                                <div class="capa" id="openGameInfo">
                                <h2>`+ "Counter-Strike: "+ value + " Offensive " +`</h2> 
                                    <div class="play-fav">   
    
                                        <a href=""><img src="./img/noFavGame.png" alt="" class="fav-contenedor"></a>
                                        <butto href="" class="a-play-contenedor" onclick="loadingGamePage()"><img src="./img/play.png" alt="" class="play-contenedor"></butto>
                                    </div>               
                                </div>
                            </figure>
                                        
                                    </div>
                                    
                                </div> ` 
    }) 
}





function like(){

    let like = document.querySelector("#like");
    like.classList.toggle("like");
    

    function loading1(){
        like.classList.toggle("like");

        console.log(document.querySelector("#like").getAttribute("src"))


        if(document.querySelector("#like").getAttribute("src") ==  "./img/like.png"){
            like.src = "./img/likestatus.png"
    
        }else{
            like.src = "./img/like.png"

        }
    }
    setTimeout(loading1, 500);
    document.querySelector("#dislike").src = "./img/dislike.png";  
}

/* function favoriteclick(){
    let fav = document.querySelector("favoriteclick")
    if(document.querySelector("#favoriteclick").getAttribute("src") ==  "./img/favOn.png"){
        fav.src = "./img/noFavGame.png"

    }else{
        fav.src = "./img/favOn.png"

    }
} */

function favoriteclick(){
    let fav = document.querySelector("#favoriteclick")
    fav.classList.toggle("like");
    

    if(document.querySelector("#favoriteclick").getAttribute("src") ==  "./img/fav.png"){
        fav.src = "./img/noFav.png"
        

    }else{
        fav.src = "./img/fav.png"
        
    }
}


function dislike(){
    let dislike = document.querySelector("#dislike");
    dislike.classList.toggle("dislike");
    

    function loading1(){
        dislike.classList.toggle("dislike");

        if(document.querySelector("#dislike").getAttribute("src") == "./img/dislike.png"){
            dislike.src = "./img/dislikestatus.png"
        }else{
            dislike.src = "./img/dislike.png"
        }

    }
    setTimeout(loading1, 500);
    document.querySelector("#like").src = "./img/like.png";
}



function loadingGamePage(){
    window.scrollTo(0,0);
    let loading = document.querySelector("#loadingOverlay");
    loading.classList.toggle("show");
    
    function loading1(){
        location.href="game.html";
    }
    
    setTimeout(loading1, 3000);
}



function loadingAllGames(){
    window.scrollTo(0,0);
    let loading = document.querySelector("#loadingOverlay");
    loading.classList.toggle("show");
    
    function loading3(){
        location.href="allgames.html";
    }
    
    setTimeout(loading3, 3000);
}







function loadingCat(){
    window.scrollTo(0,0);
    let loading = document.querySelector("#loadingOverlay");
    loading.classList.toggle("show");
    
    function loading3(){
        location.href="categorie.html";
    }
    
    setTimeout(loading3, 3000);
}







function loadingHome(){
    window.scrollTo(0,0);
    let loading = document.querySelector("#loadingOverlay");
    loading.classList.toggle("show");
    
    function loading3(){
        location.href="index.html";
    }
    
    setTimeout(loading3, 3000);
}


function loadingFavorites(){
    window.scrollTo(0,0);
    let loading = document.querySelector("#loadingOverlay");
    loading.classList.toggle("show");
    
    function loading4(){
        location.href="favorite.html";
    }
      
    setTimeout(loading4, 3000);
}


function loadingUser(event){
    window.scrollTo(0,0);
    event.preventDefault();
        let loading = document.querySelector("#loadingOverlay");
        loading.classList.toggle("show");
        
        function loading3(){
            location.href="user.html";
        }
        
        setTimeout(loading3, 3000);
}

/* carousel */

function App() {}

window.onload = function (event) {
    var app = new App();
    window.app = app;
    
};

App.prototype.processingButton = function(event) {
    const btn = event.currentTarget;
    const slickList = event.currentTarget.parentNode;
    const track = event.currentTarget.parentNode.querySelector('#track');
    const slick = track.querySelectorAll('.slick');

    const slickWidth = slick[0].offsetWidth;
    
    const trackWidth = track.offsetWidth;
    const listWidth = slickList.offsetWidth;

    

    track.style.left == ""  ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);

    btn.dataset.button == "button-prev" ? prevAction(leftPosition,slickWidth,track) : nextAction(leftPosition,trackWidth,listWidth,slickWidth,track)
}

let prevAction = (leftPosition,slickWidth,track) => {
    if(leftPosition > 0) {
        console.log("entro 2")
        track.style.left = `${-1 * (leftPosition - slickWidth)}px`;
    }
}

let nextAction = (leftPosition,trackWidth,listWidth,slickWidth,track) => {
    if(leftPosition < (trackWidth - listWidth)) {
        track.style.left = `${-1 * (leftPosition + slickWidth)}px`;
    }
}


