// universal game array 
let gameArray = new Array(9).fill('1');
let turn = 0;

//choose opponent option 
/*function chooseOpponent (){
    let opponentType = prompt("Whom do you want to play with type A for another user or C for computer");
    while(opponentType!=='A'&& opponentType!== 'a' && opponentType!=='c' && opponentType!== 'C' ){
        opponentType=prompt("Enter either C for computer or A for another player");
    }
    opponentType=opponentType.toUpperCase();
    return opponentType;
} */

// update player names 

/*function updatePlayerNames(opponentType){
    let player1;
    let player2;
    if(opponentType==='A'){
        player1=prompt("Enter player 1 name");
        player2= prompt("Enter player 2 name");
    }
    else{
        player1=prompt("Enter player 1 name");
        player2='Computer';
    }
    return {player1,player2};
}*/
// store the player 1 and player 2 in global variables 
let globalPlayer1;
let globalPlayer2;
// taker user input 
function userInput(){
    displayGameHeader('Select your position of choice')
    let userChoice;
    const gameSquare = document.querySelectorAll('.game-cell');
    return new Promise ((resolve)=>{
        gameSquare.forEach((square,index)=>{
            square.addEventListener('click',()=>{
                resolve(index);
            },{once:true})
        })
    })
}

// take bot input 
function botInput(){
    const botChoice = Math.floor(Math.random()*9);
    return botChoice;
}

// determine turn

function toggleTurn (){
    if (turn===0){
        turn =1;
    }
    else{
        turn=0;
    }
}
//update game array 
async function updateArray(){
    let input;
    highlightCurrentTurn();
    if(turn ===0){
        input = await userInput();
     while(gameArray[input]==='X'|| gameArray[input]==='0'){
        displayGameHeader("Already chosen! Try another spot.");
        input= await userInput();
     }
     gameArray[input]='X'
    }
    else{
        if(globalPlayer2==='Computer'){
                input=botInput();
            while(gameArray[input]==='X'|| gameArray[input]==='0'){
                input=botInput();
            }
            gameArray[input]='0';
        }
        else{
                 input= await userInput();
            while(gameArray[input]==='X'|| gameArray[input]==='0'){
                displayGameHeader("Already chosen! Try another spot.");
                input= await userInput();
            }
            gameArray[input]='0'
        }
    }
    displayMatrix();
    
}

//check win condition 
function checkWinCondition (){
     switch (true) {
    // Rows
    case (gameArray[0] && gameArray[0]!=='1'&& gameArray[0] === gameArray[1] && gameArray[0] === gameArray[2]):
        displayWinLine(8);
      return gameArray[0];
    case (gameArray[3] && gameArray[3]!=='1'&& gameArray[3] === gameArray[4] && gameArray[3] === gameArray[5]):
        displayWinLine(4);
      return gameArray[3];
    case (gameArray[6] && gameArray[6]!=='1'&& gameArray[6] === gameArray[7] && gameArray[6] === gameArray[8]):
        displayWinLine(5);
      return gameArray[6];

    // Columns
    case (gameArray[0] && gameArray[0]!=='1'&& gameArray[0] === gameArray[3] && gameArray[0] === gameArray[6]):
        displayWinLine(7);
      return gameArray[0];
    case (gameArray[1] && gameArray[1]!=='1'&& gameArray[1] === gameArray[4] && gameArray[1] === gameArray[7]):
        displayWinLine(2);
      return gameArray[1];
    case (gameArray[2] && gameArray[2]!=='1'&& gameArray[2] === gameArray[5] && gameArray[2] === gameArray[8]):
        displayWinLine(6);
      return gameArray[2];

    // Diagonals
    case (gameArray[0] && gameArray[0]!=='1'&& gameArray[0] === gameArray[4] && gameArray[0] === gameArray[8]):
        displayWinLine(1);
      return gameArray[0];
    case (gameArray[2] && gameArray[2]!=='1'&& gameArray[2] === gameArray[4] && gameArray[2] === gameArray[6]):
        displayWinLine(3);
      return gameArray[2];

    // Default
    default:
      return null; // No winner yet
  }
}

//check whether array is full 
function checkArrayFull (){
    for(i in gameArray){
        if(gameArray[i]==='1'){
            return 0;
        }
    }
    return 1;
}
//display win loose message 

function dspWinLooseTie(){
    const arrayFull = checkArrayFull();
   
    const winOrLoose = checkWinCondition();
    if(winOrLoose === 'X'){
         displayGameHeader('Player 1 wins! Reset to play again.');
         resetTurnIndicators();
        return 1;
    }
    if(winOrLoose ==='0'){
        displayGameHeader('Player 2 wins! Reset to play again.');
        resetTurnIndicators();
        return 2;
    }
     if(arrayFull){
        displayGameHeader(`It’s a tie! Reset to play again.`);
        resetTurnIndicators();
        return 0;
    }
}


// reset round
function resetRound (){
    gameArray.fill('1');
    turn = 0;
}
// make a game counter // update game counter 

const roundCounter =(()=>{
    let counter=0;
    function getCounter(){
        return counter;
    }
    function updateCounter(){
        counter++;
        return counter;
    }
    return { getCounter,updateCounter};
})();

//auto reset game for next round 
/*function resetForNextRound(){
    if(checkArrayFull()){
        resetRound();
        roundCounter.updateCounter();
    }
}*/

//play a round 

async function playRound(){
    const gameBoard = document.querySelector('.game-board-container');
    const gameCell = document.querySelectorAll('.game-cell');
    const nameForm = document.querySelector('.name-input-form');
    const resetButton = document.querySelector('.reset-button');
    nameForm.style.display='none';
    gameBoard.style.display='grid';
    resetButton.style.display='inline-block';
    gameCell.forEach((cell)=>{
        cell.style.display='block';
    })
  while(!checkArrayFull()){
    if(turn===0){
    await updateArray();
    toggleTurn();
  } 
  else{
    await updateArray();
    toggleTurn();
  } 
  let win =dspWinLooseTie();
  if(win===0||win===1||win===2){
    //resetRound();
    //roundCounter.updateCounter();
    return;
  }
}
  //resetForNextRound();
}



function displayMatrix(){
    const gameSquare = document.querySelectorAll('.game-cell');
    gameSquare.forEach((cell,index)=>{
        if (gameArray[index]==='1'){
            cell.textContent='';
        }
        else{
            cell.textContent=gameArray[index];
        }
    })
    }

// make elements to display the logic on web page 

//function to display contents of top header
function displayGameHeader(text){
    const upperSpace = document.querySelector(".upper-space");
    upperSpace.textContent=text;
}

//display name question and get name
function showNamePanel (NoOfPlayers){
    const nameLabel=document.querySelector(".player-label");
    const inputForm = document.querySelector(".name-input-form");
    const opponentPanel = document.querySelector(".opponent-type-panel");
    let playerNameInput = document.querySelector(".player-name-input");
    displayGameHeader('Please Enter Name:');
    opponentPanel.style.display='none';
    inputForm.style.display='flex';
    if(NoOfPlayers===1){
        nameLabel.innerText='Enter Player 1 Name:'  
        inputForm.addEventListener('submit',(event)=>{
            event.preventDefault();
            const playerName = playerNameInput.value;
            globalPlayer1 = playerName;
            globalPlayer2 = 'Computer';
            displayPlayersSidePanel("left",playerName,"Player1");
            displayPlayersSidePanel("right","Computer","Computer");
            playRound();

        }) 
    }
    else if(NoOfPlayers===2){
        nameLabel.innerText='Enter Player 1 Name:';
        function handleSubmit(event){
            event.preventDefault();
            const playerName1 = playerNameInput.value;
            globalPlayer1 = playerName1;
            displayPlayersSidePanel("left",playerName1,"Player1");
            nameLabel.innerText ='Enter Player 2 Name:';
            playerNameInput.value='';
            inputForm.removeEventListener('submit',handleSubmit);
            inputForm.addEventListener('submit',handleSubmitR);
        }
        inputForm.addEventListener('submit',handleSubmit);
        function handleSubmitR(event){
            event.preventDefault();
            const playerName2 = playerNameInput.value;
            globalPlayer2 = playerName2;
            displayPlayersSidePanel("right",playerName2,"Player2");
            playerNameInput.value='';
            playRound();
            inputForm.removeEventListener('submit',handleSubmitR);
        }

       
      }
       
}

// choose whether to play with other player or computer 

function chooseOpponent() {
    const opponentPanel = document.querySelector(".opponent-type-panel");
    const opponentType = document.querySelectorAll(".choose-opponent");
    opponentPanel.style.display='flex';
    displayGameHeader("Who would you like to play against ?");

    opponentType.forEach(button=>{
        button.addEventListener('click',(event)=>{
            const buttonValue = event.target.dataset.value;
            if(buttonValue==='C'){
                showNamePanel(1);
                return 'C';
            }
            else{
                showNamePanel(2);
                return 'A';
            }
        })
    })

}

chooseOpponent();

//display character pics for players and or computer 

function displayPlayersSidePanel(side,nameToDisplay,playerType){
    const leftSide = document.querySelector('.left-middle');
    const rightSide= document.querySelector('.right-middle');
    const name = document.createElement('div');
    const image= document.createElement('img');
    const turnMessage=document.createElement('div');
    name.classList.add('player-name-display-side-panel');
    image.classList.add('player-image-display-side-panel');
    turnMessage.classList.add('turn-message');
    if(side==='left'){
        leftSide.innerHTML='';
        name.innerText = nameToDisplay;
        image.src="images/player1.png";
        image.alt="Player 1 image";
        turnMessage.classList.add('left-side-turn-message');
        name.classList.add('left-name');
        leftSide.appendChild(image);
        leftSide.appendChild(name);
        leftSide.appendChild(turnMessage);
        
    }
    if (side==='right'){
        rightSide.innerHTML='';
        turnMessage.classList.add('right-side-turn-message');
        name.classList.add('right-name');
        if(playerType==='Player2'){
            name.innerText = nameToDisplay;
            image.src="images/player2.png";
            image.alt="Player 2 image";

        }
        else if(playerType==='Computer'){
            name.innerText = 'Computer';
            image.src="images/playerComputer.png";
            image.alt="Computer image";
        }
        rightSide.appendChild(image);
        rightSide.appendChild(name);
        rightSide.appendChild(turnMessage);
        
    }
}
//highlight the current turn player 

function highlightCurrentTurn(){
    const playerNameDisplayLeft = document.querySelector('.left-name');
    const playerNameDisplayRight = document.querySelector('.right-name');
    const turnMessageLeft = document.querySelector('.left-side-turn-message');
    const turnMessageRight = document.querySelector('.right-side-turn-message');
    const playerOne = playerNameDisplayLeft.innerText;
    const playerTwo = playerNameDisplayRight.innerText;

    if(turn===0){
        turnMessageRight.innerText='';
        turnMessageLeft.innerText=`${playerOne}'s Turn`;
        playerNameDisplayRight.style.backgroundColor='transparent';
        playerNameDisplayLeft.style.backgroundColor='red';
    }
    else if(turn===1){
        turnMessageLeft.innerText='';
        turnMessageRight.innerText=`${playerTwo}'s Turn`;
        playerNameDisplayLeft.style.backgroundColor='transparent';
        playerNameDisplayRight.style.backgroundColor='red';
    }
   

}

function resetTurnIndicators () {
    const playerNameDisplayLeft = document.querySelector('.left-name');
    const playerNameDisplayRight = document.querySelector('.right-name');
    const turnMessageLeft = document.querySelector('.left-side-turn-message');
    const turnMessageRight = document.querySelector('.right-side-turn-message');
    turnMessageRight.innerText='';
    turnMessageLeft.innerText='';
    playerNameDisplayRight.style.backgroundColor='transparent';
    playerNameDisplayLeft.style.backgroundColor='transparent';
}


// button to reset the game 
function resetGame(){
    const resetButton = document.querySelector('.reset-button');
    resetButton.addEventListener('click',()=>{
        resetRound();
        displayMatrix();
        playRound();
        resetWinLine();
    })
}

resetGame();

// display win loose tie message 
//function displayPlayerChoic

// draw win line 
function displayWinLine(linePosition) {
    const winLine = document.querySelector('.win-line');
    winLine.style.display = 'block';
    winLine.style.transform = '';  
    winLine.style.left = '0';      
    winLine.style.top = '0'; 

    switch (linePosition) {
        case 1:
            winLine.style.top = '190px';
            winLine.style.transform = 'rotate(45deg) scale(1.36)';
            break;

        case 2:
            winLine.style.top = '190px';
            winLine.style.transform = 'rotate(90deg)';
            break;

        case 3:
            winLine.style.top = '190px';
            winLine.style.transform = 'rotate(135deg) scale(1.36)';
            break;

        case 4:
            winLine.style.top = '190px';
            break;

        case 5:
            winLine.style.top = '330px';
            break;

        case 6:
            winLine.style.top = '190px';
            winLine.style.left = '130px';
            winLine.style.transform = 'rotate(90deg)';
            break;

        case 7:
            winLine.style.top = '190px';
            winLine.style.left = '-130px';
            winLine.style.transform = 'rotate(90deg)';
            break;

        case 8:
            winLine.style.top = '50px';
            break;

        default:
            console.warn('Invalid linePosition:', linePosition);
    }
}

function resetWinLine(){
    const winLine = document.querySelector('.win-line');
    winLine.style.display = 'none';
}
