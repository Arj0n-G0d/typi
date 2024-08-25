let string="Hello My name is Arjun Gaur";
let pressed={};
let cursor;

function keyPress(id) {
    const key=document.querySelector(id);
    key.classList.toggle("keyPress");
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
        reader.textContent="";
        reader.classList.toggle("typi");
    },3000);
}

function addTest(str) {
    const reader=document.querySelector(".reader");
    for(let i=0;i<str.length;i++) {
        const elmnt=document.createElement("span");
        elmnt.classList.add("letter");
        elmnt.textContent=str[i];
        reader.appendChild(elmnt);
    }
    cursor=document.querySelector(".letter");
    cursor.classList.add("cursor");
}

typeTypi();
setTimeout(()=>{
    addTest(string);
},3000);

document.body.addEventListener("keydown",(e)=>{
    if(!pressed[e.code]) {
        console.log(e.key);
        let letter=null;
        if(e.key.length==1 && ((e.key>="A" && e.key<="Z") || (e.key>="a" && e.key<="z"))) {
            keyPress("#"+e.key.toUpperCase()); 
            pressed[e.code]=true;
            letter=e.key;
        }
        else if(e.key==" ") {
            keyPress("#SPACE");
            pressed[e.code]=true;
            letter=" ";
        }
        else if(e.key=="Backspace") {
            keyPress("#BACKSPACE");
            pressed[e.code]=true;
            letter="back";
        }
        if(letter==cursor.textContent) {
            cursor.classList.add("correct");
            cursor.classList.remove("cursor");
            cursor=cursor.nextSibling;
            if(cursor!=null)
                cursor.classList.add("cursor");
        }
        else if(letter!=null && letter!="back"){
            cursor.classList.add("incorrect");
            cursor.classList.remove("cursor");
            cursor=cursor.nextSibling;
            if(cursor!=null)
                cursor.classList.add("cursor");
        }
        else if(letter!=null && letter=="back") {
            let prev=cursor.previousSibling;
            if(prev && prev.classList.contains("incorrect")) {
                cursor.classList.remove("cursor");
                prev.classList.remove("incorrect");
                cursor=prev;
                cursor.classList.add("cursor");
            }
        }
    }
});

document.body.addEventListener("keyup",(e)=>{
    if(pressed[e.code]) {
        if(e.key.length==1 && ((e.key>="A" && e.key<="Z") || (e.key>="a" && e.key<="z"))) {
            keyPress("#"+e.key.toUpperCase()); 
            pressed[e.code]=false;
        }
        else if(e.key==" ") {
            keyPress("#SPACE");
            pressed[e.code]=false;
        }
        else if(e.key=="Backspace") {
            keyPress("#BACKSPACE");
            pressed[e.code]=false;
        }
    }
});