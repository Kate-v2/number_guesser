// pry = require('pryjs')
// eval(pry.it)

var min = 1
var max = 3
var answer = pickNumber()
var previous = []
var guess

function pickNumber() {
  // range = min + max
  range = max - min
  // let number = Math.floor(Math.random() * max) + 1
  // let number = Math.floor(Math.random() * max) + min
  let number = Math.floor(Math.random() * range) + min
  return number
}

function submitGuess() {
  guess = document.getElementById('guess').value
  var text
  var invalid = ( isNaN(guess) || guess < min || guess > max )
  text = invalid ? "Invalid Number" : validAnswer()
  alert(text)
}

function validAnswer() {
  previous.push(guess)
  return compareWithAnswer()
}

function compareWithAnswer() {
  return (guess == answer) ? 'BOOM' : answerFeedback()
}

function answerFeedback() {
  return (guess > answer) ? "Too High" : "Too Low"
}


function restartGame() {
  clearForm()
  clearGuesses()
  clearGuess()
  newNumber()
}

function clearForm() {
  document.getElementById('guess').value = '';
}

function clearGuesses() {
  previous = []
}

function clearGuess() {
  guess = null
}

function newNumber() {
  answer = pickNumber()
}
