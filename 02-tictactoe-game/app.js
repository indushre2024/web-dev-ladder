let isGameOver = false;
let boxes = document.querySelectorAll(".box");
const players = [...document.querySelectorAll(".player")];
let currentPlayer;
const startPage = document.querySelector(".start-page");
const start = startPage.querySelector("button");

start.addEventListener("click",e=>{
    startPage.classList.add("hide");
});
resetGame();

function resetGame(){
    isGameOver = false;
    boxes.forEach((box)=>{
        box.textContent = "";
        box.classList.remove("box-full");
        box.classList.remove("box-highlight");
    })
    currentPlayer = players[Math.floor(Math.random()*2)];
    currentPlayer.classList.add("player-highlight");
}

function swapPlayer(){
    currentPlayer.classList.remove("player-highlight");
    currentPlayer = players.filter(player=>player!==currentPlayer)[0];
    currentPlayer.classList.add("player-highlight");
}

function highlightBoxes(boxes){
    boxes.forEach(box=>{
        box.classList.add("box-highlight");
    })
}

function checkGameOver(content){
    const emptyBoxes = document.querySelectorAll(".box:not(.box-full)");
    if(emptyBoxes.length==0){
        isGameOver = true;
    }
    if(boxes[0].textContent == content && boxes[1].textContent == content && boxes[2].textContent == content){
        isGameOver = true;
        highlightBoxes([boxes[0],boxes[1],boxes[2]]);
    }
    else if(boxes[3].textContent == content && boxes[4].textContent == content && boxes[5].textContent == content){
        isGameOver = true;
        highlightBoxes([boxes[3],boxes[4],boxes[5]]);
    }
    else if(boxes[6].textContent == content && boxes[7].textContent == content && boxes[8].textContent == content){
        isGameOver = true;
        highlightBoxes([boxes[6],boxes[7],boxes[8]]);
    }
    else if(boxes[0].textContent == content && boxes[3].textContent == content && boxes[6].textContent == content){
        isGameOver = true;
        highlightBoxes([boxes[0],boxes[3],boxes[6]]);
    }
    else if(boxes[1].textContent == content && boxes[4].textContent == content && boxes[7].textContent == content){
        isGameOver = true;
        highlightBoxes([boxes[1],boxes[4],boxes[7]]);
    }
    else if(boxes[2].textContent == content && boxes[5].textContent == content && boxes[8].textContent == content){
        isGameOver = true;
        highlightBoxes([boxes[2],boxes[5],boxes[8]]);
    }
    else if(boxes[0].textContent == content && boxes[4].textContent == content && boxes[8].textContent == content){
        isGameOver = true;
        highlightBoxes([boxes[0],boxes[4],boxes[8]]);
    }
    else if(boxes[2].textContent == content && boxes[4].textContent == content && boxes[6].textContent == content){
        isGameOver = true;
        highlightBoxes([boxes[2],boxes[4],boxes[6]]);
    }
}

boxes.forEach(box=>{
    box.addEventListener("click", e=>{
        if(!box.classList.contains("box-full") && !isGameOver){
            box.textContent = currentPlayer.textContent;
            box.classList.add("box-full");
            setTimeout(()=>{    
                checkGameOver(currentPlayer.textContent);
                if(isGameOver) {
                    setTimeout(()=>{
                        resetGame();
                        start.textContent = "Restart";
                        startPage.querySelector("h1").textContent = "Lets Play Again!";
                        startPage.classList.remove("hide");
                    },1000);
                };
                swapPlayer();
            }, 100);  
        }
    })
})


