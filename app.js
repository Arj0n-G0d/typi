let game;
let pressed={};
let keys={};
for(let i=65;i<=90;i++)
    keys[String.fromCharCode(i)]=document.querySelector("#"+String.fromCharCode(i));
keys[" "]=document.querySelector("#SPACE");
keys["backspace"]=document.querySelector("#BACKSPACE");

class Game {
    constructor(str) {
        this.cursorIndex=0;
        this.length=25;
        this.string=str;
        this.addString();
        this.cursorArray=document.getElementsByClassName("letter");
        this.cursorArray[this.cursorIndex].classList.add("cursor");
        this.lastCursorIndex=0;
        this.thresh=10;
        this.start=new Date();
        this.end;
        this.correct=0;
        this.incorrect=0;
        this.curr;
        this.max=0;  
        
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
        reader.innerHTML='Press <span style="color:#fca311">ENTER</span> to Start';

        this.resultAvg.style.display="flex";
        this.resultMax.style.display="flex";
        this.resultAvg.classList.remove("disappearToDark");
        void this.resultAvg.offsetWidth;
        this.resultAvg.classList.add("appearFromDark");
        this.resultMax.classList.remove("disappearToDark");
        void this.resultMax.offsetWidth;
        this.resultMax.classList.add("appearFromDark");  
        
        this.end=new Date();
        let duration=(this.end.getTime()-this.start.getTime())/1000;
        const avg=document.querySelector(".avgSpeed");
        avg.textContent=Math.floor(this.correct/duration*12);

        const max=document.querySelector(".maxSpeed");
        max.textContent=game.max;
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
        reader.innerHTML='Press <span style="color:#fca311">ENTER</span> to Start';
    },2500);
}

typeTypi();

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
            game.correct++;

            game.curr=new Date();
            let duration=(game.curr.getTime()-game.start.getTime())/1000;
            game.max=Math.max(game.max,Math.floor(game.correct/duration*12));
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
                if(prev.classList.contains("incorrect")) {
                    prev.classList.remove("incorrect");
                    game.incorrect--;
                }
                else if(prev.classList.contains("correct")) {
                    prev.classList.remove("correct");
                    game.correct--;
                } 
                game.cursorIndex--;
                game.cursorArray[game.cursorIndex].classList.add("cursor");
            }
            if(game.cursorIndex-game.lastCursorIndex<game.thresh) {
                game.cursorArray[game.lastCursorIndex-1].style.display="inline";
                game.lastCursorIndex--;
            }
        }
        else if(e.code=="Enter") {
            if(game==undefined) {
                const reader=document.querySelector(".readerOrig");
                reader.textContent="";
                let size=Math.floor(Math.random()*25);
                axios.get("https://random-word-api.herokuapp.com/word?number="+size).then((res)=>{
                    let string="";
                    const wordsArray=res.data;
                    for(let i=0;i<size;i++) {
                        if(string=="") string+=wordsArray[i];
                        else string+=" "+wordsArray[i];
                    }
                    for(let key in keys) {
                        keys[key].classList.remove("disappearToDimAnimation");
                        void keys[key].offsetWidth;
                        keys[key].classList.add("appearFromDimAnimation");
                    }
                    const keyboard=document.querySelector(".keyboard");
                    keyboard.classList.remove("disappearToDimAnimationKeyboard");
                    void keyboard.offsetWidth;
                    keyboard.classList.add("appearFromDimAnimationKeyboard");
                    game=new Game(string);
                });
            }
        }
        else {
            game.incorrect++;
        }
        if(game!=undefined && game.cursorIndex>=game.cursorArray.length) {
            console.log("hello");
            if(game!=undefined)
                game.gameOver();
            game=undefined;
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