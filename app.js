let h3=document.querySelector("h3");
let colors=["green","red","yellow","blue"];
let userSeq=[];
let gameSeq=[];
let start=false;
let level=0;
let acceptingInput = false;

document.addEventListener("click",function(){
    if(!start){
        start=true;
        gameStart();
    }
});

for(color of colors){
    let div=document.querySelector(`#${color}`);
    div.addEventListener("click",function(){
        if (!acceptingInput) return;
        flash(color);
        userSeq.push(color);
        check();
    });
}

function gameStart(){
    level++;
    h3.innerText=`Level ${level}`;
    let idx=getRandom();
    let color=colors[idx];
    gameSeq.push(color);
    acceptingInput = false;
    setTimeout(() => {
        for (let i = 0; i < gameSeq.length; i++) {
            let color = gameSeq[i];
            setTimeout(() => {
                flash(color);
                if (i === gameSeq.length - 1) {
                    acceptingInput = true;
                }
            }, i * 600);
        }
    }, 300);
}

function getRandom(){
    return Math.floor(Math.random()*4);
}

function flash(color){
    let div=document.querySelector(`#${color}`);
    div.classList.add("white");
    setTimeout(()=>{
        div.classList.remove("white");
    },200);
}

function check(){
    for(let i=0;i<userSeq.length;i++){
        if(userSeq[i]!==gameSeq[i]){
            setTimeout(gameOver,200);
            return;
        }
    }
    if(userSeq.length==gameSeq.length){
        userSeq=[];
        setTimeout(gameStart,500);
    }
}

function gameOver(){
    let body=document.querySelector("body");
    body.style.backgroundColor="red";
    setTimeout(()=>{
        body.style.backgroundColor="white";
    },100);
    h3.innerText=`Game Over! Your Score is ${level}\nTap anywhere to restart`;
    start=false;
    userSeq=[];
    gameSeq=[];
    level=0;
    acceptingInput = false;
}