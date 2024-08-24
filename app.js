function keyPress(c) {
    let id="#"+c.toUpperCase();
    console.log(id);
    const keyy=document.querySelector(id);
    keyy.classList.add("keyPress");
    setTimeout(()=>{
        keyy.classList.remove("keyPress");
    },100);
}

const key=document.querySelector("#keyy");
document.body.addEventListener("keydown",(e)=>{
    
    if((e.key>="A" && e.key<="Z") || (e.key>="a" && e.key<="z")) {
        keyPress(e.key); 
    }
    else if(e.code=="Space") {
        keyPress("space");
    }
})