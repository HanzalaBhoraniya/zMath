const explosionSound = new Audio("/Sounds/explosion.wav");
const ErrorSound = new Audio("/Sounds/Error.mp3");
const gameOverSound = new Audio("/Sounds/gameOver.wav");
const answerInputs = document.querySelectorAll(".answerInputBox");
const gameOver = document.getElementById("gameOver");
const playAgainBtn = document.getElementById("playAgain");
const answerInputBoxWrapper = document.getElementById("answerInputBoxWrapper");
const scoreText = document.getElementById("score");
const startGameBtn = document.getElementById("startBtn");
const soloInput = document.getElementById("solo");
const soloInputField = document.getElementById("soloInputField");
const winnerH2 = document.getElementById("winner")
const gameOverH1 = document.getElementById("gameOverH1")
const gameMode = new URLSearchParams(window.location.search).get("mode");
const startScreen = document.getElementById("startScreen");
const canvas = document.getElementById("gameCanvas"); // this is our black canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d"); // this is our pain brush
let level = 1;
let score = 0;
let playersScore = {};
let isGameOver = false;
let startGameExsist = true;
let activeBlocks = [];
const getRandomNumbers = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const randomX = () => {
  let maxX = canvas.width - 105;
  return Math.floor(Math.random() * (maxX + 1));
};
const checkAns = (input) => {
  if (isGameOver) {
    gameRestart();
  }
  let answer = Number(input.value);
  for (activeBlock of activeBlocks) {
    if (answer === activeBlock.answer) {
      let index = activeBlocks.indexOf(activeBlock);
      activeBlocks.splice(index, 1);
      explosionSound.currentTime = 0;
      explosionSound.play();
      score++;
      level = Math.floor(score / 10 + 1);
      if (gameMode === "multi") {
        playersScore[jsonData.username]++;
        let scoreBoard = document.getElementById(`score-${jsonData.username}`);
        scoreBoard.innerText =
          jsonData.username + " " + playersScore[jsonData.username];
      }
      break;
    } else {
      if (!isGameOver) {
        ErrorSound.currentTime = 0;
        ErrorSound.play();
      }
    }
  }
  input.value = "";
};
const getEquation = () => {
  operators = [" + ", " - ", " * ", " / "];
  let num1, num2, operator, min, max;
  min = level * 2;
  max = level * 10;
  num1 = getRandomNumbers(min, max);
  num2 = getRandomNumbers(min, max);
  if (level <= 2) {
    // only addition
    operator = " + ";
    return {
      equation: num1 + operator + num2,
      operator: operator,
    };
  } else if (level <= 4) {
    // addtion plus substraction.
    index = getRandomNumbers(0, 1);
    operator = operators[index];
    if (operator === " - " && num1 < num2) {
      return {
        equation: num2 + operator + num1,
        operator: operator,
      };
    }
    return {
      equation: num1 + operator + num2,
      operator: operator,
    };
  } else if (level <= 5) {
    //addition, substraction and multiplication
    index = getRandomNumbers(0, 2);
    operator = operators[index];
    if (operator === " - " && num1 < num2) {
      return {
        equation: num1 + operator + num2,
        operator: operator,
      };
    }
    return {
      equation: num1 + operator + num2,
      operator: operator,
    };
  } else if (level <= 10) {
    // add, substract, multiply and divide.
    index = getRandomNumbers(0, 3);
    operator = operators[index];
    if (operator === " / ") {
      let div = num1 * num2;
      return {
        equation: div + operator + num1,
        operator: operator,
      };
    } else if (operator === " - " && num1 < num2) {
      return {
        equation: num2 + operator + num1,
        operator: operator,
      };
    }
    return {
      equation: num1 + operator + num2,
      operator: operator,
    };
  } else if (level <= 15) {
    // now the answer can also be in negative.
    index = getRandomNumbers(0, 3);
    operator = operators[index];
    if (operator === " / ") {
      let div = num1 * num2;
      return {
        equation: div + operator + num1,
        operator: operator,
      };
    }
    return {
      equation: num1 + operator + num2,
      operator: operator,
    };
  } else if (level > 15) {
    // now the equation will also have negative numbers.
    min = level * -10;
    max = level * 10;
    num1 = getRandomNumbers(min, max);
    num2 = getRandomNumbers(min, max);
    let NegativeNum2;
    if (num2 < 0) {
      // if num2 is negative then add the brackets so it becomes easer for the user to read.
      NegativeNum2 = `(${num2})`;
    }
    index = getRandomNumbers(0, 3);
    operator = operators[index];
    if (operator === " / ") {
      let div = num1 * num2;
      if (num2 < 0) {
        // if num2 is negative then add the brackets so it becomes easer for the user to read.
        return {
          equation: div + operator + NegativeNum2,
          operator: operator,
        };
      }
      return {
        equation: div + operator + num2,
        operator: operator,
      };
    } else if (operator === " + " || operator === " - ") {
      if (num1 < 0 && num2 > 0) {
        if (num2 < 0) {
          // if num2 is negative then add the brackets so it becomes easer for the user to read.
          return {
            equation: div + operator + NegativeNum2,
            operator: operator,
          };
        }
        return {
          equation: num1 + operator + num2,
          operator: operator,
        };
      } else if (num1 > 0 && num2 < 0) {
        if (num2 < 0) {
          // if num2 is negative then add the brackets so it becomes easer for the user to read.
          return {
            equation: div + operator + NegativeNum2,
            operator: operator,
          };
        }
        return {
          equation: num2 + operator + num1,
          operator: operator,
        };
      } else if (num1 < 0 && num2 < 0) {
        // if both are negetive then re-generate an equation.
        return getEquation();
      } else {
        // if both are positive.
        return {
          equation: num1 + operator + num2,
          operator: operator,
        };
      }
    }
    if (num2 < 0) {
      // if num2 is negative then add the brackets so it becomes easer for the user to read.
      return {
        equation: div + operator + NegativeNum2,
        operator: operator,
      };
    }
    return {
      equation: num1 + operator + num2,
      operator: operator,
    };
  }
};
const calculateSpeed = () => {
  return 1.5 + score * 0.1;
};
let highestScore;
let result = localStorage.getItem("zMathRecord");
if (result) {
  highestScore = Number(result);
} else {
  highestScore = 0;
}
function gameRestart() {
  let result = localStorage.getItem("zMathRecord");
  if (result) {
    highestScore = Number(result);
  } else {
    highestScore = 0;
  }
  activeBlocks = [];
  isGameOver = false;
  score = 0;
  level = 1;
  Object.keys(playersScore).forEach((key) => {
    playersScore[key] = 0;
    let playerScoreText = document.getElementById("score-" + key);
    if (playerScoreText) {
      playerScoreText.innerText = key + " 0";
    }
  });
  gameOver.classList.add("displayNone");
  // answerInput.focus()
  gameLoop();
}
function spawnBlock() {
  let getEquationResult = getEquation();
  let operator = getEquationResult.operator;
  let newEquation = getEquationResult.equation;
  let newAnswer = eval(newEquation);
  let displayEquation;
  if (operator === " * ") {
    displayEquation = newEquation.replace("*", "×");
  } else if (operator === " / ") {
    displayEquation = newEquation.replace("/", "÷");
  } else {
    displayEquation = newEquation;
  }
  ctx.font = "25px Poppins";
  let newWidth = ctx.measureText(newEquation).width;
  let newBlock = {
    x: randomX(),
    y: -40,
    width: newWidth + 40,
    equation: displayEquation,
    answer: newAnswer,
    speed: Math.min(8, calculateSpeed()),
    operator: getEquationResult.operator,
  };
  activeBlocks.push(newBlock);
}
function gameLoop() {
  if (isGameOver) {
    if (gameMode === "multi") {
      let topScore = -1;
      let winner;
      for (let players in playersScore) {
        if (playersScore[ players ] > topScore) {
          // we found the winner.
          winner = players;
          topScore = playersScore[players]
        }
      }
      gameOverH1.innerText = `${winner} wins!`
      scoreText.innerText = `Winning score: ${topScore}`
      gameOver.classList.remove("displayNone");
    } else if (gameMode === "solo") {
      gameOverH1.innerText = "GAME OVER"
      scoreText.innerText = `Score: ${score}`;
      gameOver.classList.remove("displayNone");
    }
    return; // this will help us to stop the game.
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let bottomBorder = canvas.height - 40;
  // styling for score.
  ctx.fillStyle = "#00FF00";
  ctx.font = "20px monospace";
  ctx.textAlign = "left";
  let scoreWidth;
  if (gameMode === "multi") {
    ctx.fillText(`Total Score: `, 15, 15);
    scoreWidth = ctx.measureText("Total Score: ").width;
  } else if (gameMode === "solo") {
    ctx.fillText(`Score: `, 15, 15);
    scoreWidth = ctx.measureText("Score: ").width;
  }
  ctx.fillText(`${score}`, scoreWidth + 10, 16.7);
  // styling for highest score.
  ctx.textAlign = "right";
  let numberWidth = ctx.measureText(` ${highestScore}`).width;
  ctx.fillText(`Highest Score: `, canvas.width - numberWidth, 15);
  let hiScoreWidth = ctx.measureText("Highest Score:").width;
  ctx.fillText(`${highestScore}`, canvas.width - 16, 16.7); // adjusting that number.
  for (activeBlock of activeBlocks) {
    activeBlock.y = activeBlock.y + activeBlock.speed;
    // now for currect equation and block.
    ctx.fillStyle = "#FF0055";
    ctx.beginPath();
    ctx.roundRect(activeBlock.x, activeBlock.y, activeBlock.width, 40, [10]);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "25px Poppins";
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.fillText(
      activeBlock.equation,
      activeBlock.x + activeBlock.width / 2,
      activeBlock.y + 40 * 0.25,
    );
    if (activeBlock.y >= bottomBorder) {
      isGameOver = true;
      gameOverSound.currentTime = 0;
      gameOverSound.play();
      // checking for highest score and currect score.
      if (score > highestScore) {
        localStorage.setItem("zMathRecord", score);
      }
    }
  }
  requestAnimationFrame(gameLoop);
}

playAgainBtn.addEventListener("click", gameRestart);
// adding shortcut to focus answer input box with slash.
document.addEventListener("keydown", (event) => {
  if (event.key === "/") {
    event.preventDefault();
    // answerInput.focus()
  }
  if (isGameOver) {
    if (event.key === "Enter") {
      gameRestart();
    }
  }
  if (event.key === "ArrowUp") {
    score += 10;
    level = Math.floor(score / 10 + 1);
  }
});
// now we are teching our pc to how to read the incomming data.

const socket = io(); // means our pc web browser will request server to upgrade to permanent webSocket connection.

socket.on("player_input", (jsonData) => {
  let playerInput = document.querySelector(
    `[data-username="${jsonData.username}"]`,
  );
  if (jsonData.key === "Enter") {
    if (isGameOver) {
      gameRestart();
    }
    let answer = Number(playerInput.value);
    for (activeBlock of activeBlocks) {
      if (answer === activeBlock.answer) {
        let index = activeBlocks.indexOf(activeBlock);
        activeBlocks.splice(index, 1);
        explosionSound.currentTime = 0;
        explosionSound.play();
        score++;
        playersScore[jsonData.username]++;
        let scoreBoard = document.getElementById(`score-${jsonData.username}`);
        scoreBoard.innerText =
          jsonData.username + " " + playersScore[jsonData.username];
        level = Math.floor(score / 10 + 1);
        socket.emit("trigger_haptic", {
          username: jsonData.username,
          type: "hit",
        });
        break;
      } else {
        if (!isGameOver) {
          ErrorSound.currentTime = 0;
          ErrorSound.play();
          socket.emit("trigger_haptic", {
            username: jsonData.username,
            type: "miss",
          });
        }
      }
    }
    playerInput.value = "";
  } else if (jsonData.key === "Del") {
    playerInput.value = playerInput.value.slice(0, -1);
  } else {
    playerInput.value += jsonData.key;
  }
});
startGameBtn.addEventListener("click", (event) => {
  gameLoop();
  startScreen.classList.add("displayNone");
  startGameExsist = false;
  // answerInput.focus()
  setInterval(spawnBlock, 3000);
  if (gameMode === "solo") {
    soloInputField.focus();
  }
});

// INPUT box.
if (gameMode === "solo") {
  soloInput.classList.remove("displayNone");
  soloInputField.focus();
  soloInputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      checkAns(soloInputField);
    }
  });
} else if (gameMode === "multi") {
  socket.emit("get_active_players");
  socket.on("active_players", (activePlayers) => {
    const playerNum = activePlayers.length;
    for (let i = 0; i < playerNum; i++) {
      playersScore[activePlayers[i]] = 0;
      let newPlayerInput = document.createElement("div");
      let usernamePara = document.createElement("p");
      let answerInput = document.createElement("input");
      usernamePara.innerText = `${activePlayers[i]} ${playersScore[activePlayers[i]]}`;
      usernamePara.classList.add("username");
      usernamePara.id = `score-${activePlayers[i]}`;
      answerInput.classList.add("answerInputBox");
      answerInput.autocomplete = "off";
      answerInput.type = "text";
      answerInput.setAttribute("data-username", activePlayers[i]);
      newPlayerInput.classList.add("players");
      newPlayerInput.appendChild(usernamePara);
      newPlayerInput.appendChild(answerInput);
      answerInputBoxWrapper.appendChild(newPlayerInput);
    }
  });
}
