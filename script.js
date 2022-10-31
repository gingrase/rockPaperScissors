console.log("Game on!");
const roundToWin = 5;
let playerScore = 0;
let computerScore = 0;
let drawGames = 0;

    function getComputerChoice() {
        const computerHand = Math.random();
        if (computerHand < 0.3) {
            return '✋';
        } else if (computerHand < 0.6) {
            return '✌';
        } else {
            return '✊';
        }
    }

    function displayComputerChoice(computerSelection) {
        const computerHand = document.querySelector('.computer');

        // remove previous round computer hand
        const oldHand = document.querySelector('.roundComputer');
        if (oldHand) {
            computerHand.removeChild(oldHand);
        }

        // display this round computer hand
        const currentHand = document.createElement('p');
        currentHand.textContent = computerSelection;
        currentHand.classList.add('roundComputer');           
        computerHand.appendChild(currentHand);
    }

    function displayRoundResult(result) {
        const resultContainer = document.querySelector('.round');

        // remove previous round result
        const oldResult = document.querySelector('.roundResult');
        if (oldResult) {
            resultContainer.removeChild(oldResult);
        }

        // display this round result
        const currentResult = document.createElement('p');
        currentResult.textContent = result;
        currentResult.classList.add('roundResult');           
        resultContainer.appendChild(currentResult);
    }

    function adjustGameStatus() {
        const gameContainer = document.querySelector('.game');

        // remove previous game status
        const oldStatus = document.querySelectorAll('.gameStatus');
        if (oldStatus) {
            oldStatus.forEach((a) => gameContainer.removeChild(a));
        }

        // display the game status
        const currentStatus = document.createElement('p');
        currentStatus.textContent = ('Score is: You = ' + playerScore + ' | Computer = ' + computerScore);
        currentStatus.classList.add('gameStatus');           
        gameContainer.appendChild(currentStatus);

        // if someone won, display winner and reset game
        if (playerScore === roundToWin) {
            const gameResult = document.createElement('p');
            gameResult.textContent = ('YOU WON THE GAME!!!');
            gameResult.classList.add('gameStatus');           
            gameContainer.appendChild(gameResult);  
            playerScore = 0;
            computerScore = 0;
            drawGames = 0;  
        } else if (computerScore === roundToWin) {
            const gameResult = document.createElement('p');
            gameResult.textContent = ('THE COMPUTER WON THE GAME, BETTER LUCK NEXT TIME!!!');
            gameResult.classList.add('gameStatus');           
            gameContainer.appendChild(gameResult); 
            playerScore = 0;
            computerScore = 0;
            drawGames = 0;
        }
    }

    function playRound(choice) {
        const computerSelection = getComputerChoice();
        displayComputerChoice(computerSelection);
        const playerSelection = choice.target.id;
        if (playerSelection === computerSelection) {
            drawGames++;
            displayRoundResult('Draw');
        } else if ( ((playerSelection === '✊')&&(computerSelection === '✌'))||
                    ((playerSelection === '✋')&&(computerSelection === '✊'))||
                    ((playerSelection === '✌')&&(computerSelection === '✋')) ) {
            playerScore++;
            displayRoundResult('You win... :)'); 
        } else {
            computerScore++;
            displayRoundResult('Computer win... :('); 
        }
        adjustGameStatus();
    }

    const btn = document.querySelectorAll(".playersChoice");
    for (let button of btn) {
        button.addEventListener("click", playRound);
    }


