let gameSeq = [];
let userSeq = [];

let highScore = 0;
let started = false;
let level = 0;

let highScr = document.querySelector(".hs");
let h3 = document.querySelector("h3");

let btns = ["btn1", "btn2", "btn3", "btn4"];

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game started");
    started = true;

    setTimeout(levelUp, 300);
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 300);
}

function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `level ${level}`;

  //choose random button
  let randIdx = Math.floor(Math.random() * 3);
  let randClass = btns[randIdx];
  let randBtn = document.querySelector(`.${randClass}`);
  gameSeq.push(randBtn);
  console.log(gameSeq);
  btnFlash(randBtn);
}

function checkAns(idx) {
  // console.log("curr level: ", level);
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
    console.log("same");
  } else {
    let score = level;
    h3.innerHTML = `Game over! Your score is <b> ${score}<b> <br> press any key to restart.`;
    if (score > highScore) {
      highScore = score;
      highScr.innerText = `High Score: ${highScore}`;
    }
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 400);
    reset();
  }
}

function btnPress() {
  let btn = this;
  btnFlash(btn);
  userSeq.push(btn);
  console.log(userSeq);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
}
