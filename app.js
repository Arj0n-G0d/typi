let game;
let pressed={};
let keys={};
for(let i=65;i<=90;i++)
    keys[String.fromCharCode(i)]=document.querySelector("#"+String.fromCharCode(i));
keys[" "]=document.querySelector("#SPACE");
keys["backspace"]=document.querySelector("#BACKSPACE");

class Game {
    constructor() {
        this.string="Lorem ipsum dolor";
        this.addString();
        this.cursorIndex=0;
        this.cursorArray=document.getElementsByClassName("letter");
        this.cursorArray[this.cursorIndex].classList.add("cursor");
        this.lastCursorIndex=0;
        this.thresh=25;

        for(let key in keys) {
            keys[key].classList.remove("disappearToDimAnimation");
            void keys[key].offsetWidth;
            keys[key].classList.add("appearFromDimAnimation");
        }
        const keyboard=document.querySelector(".keyboard");
        keyboard.classList.remove("disappearToDimAnimationKeyboard");
        void keyboard.offsetWidth;
        keyboard.classList.add("appearFromDimAnimationKeyboard");

        this.resultAvg=document.querySelector(".resultAvg");
        this.resultMax=document.querySelector(".resultMax");

        this.resultAvg.classList.remove("appearFromDark");
        void this.resultAvg.offsetWidth;
        this.resultAvg.classList.add("disappearToDark");  
        this.resultMax.classList.remove("appearFromDark");
        void this.resultMax.offsetWidth;
        this.resultMax.classList.add("disappearToDark");     
    }
    addString() {
        const reader=document.querySelector(".readerOrig");
        reader.classList.remove("readerOrig");
        reader.textContent="";
        for(let i=0;i<this.string.length;i++) {
            const letter=document.createElement("span");
            letter.classList.add("letter");
            if(this.string[i]!=" ")
                letter.textContent=this.string[i];
            else
                letter.textContent="\u00A0";
            reader.appendChild(letter);
        }
        void reader.offsetWidth;
        reader.classList.add("reader");
    }
    gameOver() {
        for(let key in keys) {
            keys[key].classList.remove("appearFromDimAnimation");
            void keys[key].offsetWidth;
            keys[key].classList.add("disappearToDimAnimation");
        }
        const keyboard=document.querySelector(".keyboard");
        keyboard.classList.remove("appearFromDimAnimationKeyboard");
        void keyboard.offsetWidth;
        keyboard.classList.add("disappearToDimAnimationKeyboard");

        const reader=document.querySelector(".reader");
        reader.classList.remove("reader");
        void reader.offsetWidth;
        reader.classList.add("readerOrig");
        reader.textContent="Press Enter to Start";

        this.resultAvg.style.display="block";
        this.resultMax.style.display="block";
        this.resultAvg.classList.remove("disappearToDark");
        void this.resultAvg.offsetWidth;
        this.resultAvg.classList.add("appearFromDark");
        this.resultMax.classList.remove("disappearToDark");
        void this.resultMax.offsetWidth;
        this.resultMax.classList.add("appearFromDark");       
    }
}

function typeTypi() {
    const reader=document.querySelector(".typi");
    console.log(reader);
    const typi="TYPI";
    let cnt=0;
    const timer=setInterval(()=>{
        reader.textContent+=typi[cnt++];
    },400);
    setTimeout(()=>{
        clearInterval(timer);
    },2000);
    setTimeout(()=>{
        reader.classList.remove("typi");
        reader.classList.add("readerOrig");
        reader.textContent="Press Enter to Start";
    },2500);
}

typeTypi();
setTimeout(()=>{
    game=new Game();
},5000);

document.body.addEventListener("keydown",(e)=>{
    if(!pressed[e.code]) {
        let letter=null;
        if(e.key.length==1 && ((e.key>="A" && e.key<="Z") || (e.key>="a" && e.key<="z"))) {
            keys[e.key.toUpperCase()].classList.toggle("keyPress"); 
            pressed[e.code]=true;
            letter=e.key;
        }
        else if(e.key==" ") {
            keys[" "].classList.toggle("keyPress"); 
            pressed[e.code]=true;
            letter=" ";
        }
        else if(e.key=="Backspace") {
            keys["backspace"].classList.toggle("keyPress"); 
            pressed[e.code]=true;
            letter="back";
        }
        if(letter!=null && letter==game.cursorArray[game.cursorIndex].textContent) {
            game.cursorArray[game.cursorIndex].classList.add("correct");
            game.cursorArray[game.cursorIndex].classList.remove("cursor");
            game.cursorIndex++;
            if(game.cursorArray[game.cursorIndex]!=undefined)
                game.cursorArray[game.cursorIndex].classList.add("cursor");
            if(game.cursorIndex-game.lastCursorIndex>=game.thresh && game.cursorArray.length-game.cursorIndex>=game.thresh) {
                game.cursorArray[game.lastCursorIndex].style.display="none";
                game.lastCursorIndex++;
            }
        }
        else if(letter!=null && letter!="back"){
            game.cursorArray[game.cursorIndex].classList.add("incorrect");
            game.cursorArray[game.cursorIndex].classList.remove("cursor");
            game.cursorIndex++;
            if(game.cursorArray[game.cursorIndex]!=undefined)
                game.cursorArray[game.cursorIndex].classList.add("cursor");
            if(game.cursorIndex-game.lastCursorIndex>=game.thresh) {
                game.cursorArray[game.lastCursorIndex].style.display="none";
                game.lastCursorIndex++;
            }
        }
        else if(letter!=null && letter=="back") {
            let prev=game.cursorArray[game.cursorIndex-1];
            if(prev) {
                game.cursorArray[game.cursorIndex].classList.remove("cursor");
                prev.classList.remove("incorrect","correct"); 
                game.cursorIndex--;
                game.cursorArray[game.cursorIndex].classList.add("cursor");
            }
            if(game.cursorIndex-game.lastCursorIndex<game.thresh) {
                game.cursorArray[game.lastCursorIndex-1].style.display="inline";
                game.lastCursorIndex--;
            }
        }
        if(game.cursorIndex>=game.cursorArray.length) {
            console.log("hello");
            game.gameOver();
        }
    }
});

document.body.addEventListener("keyup",(e)=>{
    if(pressed[e.code]) {
        if(e.key.length==1 && ((e.key>="A" && e.key<="Z") || (e.key>="a" && e.key<="z"))) {
            keys[e.key.toUpperCase()].classList.toggle("keyPress"); 
            pressed[e.code]=false;
        }
        else if(e.key==" ") {
            keys[" "].classList.toggle("keyPress"); 
            pressed[e.code]=false;
        }
        else if(e.key=="Backspace") {
            keys["backspace"].classList.toggle("keyPress"); 
            pressed[e.code]=false;
        }
    }
});