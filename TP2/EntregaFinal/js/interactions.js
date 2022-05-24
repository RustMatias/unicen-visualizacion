"use-strict"

document.querySelector("#showLogin").addEventListener( "click", ()=>{

    let loginoverlay = document.querySelector("#login");
    let overlay = document.querySelector("#overlay");

    loginoverlay.classList.toggle("show");
    overlay.classList.toggle("show");

}  ) 
document.querySelector("#closeLogin").addEventListener( "click", ()=>{

    let loginoverlay = document.querySelector("#login");
    let overlay = document.querySelector("#overlay");

    loginoverlay.classList.toggle("show");
    overlay.classList.toggle("show");
}  ) 




document.querySelector("#goToRegister").addEventListener( "click", ()=>{

    let registeroverlay = document.querySelector("#register");

    registeroverlay.classList.toggle("show");
}  ) 
document.querySelector("#closeRegister").addEventListener( "click", ()=>{

    let registeroverlay = document.querySelector("#register");
    registeroverlay.classList.toggle("show");
    let loginoverlay = document.querySelector("#login");
    let overlay = document.querySelector("#overlay");
    loginoverlay.classList.toggle("show");
    overlay.classList.toggle("show");

}  ) 

document.querySelector("#goToLogin").addEventListener( "click", ()=>{

    let registeroverlay = document.querySelector("#register");
    registeroverlay.classList.toggle("show");
}  ) 


document.querySelector("#openBusqueda").addEventListener( "click", ()=>{

    let busqueda = document.querySelector("#busqueda");
    busqueda.classList.toggle("show");
}  ) 

