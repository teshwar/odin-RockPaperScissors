//COMPUTER LOGIC
// Function to get computer choice

// Get all computer choice images
const computerChoiceImages = document.querySelectorAll(".c-container img");

// This function removes the 'selected' class from all computer images
function clearComputerSelection() {
  computerChoiceImages.forEach((img) => {
    img.classList.remove("selected");
  });
}

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  const computerSelection = choices[randomIndex];

  // Call the function to clear any previous selection
  clearComputerSelection();

  // Find the image element that matches the computer's choice
  const computerImage = document.querySelector(`#c-${computerSelection}`);

  // Add the 'selected' class to highlight the choice
  if (computerImage) {
    computerImage.classList.add("selected");
  }

  return computerSelection;
}

//GAME LOGIC
// Function to get human choice is not needed
// as it is handled by the event listener in the playGame function
function playRound(humanChoice, computerChoice) {
  const winningConditions = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  if (humanChoice === computerChoice) {
    return "t"; // Tie
  } else if (winningConditions[humanChoice] === computerChoice) {
    return "h"; // Human wins
  } else {
    return "c"; // Computer wins
  }
}

//GET CHOICES
//Human Border
// Get all human choice images
const humanChoiceImages = document.querySelectorAll(".h-container img");

// This function removes the 'selected' class from all human images
function clearHumanSelection() {
  humanChoiceImages.forEach((img) => {
    img.classList.remove("selected");
  });
}

const scoreElement = document.querySelector(".game h2");
const humanContainer = document.querySelector(".h-container");
const startButton = document.querySelector(".game button");
const TIMERDURATION = 1000;

// This function will run a single round of the game
function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  const humanChoices = {
    "h-rock": "rock",
    "h-paper": "paper",
    "h-scissors": "scissors",
  };

  humanContainer.addEventListener("click", (e) => {
    // Prevent the code from running if the game is already over
    if (humanScore >= 5 || computerScore >= 5) {
      return;
    }

    const clickedImage = e.target;
    const imageId = clickedImage.id;
    console.log(clickedImage);

    // Ensure a valid image was clicked
    if (humanChoices[imageId]) {
      //clear previous selections's border and add new one
      clearHumanSelection();
      clickedImage.classList.add("selected");

      const humanChoice = humanChoices[imageId];
      const computerChoice = getComputerChoice();

      const winner = playRound(humanChoice, computerChoice);

      if (winner === "c") {
        computerScore++;
      } else if (winner === "h") {
        humanScore++;
      } else {
        humanScore += 0.5;
        computerScore += 0.5;
      }

      // Remove the highlight after the game is over
      setTimeout(() => {
        clearHumanSelection();
        clearComputerSelection();
      }, TIMERDURATION);

      // Update the score display
      scoreElement.textContent = `Human: ${humanScore} | Computer: ${computerScore}`;

      // Check for a winner after each round
      if (humanScore >= 5) {
        scoreElement.textContent = `You win the game! Final Score: Human: ${humanScore} vs Computer: ${computerScore}\nPress button to restart :)`;
        // Remove the highlight after the game is over
        setTimeout(() => {
          clearHumanSelection();
          clearComputerSelection();
        }, TIMERDURATION);
        return;
      } else if (computerScore >= 5) {
        scoreElement.textContent = `The computer wins! Final Score: Human: ${humanScore} vs Computer: ${computerScore}\nPress button to restart :)`;
        // Remove the highlight after the game is over
        setTimeout(() => {
          clearHumanSelection();
          clearComputerSelection();
        }, TIMERDURATION);
        return;
      }
    }
  });
}

startButton.addEventListener("click", () => {
  alert(
    "Game is about to start, this is a best of 5! \nPlease click on the image to make your choice"
  );
  // Reset scores when a new game starts
  humanScore = 0;
  computerScore = 0;
  scoreElement.textContent = `Please click on the image to make your choice`;

  // Call playGame to set up the event listeners
  playGame();
});
