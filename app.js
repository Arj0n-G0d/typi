function keyPressDown(c) {
    let id="#"+c.toUpperCase();
    console.log(id);
    const keyy=document.querySelector(id);
    keyy.classList.add("keyPress");
}

function keyPressUp(c) {
    let id="#"+c.toUpperCase();
    console.log(id);
    const keyy=document.querySelector(id);
    keyy.classList.remove("keyPress");
}

const key=document.querySelector("#keyy");
document.body.addEventListener("keydown",(e)=>{
    
    if((e.key>="A" && e.key<="Z") || (e.key>="a" && e.key<="z")) {
        keyPressDown(e.key); 
    }
    else if(e.code=="Space") {
        keyPressDown("space");
    }
});
document.body.addEventListener("keyup",(e)=>{
    
    if((e.key>="A" && e.key<="Z") || (e.key>="a" && e.key<="z")) {
        keyPressUp(e.key); 
    }
    else if(e.code=="Space") {
        keyPressUp("space");
    }
});