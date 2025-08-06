// function to get computer choice
function getComputerChoice(){
    //Return random number from 0,1,2
    let number  = Math.floor(Math.random() * 3);

    switch(number){
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}

//function to get human choice
function getHumanChoice(){
    let choice = prompt("Please input a choice: rock, paper, or scissors");
    choice = choice.toLowerCase()

    if ((choice == "rock") || (choice == "paper") || (choice == "scissors")){
        return choice ;
    } else{
        return "Invalid Input"; 
    }
}

//game logic and winner
function playRound(humanChoice, computerChoice){
    //create an object with winning condition given humanChoice
    const winningConditions = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper"
    };

    if (humanChoice === computerChoice) {
        return "t";
     } else if (winningConditions[humanChoice] === computerChoice) {
      return "h"
    } else {
        return "c";
    }
}

//full game
function playGame(){
    let humanScore = 0;
    let computerScore = 0;

    let humanChoice;
    let computerChoice;
    let winner;
    for (let i = 0; i < 5; i++) {
        humanChoice = getHumanChoice();
        computerChoice = getComputerChoice();

        winner = playRound(humanChoice,computerChoice)

        if (winner == "c"){
            computerScore += 1;
        } else if (winner == "h"){
            humanScore += 1;
        } else {
            humanScore += 0.5;
            computerScore += 0.5;
        }
    }

    alert(`Final Score Human: ${humanScore} vs ${computerScore} Computer`);

}



playGame();