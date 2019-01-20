
// --- Setup ---

var min; setMin();
var max; setMax();
var answer = pickNumber()
var previous = []
var guess
initialPlaceHolders()

function pickNumber() {
  let range = (max - min)
  // let num = Math.floor(Math.random() * range) + parseInt(min)
  let num = Math.floor(Math.random() * range) + min
  return num
}

function disallowClear(bool = false) {
  toggleDisabled('clear', bool)
}

function toggleDisabled(id, bool) {
  document.getElementById(id).disabled = bool
}

function initialPlaceHolders() {
  guessPlaceHolder()
  minPlaceHolder()
  maxPlaceHolder()
}

function guessPlaceHolder() {
  let text = 'Enter a guess (' + min + '-' + max + ')'
  changePlaceHolder('guess', text)
}

function minPlaceHolder() {
  let text = 'Min: ' + min
  changePlaceHolder('min', text)
}

function maxPlaceHolder() {
  let text = 'Max: ' + max
  changePlaceHolder('max', text)
}

function changePlaceHolder(id, text) {
  document.getElementById(id).placeholder = text
}


// --- Interaction ---

function getValue(id) {
   element = document.getElementById(id)
   let val = element.value
   return parseInt(val)
}

function submitGuess() {
  guess = document.getElementById('guess').value
  var invalid = ( isNaN(guess) || guess < min || guess > max )
  invalid ? alert("Invalid Number") : displayGuess()
}

function setMin() {
  let low = getValue('min')
  min = (low ? low : 1 )
  newNumber()
}

function setMax() {
  let high = getValue('max')
  max = (high ? high : 100 )
  newNumber()
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
  // return (guess == answer) ? 'BOOM' : answerFeedback()
  return (guess == answer) ? expandRange() : answerFeedback()
}

function answerFeedback() {
  return (guess > answer) ? "Too High" : "Too Low"
}

function expandRange() {
  min = min - 10
  max = max + 10
  let text = 'BOOM! \n The answer was indeed '+ guess + '.\n Next Level - Range Expanded'
  nextLevel()
  return text
}

function nextLevel() {
  clearForm('min')
  clearForm('max')
  clearGuess()
  clearGuessField()
  newNumber()
  initialPlaceHolders()
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
  initialPlaceHolders()
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
