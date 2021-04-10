// Variable and objects declarations

const options = ['Pedra', 'Papel', 'Tesoura'];

function Button(value, htmlElement) {
    this.value = value;
    this.htmlElement = htmlElement;
}

const rockButton = new Button(options[0], document.querySelector('.rock'));
const paperButton = new Button(options[1], document.querySelector('.paper'));
const scissorsButton = new Button(options[2], document.querySelector('.scissors'));

const playerButtons = [rockButton, paperButton, scissorsButton];

const playerSlot = document.querySelector('.playerSlot');
const enemySlot = document.querySelector('.enemySlot');
const playerScoreSlot = document.getElementById('playerScore');
const enemyScoreSlot = document.getElementById('enemyScore');
const result = document.querySelector('.result p');

let playerScore = 0;
let enemyScore = 0;

let selectedOption;
let enemySelectedOption;

let numberOfTurns = 3;
const maxPointsPerTurn = 1;

let resetButton;

//

function selectOption(value) {
    selectedOption = value;
    playerSlot.textContent = selectedOption;
}

function setScore() {
    playerScoreSlot.innerHTML = playerScore;
    enemyScoreSlot.innerHTML = enemyScore;
}


function resetTheGame() {

    playerScoreSlot.textContent = 0;
    enemyScoreSlot.textContent = 0;

    playerScore = 0;
    enemyScore = 0;

    numberOfTurns = 3;

    playerSlot.textContent = ' ';
    enemySlot.textContent = ' ';
    result.textContent = ' ';

    resetButton.parentNode.removeChild(resetButton);

    playerButtons.forEach(element => {
        element.htmlElement.disabled = false;
    });
}

function setGameOver() {

    playerButtons.forEach(element => {
        element.htmlElement.disabled = true;
    });

    resetButton = document.createElement('button');
    resetButton.textContent = 'Jogar novamente';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', function() {
        resetTheGame();
    });
}

function checkIfWin(playerScore, enemyScore) {
    if (Number(playerScore > enemyScore + numberOfTurns * maxPointsPerTurn))
    {
        result.textContent = 'O jogador ganhou!';
        setGameOver();
    }
    else if (Number(enemyScore > playerScore + numberOfTurns * maxPointsPerTurn))
    {
        result.textContent = 'O inimigo ganhou!';
        setGameOver();
    }
}

function compareOptions(selectedOption, enemySelectedOption) {

    if (selectedOption === 'Pedra' && enemySelectedOption === 'Tesoura')
    {
        result.textContent = 'Ponto para o jogador!';
        playerScore++;
        numberOfTurns--;
    } 

    else if (selectedOption === 'Papel' && enemySelectedOption === 'Pedra')
    {
        result.textContent = 'Ponto para o jogador!';
        playerScore++;
        numberOfTurns--;
    }
    
    else if (selectedOption === 'Tesoura' && enemySelectedOption === 'Papel')
    {
        result.textContent = 'Ponto para o jogador!';
        playerScore++;
        numberOfTurns--;
    }

    else if (selectedOption === enemySelectedOption)
    {
        result.textContent = 'Empatou!';
    }

    else {
        result.textContent = 'Ponto para o computador!';
        enemyScore++;
        numberOfTurns--;
    }
}

function getEnemyOption() {
    enemySelectedOption = options[Math.floor(Math.random() * 3)];
    enemySlot.textContent = enemySelectedOption;
}

// Gameplay triggers

playerButtons.forEach(element => {
    element.htmlElement.addEventListener('click', function() {

        selectOption(element.value); // set a value to the selectedOption variable

        getEnemyOption(); // Generates the enemy selected option pseudo-randomly

        compareOptions(selectedOption, enemySelectedOption);

        setScore(playerScore, enemyScore);

        checkIfWin(playerScore, enemyScore);

    });
});