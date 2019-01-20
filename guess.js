
// --- Setup ---

var min = setMin()
var max = setMax()
var answer = pickNumber()
var previous = []
var guess

function pickNumber() {
  let range = max - min
  let num = Math.floor(Math.random() * range) + min
  return num
}

function disallowClear(bool = false) {
  toggleDisabled('clear', bool)
}

function toggleDisabled(id, bool) {
  document.getElementById(id).disabled = bool
}

// --- Interaction ---

function getValue(id) {
   element = document.getElementById(id)
   return element.value
}

function submitGuess() {
  guess = document.getElementById('guess').value
  var invalid = ( isNaN(guess) || guess < min || guess > max )
  invalid ? alert("Invalid Number") : displayGuess()
}

function setMin() {
  let low = getValue('min')
  min = (low ? low : 1 )
}

function setMax() {
  let high = getValue('max')
  max = (high ? high : 100 )
}


// --- Displaying Last Guess ---

function displayGuess() {
  toggleHidden('previousGuess' , false)
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
  clearGuessField()
  resetRange()
  clearGuesses()
  clearGuess()
  newNumber()
}

function resetRange(){
  clearForm('min')
  clearForm('max')
  setMin()
  setMax()
}

function clearDisplayGuess() {
  toggleHidden('previousGuess' , true)
  freshElement('lastGuess')
  freshElement('feedback')
}

function clearGuessField() {
  clearForm('guess')
  disallowClear(true)
}

function clearForm(id) {
  document.getElementById(id).value = '';
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
