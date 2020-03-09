// Contains constructor Word that depends on the Letter constructor
// Used to create an objecty representing the current word the user is attempting to guess
var Letter = require("./letter.js");

function Word(answer){
    // Array for new Letter objects representing the leters of the underlying word
    this.letterArray = [];
    for (var i = 0; i < answer.length; i++){
        var letter = new Letter(answer[i]);
        this.letterArray.push(letter);
    }
    // Returns a string representing the word
    this.log = function (){
        answerLog = "";
        for (var i = 0; i < this.letterArray.length; i++){
            answerLog += this.letterArray[i] + " ";
        }
        console.log(answerLog + "\n");
    };
    // Takes a character as an argument and calls the guess function on each letter object
    this.userGuess = function (input){
        for (var i = 0; i < this.letterArray.length; i++){
            this.letterArray[i].guess(input);
        }
    }
};

module.exports = Word;