const gameArea = document.getElementById("game-area");
const scoreEl = document.getElementById("score-number");
const startButton = document.getElementById("start-btn");
const stopWatchTimer = document.getElementById("stopwatch-timer");

let score = 0 ;
let bugInterval;
let WrongBugInterval ; 
let Time = 31;
let TimeInterval;



startButton.addEventListener('click',()=>{

    if(startButton.innerText==='start'){
        TimeInterval = setInterval(()=>{
            if(Time===0){
                clearInterval(bugInterval)
                clearInterval(WrongBugInterval)
                clearInterval(TimeInterval)
                stopWatchTimer.textContent = "X"
                startButton.textContent = 'start';
                startButton.style.backgroundColor = 'green'
                Time = 31
                score = 0
                
            }else{
                Time = Time - 1
                stopWatchTimer.textContent = Time;
            }
        },1000)
        scoreEl.textContent = 0
        startButton.textContent = 'stop';
        startButton.style.backgroundColor = 'red'
        bugInterval = setInterval(createBug,1000)
        WrongBugInterval = setInterval(createWrongBug,1357)

    }else if(startButton.innerText==='stop'){
        clearInterval(bugInterval)
        clearInterval(WrongBugInterval)
        stopWatchTimer.textContent = "X"
        Time = 31
        score = 0
        startButton.textContent = 'start';
        startButton.style.backgroundColor = 'green'
        clearInterval(TimeInterval)
    }

})


function createBug() {
    const bug = document.createElement("span");
    bug.textContent = "🪲";
    bug.classList.add("bug");

    const x = Math.random() * (gameArea.clientWidth - 40);
    const y = Math.random() * (gameArea.clientHeight - 40);

    bug.style.left = `${x}px`;
    bug.style.top = `${y}px`;

    const timeoutId = setTimeout(() => {
        bug.remove();
    }, 700);

    bug.addEventListener("click", () => {
        bug.remove();
        document.getElementById("pop-sound").play();
        clearTimeout(timeoutId);
        score++;
        scoreEl.textContent = `${score}`;
  });

    gameArea.appendChild(bug);
}

function createWrongBug(){
    const bug = document.createElement("span");
    bug.textContent = "🐞";
    bug.classList.add("bug");
    bug.style.color = 'red'

    const a = Math.random() * (gameArea.clientWidth - 40);
    const b = Math.random() * (gameArea.clientHeight - 40);

    bug.style.left = `${a}px`;
    bug.style.top = `${b}px`;

    const timeoutId = setTimeout(() => {
        bug.remove();
    }, 700);

    bug.addEventListener("click", () => {
        bug.remove();
        document.getElementById("wrong-sound").play();
        clearTimeout(timeoutId);
        score--;
        scoreEl.textContent = `${score}`;
  });
    gameArea.appendChild(bug);
}


