// Contains the logic for the course of the game
// Randomly selects a word and uses the Word constructor to store it
// Prompts the user for each guess and keeps track of the user's remaining guesses
var Word = require("./word.js");
var inquirer = require("inquirer");

var alphArray = "abcdefghijklmnopqrstuvwxyz";
var wordList = ["yosemite", "california", "texas", "michigan", "hawaii", "philadelphia", "morocco", "montana", "louisiana", "italy"];

// Pick random word to guess from wordList array
var randIndex = Math.floor(Math.random() * wordList.length);
var randWord = wordList[randIndex];

// Pass random word to Word constructor
guessWord = new Word(randWord);
var requireNewWord = false;

// Array to track guessed letters and guesses left
var incorrect = [];
var correct = [];
var guessesLeft = 10;

function game() {
    // Generate new word in Word constructor if true
    if (requireNewWord){
        var randIndex = Math.floor(Math.random() * wordList.length);
        var randWord = wordList[randIndex];
        guessWord = new Word(randWord);
        requireNewWord = false;
    }

    // Check if guessed letter is correct
    var wordFinal = [];
    guessWord.letterArray.forEach(completeCheck);

    // Letters remaining to be guessed
    if(wordFinal.includes(false)){
        inquirer.prompt([
            {
                type: "input",
                message: "Guess a letter!",
                name: "userinput"
            }
        ])
        .then(function(input){
            if(!alphArray.includes(input.userinput) || input.userinput.length > 1){
                console.log("\nEnter valid input!\n");
                game();
            }
            else{
                if(incorrect.includes(input.userinput) || correct.includes(input.userinput) || input.userinput === ""){
                    console.log("\nAlready Guessed or Nothing Entered\n");
                    game();
                }
                else{
                    var wordCheckArr = [];
                    guessWord.userGuess(input.userinput);
                    guessWord.letterArray.forEach(wordCheck);
                    if(wordCheckArr.join('') === wordFinal.join('')){
                        console.log("\nINCORRECT!\n");
                        incorrect.push(input.userinput);
                        guessesLeft--;
                    }
                    else{
                        console.log("\nCORRECT!\n");
                        correct.push(input.userinput);
                    }
                    guessWord.log();
                    console.log(guessesLeft + " guesses left!!!\n");
                    console.log("Letters Guessed: " + incorrect.join(" ") + "\n");

                    if (guessesLeft > 0){
                        game();
                    } else {
                        console.log("Sorry, you lost!\n");
                        restartGame();
                    }
                    function wordCheck(key){
                        wordCheckArr.push(key.guessed);
                    }
                }
            }
        })
    } else {
        console.log("You got it right!\n");
        restartGame();
    }
    function completeCheck(key){
        wordFinal.push(key.guessed);
    }
}

// Function to restart word guess game if the user wins or loses
function restartGame(){
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to:",
            choices: ["Play Again", "Exit"],
            name: "restart"
        }
    ])
    .then(function(input){
        if (input.restart === "Play Again") {
            requireNewWord = true;
            incorrect = [];
            correct = [];
            guessesLeft = 10;
            game();
        } else {
            return
        }
    })
}

game();