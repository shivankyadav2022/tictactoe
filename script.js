// universal game array 
let gameArray = new Array(9).fill('1');
let turn = 0;

//choose opponent option 
function chooseOpponent (){
    let opponentType = prompt("Whom do you want to play with type A for another user or C for computer");
    while(opponentType!=='A'&& opponentType!== 'a' && opponentType!=='c' && opponentType!== 'C' ){
        opponentType=prompt("Enter either C for computer or A for another player");
    }
    opponentType=opponentType.toUpperCase();
    return opponentType;
}

// update player names 

function updatePlayerNames(opponentType){
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
}
// store the player 1 and player 2 in global variables 
let {player1:Globalplayer1, player2:Globalplayer2}=updatePlayerNames(chooseOpponent());
// taker user input 
function userInput(){
    const userChoice = prompt("Enter your position choice");
    return userChoice;
}

// take bot input 
function botInput(){
    const botChoice = Math.floor(Math.random()*9);
    console.log(botChoice);
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
function updateArray(){
    if(turn ===0){
     let input =userInput();
     while(gameArray[input]==='X'|| gameArray[input]==='0'){
        console.log("This place is already taken");
        input=userInput();
     }
     gameArray[input]='X'
    }
    else{
        if(Globalplayer2==='Computer'){
            let input=botInput();
            while(gameArray[input]==='X'|| gameArray[input==='0']){
                input=botInput();
            }
            gameArray[input]='0';
        }
        else{
            let input=userInput();
            while(gameArray[input]==='X'|| gameArray[input==='0']){
                console.log("This place is already taken");
                input=userInput();
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
    case (gameArray[0] && gameArray[0] === gameArray[1] && gameArray[0] === gameArray[2]):
      return gameArray[0];
    case (gameArray[3] && gameArray[3] === gameArray[4] && gameArray[3] === gameArray[5]):
      return gameArray[3];
    case (gameArray[6] && gameArray[6] === gameArray[7] && gameArray[6] === gameArray[8]):
      return gameArray[6];

    // Columns
    case (gameArray[0] && gameArray[0] === gameArray[3] && gameArray[0] === gameArray[6]):
      return gameArray[0];
    case (gameArray[1] && gameArray[1] === gameArray[4] && gameArray[1] === gameArray[7]):
      return gameArray[1];
    case (gameArray[2] && gameArray[2] === gameArray[5] && gameArray[2] === gameArray[8]):
      return gameArray[2];

    // Diagonals
    case (gameArray[0] && gameArray[0] === gameArray[4] && gameArray[0] === gameArray[8]):
      return gameArray[0];
    case (gameArray[2] && gameArray[2] === gameArray[4] && gameArray[2] === gameArray[6]):
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
    if(arrayFull){
        console.log("Its a tie");
        return 0;
    }
    const winOrLoose = checkWinCondition();
    if(winOrLoose === 'X'){
        console.log("Player 1 wins");
        return 1;
    }
    if(winOrLoose ==='0'){
        console.log("Player 2 wins");
        return 2;
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
function resetForNextRound(){
    if(checkArrayFull()){
        resetRound();
        roundCounter.updateCounter();
    }
}

//play a round 

function playRound(){
  while(!checkArrayFull()){
    if(turn===0){
    updateArray();
    toggleTurn();
  } 
  else{
    updateArray();
    toggleTurn();
  } 
  let win =dspWinLooseTie();
  if(win===0||win===1||win===2){
    resetRound();
    roundCounter.updateCounter();
    return;
  }
}
  resetForNextRound();
}

playRound();

function displayMatrix(){
    console.log('The current position of board is:');
    let k=0;
    for(i=0;i<3;i++){
        let row='';
        for(j=0;j<3;j++){
            if(gameArray[i+k]==='1')
                row+='_ ';
            else
                row+=gameArray[i+k]+' ';
            k++;
        } 
        k-=1;
        console.log(row);
    }
}