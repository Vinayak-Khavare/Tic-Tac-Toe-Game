let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newgamebtn = document.querySelector("#newgame");
let msg = document.querySelector("#winning-msg");
let msgcontainer = document.querySelector(".winmsg");

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const reset = ()=>{
    msg.innerText = "";
    msgcontainer.classList.add("hide");
    enablebtns();
    turnO = true;
    count = 0;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        box.classList.add("clicked");

        let isWinner = checkWinner();
        if(!isWinner && count === 9){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "The game was a Draw";
    msgcontainer.classList.remove("hide");
    disablebtns();
};

const enablebtns = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("clicked");
    }
};

const disablebtns = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const showWinner = (winner) =>{
    msg.innerText = `The winning player is ${winner}`;
    msgcontainer.classList.remove("hide");
    disablebtns();
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1===pos2 && pos2===pos3){
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
};

resetbtn.addEventListener("click", reset);
newgamebtn.addEventListener("click", reset);