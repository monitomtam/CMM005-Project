class Box {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    getTopBox() {
      if (this.y === 0) return null;
      return new Box(this.x, this.y - 1);
    }
  
    getRightBox() {
      if (this.x === 3) return null;
      return new Box(this.x + 1, this.y);
    }
  
    getBottomBox() {
      if (this.y === 3) return null;
      return new Box(this.x, this.y + 1);
    }
  
    getLeftBox() {
      if (this.x === 0) return null;
      return new Box(this.x - 1, this.y);
    }
  
    getNextdoorBoxes() {
      return [
        this.getTopBox(),
        this.getRightBox(),
        this.getBottomBox(),
        this.getLeftBox()
      ].filter(box => box !== null);
    }
  
    getRandomNextdoorBox() {
      const nextdoorBoxes = this.getNextdoorBoxes();
      return nextdoorBoxes[Math.floor(Math.random() * nextdoorBoxes.length)];
    }
  }
  
  const swapBoxes = (grid, box1, box2) => {
    const temp = grid[box1.y][box1.x];
    grid[box1.y][box1.x] = grid[box2.y][box2.x];
    grid[box2.y][box2.x] = temp;
  };
  
  const isSolved = grid => {
    return (
      grid[0][0] === 1 &&
      grid[0][1] === 2 &&
      grid[0][2] === 3 &&
      grid[0][3] === 4 &&
      grid[1][0] === 5 &&
      grid[1][1] === 6 &&
      grid[1][2] === 7 &&
      grid[1][3] === 8 &&
      grid[2][0] === 9 &&
      grid[2][1] === 10 &&
      grid[2][2] === 11 &&
      grid[2][3] === 12 &&
      grid[3][0] === 13 &&
      grid[3][1] === 14 &&
      grid[3][2] === 15 &&
      grid[3][3] === 0
    );
  };
  
  const getRandomGrid = () => {
    let grid = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];
  
    // Shuffle
    let blankBox = new Box(3, 3);
    for (let i = 0; i < 1000; i++) {
      const randomNextdoorBox = blankBox.getRandomNextdoorBox();
      swapBoxes(grid, blankBox, randomNextdoorBox);
      blankBox = randomNextdoorBox;
    }
  
    if (isSolved(grid)) return getRandomGrid();
    return grid;
  };
  
  class State {
    constructor(grid, move, time, status) {
      this.grid = grid;
      this.move = move;
      this.time = time;
      this.status = status;
    }
  
    static ready() {
      return new State(
        [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        0,
        0,
        "ready"
      );
    }
  
    static start() {
      return new State(getRandomGrid(), 0, 0, "playing");
    }
  }
  
  class Game {
    constructor(state) {
      this.state = state;
      this.tickId = null;
      this.tick = this.tick.bind(this);
      this.render();
      this.handleClickBox = this.handleClickBox.bind(this);
    }
  
    static ready() {
      return new Game(State.ready());
    }
  
    tick() {
      this.setState({ time: this.state.time + 1 });
    }
  
    setState(newState) {
      this.state = { ...this.state, ...newState };
      this.render();
    }
  
    handleClickBox(box) {
      return function() {
        const nextdoorBoxes = box.getNextdoorBoxes();
        const blankBox = nextdoorBoxes.find(
          nextdoorBox => this.state.grid[nextdoorBox.y][nextdoorBox.x] === 0
        );
        if (blankBox) {
          const newGrid = [...this.state.grid];
          swapBoxes(newGrid, box, blankBox);
          if (isSolved(newGrid)) {
            clearInterval(this.tickId);
            this.setState({
              status: "won",
              grid: newGrid,
              move: this.state.move + 1
            });
          } else {
            this.setState({
              grid: newGrid,
              move: this.state.move + 1
            });
          }
        }
      }.bind(this);
    }
  
    render() {
      const { grid, move, time, status } = this.state;
  
      // Render grid
      const newGrid = document.createElement("div");
      newGrid.className = "grid";
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          const button = document.createElement("button");
  
          if (status === "playing") {
            button.addEventListener("click", this.handleClickBox(new Box(j, i)));
          }
  
          button.textContent = grid[i][j] === 0 ? "" : grid[i][j].toString();
          newGrid.appendChild(button);
        }
      }
      document.querySelector(".grid").replaceWith(newGrid);
  
      // Render button
      const newButton = document.createElement("button");
      if (status === "ready") newButton.textContent = "Play";
      if (status === "playing") newButton.textContent = "Reset";
      if (status === "won") newButton.textContent = "Play";
      newButton.addEventListener("click", () => {
        clearInterval(this.tickId);
        this.tickId = setInterval(this.tick, 1000);
        this.setState(State.start());
      });
      document.querySelector(".footer button").replaceWith(newButton);
  
      // Render move
      document.getElementById("move").textContent = `Move: ${move}`;
  
      // Render time
      document.getElementById("time").textContent = `Time: ${time}`;
  
      // Render message
      if (status === "won") {
        document.querySelector(".message").textContent = "You win!";
      } else {
        document.querySelector(".message").textContent = "";
      }
    }
  }
  
  const GAME = Game.ready();
//bubble3

  const boxes = document.querySelectorAll(".box"),
  image = document.querySelector(".image");
//Loop through each boxes element
boxes.forEach((box) => {
  //When a draggable element dragged over a box element
  box.addEventListener("dragover", (e) => {
    e.preventDefault(); //Prevent default behaviour
    box.classList.add("hovered");
  });
  //When a draggable element leaves box element
  box.addEventListener("dragleave", () => {
    box.classList.remove("hovered");
  });
  //When a draggable element is dropped on a box elemen
  box.addEventListener("drop", () => {
    box.appendChild(image);
    box.classList.remove("hovered");
  });
});


//Word and Hints Object
const options = {
  aroma: "Pleasing smell",
  pepper: "Salt's partner",
  halt: "put a stop to",
  jump: "Rise suddenly ",
  shuffle: "Mix cards up ",
  combine: "Add; Mix",
  chaos: "Total disorder",
  labyrinth: "Maze",
  disturb: "Interrupt; upset ",
  shift: "Move; Period of word",
  machine: "Device or appliance",
};

//Initial References
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "",
  randomHint = "";
let winCount = 0,
  lossCount = 0;

//Generate random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

//Block all the buttons
const blocker = () => {
  let lettersButtons = document.querySelectorAll(".letters");
  stopGame();
};

//Start Game
startBtn.addEventListener("click", () => {
  controls.classList.add("hide");
  init();
});

//Stop Game
const stopGame = () => {
  controls.classList.remove("hide");
};

//Generate Word Function
const generateWord = () => {
  letterContainer.classList.remove("hide");
  userInpSection.innerText = "";
  randomWord = words[generateRandomValue(words)];
  randomHint = options[randomWord];
  hintRef.innerHTML = `<div id="wordHint">
  <span>Hint: </span>${randomHint}</div>`;
  let displayItem = "";
  randomWord.split("").forEach((value) => {
    displayItem += '<span class="inputSpace">_ </span>';
  });

  //Display each element as span
  userInpSection.innerHTML = displayItem;
  userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
};

//Initial Function
const init = () => {
  winCount = 0;
  lossCount = 5;
  randomWord = "";
  word.innerText = "";
  randomHint = "";
  message.innerText = "";
  userInpSection.innerHTML = "";
  letterContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  generateWord();

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");

    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);

    //Character button onclick
    button.addEventListener("click", () => {
      message.innerText = `Correct Letter`;
      message.style.color = "#008000";
      let charArray = randomWord.toUpperCase().split("");
      let inputSpace = document.getElementsByClassName("inputSpace");

      //If array contains clicked value replace the matched Dash with Letter
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //If character in array is same as clicked button
          if (char === button.innerText) {
            button.classList.add("correct");
            //Replace dash with letter
            inputSpace[index].innerText = char;
            //increment counter
            winCount += 1;
            //If winCount equals word length
            if (winCount == charArray.length) {
              resultText.innerHTML = "You Won";
              startBtn.innerText = "Restart";
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        button.classList.add("incorrect");
        lossCount -= 1;
        document.getElementById(
          "chanceCount"
        ).innerText = `Chances Left: ${lossCount}`;
        message.innerText = `Incorrect Letter`;
        message.style.color = "#ff0000";
        if (lossCount == 0) {
          word.innerHTML = `The word was: <span>${randomWord}</span>`;
          resultText.innerHTML = "Game Over";
          blocker();
        }
      }

      //Disable clicked buttons
      button.disabled = true;
    });

    //Append generated buttons to the letters container
    letterContainer.appendChild(button);
  }
};

window.onload = () => {
  init();
};