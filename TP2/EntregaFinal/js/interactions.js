"use-strict"




document.querySelector("#showLogin").addEventListener( "click", ()=>{

    let loginoverlay = document.querySelector("#login");
    let overlay = document.querySelector("#overlay");

    console.log(document.querySelector("login"));
    loginoverlay.classList.toggle("show");
    overlay.classList.toggle("show");

}  ) 
