

// --- Setup ---

var min = 1
var max = 100
var answer = pickNumber()
var previous = []
var guess

function pickNumber() {
  range = max - min
  let num = Math.floor(Math.random() * range) + min
  return num
}


// --- Interaction ---

function submitGuess() {
  guess = document.getElementById('guess').value
  var invalid = ( isNaN(guess) || guess < min || guess > max )
  invalid ? alert("Invalid Number") : displayGuess()
}


// --- Displaying Last Guess ---

function displayGuess() {
  toggleHidden('guessTitle' , false)
  displayFeedback()
  displayLast()
}

function toggleHidden(id , bool) {
  document.getElementById(id).hidden = bool
}

function displayFeedback() {
  let element = freshElement('feedback')
  let text = validAnswer()
  addText(element, text)
}

function displayLast() {
  let element = freshElement('lastGuess')
  let val = previous[(previous.length - 1)]
  addText(element, val)
}

function addText(element, text) {
  let t = document.createTextNode(text)
  element.appendChild(t)
}


// --- Comparing Guess ---

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


// --- Clearing ---

function freshElement(id) {
  let element = document.getElementById(id)
  element.innerHTML = ''
  return element
}

function restartGame() {
  clearDisplayGuess()
  clearForm()
  clearGuesses()
  clearGuess()
  newNumber()
}

function clearDisplayGuess() {
  toggleHidden('guessTitle' , true)
  freshElement('lastGuess')
  freshElement('feedback')
}

function clearForm() {
  document.getElementById('guess').value = '';
}

function clearGuesses() {
  previous = [null]
}

function clearGuess() {
  guess = null
}

function newNumber() {
  answer = pickNumber()
}
