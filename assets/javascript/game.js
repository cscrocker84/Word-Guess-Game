var wordBank = [
    "beckham",
    "rooney",
    "sterling",
    "moore",
    "carrol",
    "seamen",
    "cole",
    "charlton",
    "kane",
];
// Declare Variables for game functions
var word = "";                              
var answerArray = [];                       
var wrongGuesses = [];                      
var wordLetters = [];                      
var remainingLetters = 11;                 
var wins = 0;
var losses = 0;
// Link elements to the html document with getElementById
var getStartedText = document.getElementById("opening-text");
var answerArrayText = document.getElementById("answer-text");
var remainingLettersText = document.getElementById("remaining-letters");
var wrongGuessesText = document.getElementById("guessed-letters");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");

// create function to start new round

function startRound() {                            
    answerArray = [];
    wrongGuesses = [];
    wordLetters = [];
    remainingLetters = 11;
    remainingLettersText.textContent = "Incorrect guesses remaining: " + remainingLetters;
    wrongGuessesText.textContent = "Incorrect guesses: " + wrongGuesses.join(" ");
    getRandomWord();
    makeAnswerArray();
}

// function to pick a word from the wordbank randomly and turn that word into an array
function getRandomWord() {                          
    word = wordBank[Math.floor(Math.random() * wordBank.length)];
    wordLetters = word.split("");                  
}
 // Function to load answerArray with blanks the length of random word
function makeAnswerArray(){                        
    for (var i = 0; i < word.length; i++) {
        answerArray[i] = "_";
    }
    answerArrayText.textContent = answerArray.join(" ");
}

// Finds wrong guesses and pushes them to wrongGuesses array
function checkGuess(array, element) {               
    if (array.indexOf(element) === -1) {
        wrongGuesses.push(element);
        remainingLetters--;
        wrongGuessesText.textContent = "Incorrect guesses: " + wrongGuesses.join(" ");
        remainingLettersText.textContent = "Incorrect guesses remaining: " + remainingLetters;
    }
    else if (array.indexOf(element) !== -1){        
        // Finds right guesses and loops them into answerArray
        for (var j = 0; j < word.length; j++) {
            if (word[j] === element) {
        // display correct letter in answer
                answerArray[j] = element;
            }
            answerArrayText.textContent = answerArray.join(" ");
        }
    };       
};

// Function to end round, adds to wins or losses
function roundOver(){                               
    if (answerArray.toString() == wordLetters.toString()) {
        wins++;
        alert("England win! The correct word was " + word);
        winsText.textContent = "Wins: " + wins;
        startRound();
    }
    else if (remainingLetters == 0) {
        losses++;
        alert("England lose! Sorry, the correct word was " + word);
        lossesText.textContent = "Losses: " + losses;
        startRound();
    }
};

// **** Main Game ****
    
document.onkeyup = function(event) {            
    var guess = event.key.toLowerCase();
    getStartedText.textContent = " ";
    checkGuess(wordLetters, guess);
    roundOver();
};
getRandomWord();
makeAnswerArray();