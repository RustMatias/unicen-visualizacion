class Character{

    constructor(HTMLElement , width, height, left, top) {
    this.domElement = HTMLElement
    this.width = width
    this.height= height
    this.left= left
    this.top = top
    }


    getLeft(){
      return document.querySelector("#squirrel").getBoundingClientRect().left
    }

    getRight(){
      return document.querySelector("#squirrel").getBoundingClientRect().left + this.getWidth();
    }

    getTop(){
      return document.querySelector("#squirrel").getBoundingClientRect().top
    }

    getBottom(){
      return document.querySelector("#squirrel").getBoundingClientRect().top - this.getHeight();
    }    

    getHeight(){
      return document.querySelector("#squirrel").getBoundingClientRect().height
    }

    getWidth(){
      return document.querySelector("#squirrel").getBoundingClientRect().width
    }
  
    jump(){
        document.querySelector("#squirrel").style.animation = "Jump 1s infinite linear"
        document.querySelector("#squirrel2").style.animation = "Jump2 1s infinite 0.2s linear"
        console.log("JUMP");
        setTimeout(()=>{
          document.querySelector("#squirrel").style.animation = "walk 0.5s infinite steps(4)"
          console.log("WALK");
        }, 1000);
        setTimeout(()=>{
          document.querySelector("#squirrel2").style.animation = "walk 0.5s infinite steps(4)"
        }, 1200);
    }
  
    isJump(){
      return this.jumping;
    }
  

    getingCoin(){
      document.querySelector("#squirrel").style.background = "url(img/squirrelCoin.png)";
      document.querySelector("#squirrel").style.height = "53px";
      setTimeout(()=>{
        document.querySelector("#squirrel").style.background = "url(img/squirrel.png)";
        document.querySelector("#squirrel").style.height = "48px";
      }, 1000);
    }
    
  
  
}
