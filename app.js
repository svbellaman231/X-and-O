let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".pop-up");
let newGameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// array of how to win
let winningParttern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

// first player = x
let xTurn = true;
let count = 0;

//disable all buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));

  //enable popup
  popupRef.classList.remove("hide");
};

//enable all buttons (for New Game reset)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerHTML = "";
    element.disabled = false;
  });

  //disable popup
  popupRef.classList.add("hide");
};

//This funtion is exclude when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};

//draw function
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> Draw no Bet";
};

//New Game
newGameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});




//winner logic

const winChecker = () => {
  //loop through all win
  for (let i of winningParttern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerHTML,
      btnRef[i[1]].innerHTML,
      btnRef[i[2]].innerHTML,
    ];

    // checking if element are filled
    //if 3 empty element are same and would give winner
    //would

    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //if all 3 buttons have same values then
        //pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

// display X/O on click

btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;

      // return X

      element.innerHTML = "X";
      element.disabled = true;
    } else {
      xTurn = true;

      // return O

      element.innerHTML = "O";
      element.disabled = true;
    }

    // increment count on each click

    count += 1;
    if (count === 9) {
      drawFunction();
      // it's a draw since it's 9boxes
    }

    //check winner on every click

    winChecker();
  });
});

//enable buttons and disable popup on page load
window.onload = enableButtons;
