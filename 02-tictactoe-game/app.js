let isGameOver = false;
let boxes = document.querySelectorAll(".box");
const players = [...document.querySelectorAll(".player")];
let currentPlayer;

function swapPlayer(){
    currentPlayer.classList.remove("player-highlight");
    currentPlayer = players.filter(player=>player!==currentPlayer)[0];
    currentPlayer.classList.add("player-highlight");
}

function checkGameOver(content){
    if((boxes[0].textContent == content && boxes[1].textContent == content && boxes[2].textContent == content) ||
        (boxes[3].textContent == content && boxes[4].textContent == content && boxes[5].textContent == content) ||
        (boxes[6].textContent == content && boxes[7].textContent == content && boxes[8].textContent == content) ||
       (boxes[0].textContent == content && boxes[3].textContent == content && boxes[6].textContent == content) ||
        (boxes[1].textContent == content && boxes[4].textContent == content && boxes[7].textContent == content) ||
        (boxes[2].textContent == content && boxes[5].textContent == content && boxes[8].textContent == content) ||
        (boxes[0].textContent == content && boxes[4].textContent == content && boxes[8].textContent == content) ||
        (boxes[2].textContent == content && boxes[4].textContent == content && boxes[6].textContent == content)
    ) isGameOver = true;
}

boxes.forEach(box=>{
    box.addEventListener("click", e=>{
        if(!box.classList.contains("box-full") && !isGameOver){
            box.textContent = currentPlayer.textContent;
            box.classList.add("box-full");
            setTimeout(()=>{    
                checkGameOver(currentPlayer.textContent);
                if(isGameOver) alert(`Game Overrr!!! ${currentPlayer.textContent} Won`);
                swapPlayer();
            }, 100);  
        }
    })
})

function resetGame(){
    isGameOver = false;
    boxes.forEach((box)=>{
        box.textContent = "";
    })
    currentPlayer = players[Math.floor(Math.random()*2)];
    currentPlayer.classList.add("player-highlight");
}

resetGame();
