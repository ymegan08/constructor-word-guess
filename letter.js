// Contains constructor Letter to display an underlying character or a blank placeholder,
// depending on whether or not the user has guessed the letter

function Letter (value) {
    this.letter = value,
    this.guessed = false,
    // Function that returns underlying character
    this.toString = function () {
        if (this.letter == " ") {
            this.guessed = true;
            return " ";
        } else if (this.guessed === false) { // Return underscore if the letter has not been guessed
            return "_";
        } else {
            return this.letter;
        }
    };
    // Function that takes a character as an argument and checks it atgainst the underlying character
    this.guess = function (guess) {
        if (guess === this.letter) {
            this.guessed = true;
        }
    };
};

module.exports = Letter;
