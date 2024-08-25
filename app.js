let game;
let pressed={};
let keys={};
for(let i=65;i<=90;i++)
    keys[String.fromCharCode(i)]=document.querySelector("#"+String.fromCharCode(i));
keys[" "]=document.querySelector("#SPACE");
keys["back"]=document.querySelector("#BACKSPACE");

class Game {
    constructor() {
        this.string="Lorem ipsum dolor sit amet consectetur adipisicing elit Cum ipsa architecto inventore unde molestias dolor enim";
        this.addString();
        this.cursorIndex=0;
        this.cursorArray=document.getElementsByClassName("letter");
        this.cursorArray[this.cursorIndex].classList.add("cursor");
        this.lastCursorIndex=0;
        this.thresh=25;
    }
    addString() {
        const reader=document.querySelector(".reader");
        reader.textContent="";
        for(let i=0;i<this.string.length;i++) {
            const letter=document.createElement("span");
            letter.classList.add("letter");
            letter.textContent=this.string[i];
            reader.appendChild(letter);
        }
    }
}

function typeTypi() {
    const reader=document.querySelector(".reader");
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
        reader.classList.toggle("typi");
    },3000);
}

typeTypi();
setTimeout(()=>{
    game=new Game();
},3000);

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
            keys["back"].classList.toggle("keyPress"); 
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
            keys["back"].classList.toggle("keyPress"); 
            pressed[e.code]=false;
        }
    }
});