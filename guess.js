
// --- Setup ---

// These are global variables, capable of change (via var)
// I want these accessible from all methods
// I want them to be initialized when this file loaded, before any methods are called
// Min/Max must be set before pickNumber() is called
var min; setMin();
var max; setMax();
var answer = pickNumber()
// previous stores all the previous & valid guesses
// we currently only use the most recent guess,
// however, should we like to display a list of recent
// guesses in the future, we have that data stored.
// TO DO - We're not currently resetting this when the answer gets changed with various triggers
var previous = []
var guess
// This sets up dynamic placeholders in the fields for instructional user input
initialPlaceHolders()

// This picks a rendom number
function pickNumber() {
  // let makes the variable scoped to only this method
  let range = (max - min)
  // Math.random creates an number from 0-1
  // Math.floor down-estimates the fractional number
  // multiplying by the range creates a number within the range (inclusing)
  // adding the min creates an offset so that value is not always 0-max
  let num = Math.floor(Math.random() * range) + min
  // I wanted this to be reusable instead of affecting answer directly
  return num
}

function disallowClear(bool = false) {
  // calls a function which finds an element by it's id,
  // and toggles the attribute: disabled on an off depending on the boolean value: bool
  toggleDisabled('clear', bool)
}

function toggleDisabled(id, bool) {
  // Finds an element by it's id,
  // toggles it's attribute: disabled on and off
  document.getElementById(id).disabled = bool
}

function initialPlaceHolders() {
  // sets up dynamic placeholders for input fields
  // based on the current max & min values
  guessPlaceHolder()
  minPlaceHolder()
  maxPlaceHolder()
}

function guessPlaceHolder() {
  // I couldn't get template literal syntax to work ${}
  // but this creates a string for the guess input field
  // that describes the value the user should enter
  let text = 'Enter a guess (' + min + '-' + max + ')'
  changePlaceHolder('guess', text)
}

function minPlaceHolder() {
  // I couldn't get template literal syntax to work ${}
  // but this creates a string for the min input field
  // that describes the current minimum for the game
  let text = 'Min: ' + min
  changePlaceHolder('min', text)
}

function maxPlaceHolder() {
  // I couldn't get template literal syntax to work ${}
  // but this creates a string for the max input field
  // that describes the current maximum for the game
  let text = 'Max: ' + max
  changePlaceHolder('max', text)
}

function changePlaceHolder(id, text) {
  // This is a reusable function that
  // allows an element to be found by id
  // and changes the placeholder attribute.
  // In retrospect, I have nothing validating that
  // this element can have a placeholder attribute (is input field).
  document.getElementById(id).placeholder = text
}


// --- Interaction ---

function getValue(id) {
  // This gets a value from an element in the page, found by it's id
  // (perhaps mentioning Int or Number somewhere
  // in the function name would improve reability
  // and intention of this method as it returns a parsed/converted int
  // not just the value of the input)
   element = document.getElementById(id)
   let val = element.value
   // Inputs come in as strings, and here it turing it into an integer
   return parseInt(val)
}

function submitGuess() {
  // finds the value from the guess field
  // guess = document.getElementById('guess').value
  guess = getValue('guess')
  // confirms that the guess is valid
  var invalid = ( isNaN(guess) || guess < min || guess > max )
  // if the guess is not valid, the user is alerted
  // otherwise, the guess can be counted and feedback is returned
  invalid ? alert("Invalid Number") : displayGuess()
}

function setMin() {
  // sets the range-min
  let low = getValue('min')
  // if there's an entry in the field, the min is custom
  // otherwise, the min defaults to 1
  min = (low ? low : 1 )
  // when the range changes, a new answer must be selected
  newNumber()
}

function setMax() {
  // sets the range-max
  let high = getValue('max')
  // if there's an entry in the field, the max is custom
  // otherwise, the max defaults to 100
  max = (high ? high : 100 )
  // when the range changes, a new answer must be selected
  newNumber()
}


// --- Displaying Last Guess ---

function displayGuess() {
  // only when there's a valid guess will this method be called
  // and only then can a previous guess be displayed
  // with feedback on next steps
  toggleHidden('previousGuess' , false)
  displayFeedback()
  displayLast()
}

function toggleHidden(id , bool) {
  // changes an element's attribute: hidden based on the boolean value
  document.getElementById(id).hidden = bool
}

function displayFeedback() {
  // clears the content of an element found by id so that
  // changes are not concatenated to that element
  let element = freshElement('feedback')
  // gets one of 3 valid strings for guess-feedback
  // also does some other functions, but the return value is a string
  let text = validAnswer()
  // displays the text in the appropriate element
  addText(element, text)
}

function displayLast() {
  // clears the content of an element found by id so that
  // changes are not concatenated to that element
  let element = freshElement('lastGuess')
  // gets the last guess from the guess storage array
  let val = previous[(previous.length - 1)]
  // displays the text in the appropriate element
  addText(element, val)
}

function addText(element, text) {
  // creates text to be inserted into an element
  let t = document.createTextNode(text)
  element.appendChild(t)
}


// --- Comparing Guess ---

function validAnswer() {
  // adds a valid guess to the guess array (function is only called with valid guess)
  previous.push(guess)
  // finds the feedback string
  return compareWithAnswer()
}

function compareWithAnswer() {
  // gets a feedback string and may move player to next-level-state
  return (guess == answer) ? expandRange() : answerFeedback()
}

function answerFeedback() {
  // gets a feedback string if the guess is incorrect
  return (guess > answer) ? "Too High" : "Too Low"
}

function expandRange() {
  // when a player guesses correctly, the range expands
  min = min - 10
  max = max + 10
  // text is created before the guess values is reset
  let text = 'BOOM! \n The answer was indeed '+ guess + '.\n Next Level - Range Expanded'
  // game attributes are reset with new range
  nextLevel()
  // text is printed and instructs the user how to play next level
  return text
}

function nextLevel() {
  // clears the range inputs
  clearForm('min')
  clearForm('max')
  // clears the stored guess value (that won the last round)
  clearGuess()
  // clears the guess field in the game
  clearGuessField()
  // picks a new answer (within new range)
  newNumber()
  // dynamic placeholders display new/current game 'rules'
  initialPlaceHolders()
}


// --- Clearing ---

function freshElement(id) {
  // clears the html of an element so that changes are not concatenated
  let element = document.getElementById(id)
  element.innerHTML = ''
  // returns the element so that
  // this step is not repeated when changing that element in other function
  return element
}

// linked to the reset button
function restartGame() {
  // clears the last guess/feedback from view
  clearDisplayGuess()
  // clears the guess input field
  clearGuessField()
  // resets the range (1-100)
  // next-level range is not maintained
  resetRange()
  // clears the guess storage
  clearGuesses()
  // clears the current guess
  clearGuess()
  // picks a new answer (both because new range & new game)
  newNumber()
  // dynamic placeholders indicate current 'rules'
  initialPlaceHolders()
}

function resetRange(){
  // clears the range input fields
  clearForm('min')
  clearForm('max')
  // because the fields are empty, the ranges
  // are restored to defaults of 1-100
  setMin()
  setMax()
}

function clearDisplayGuess() {
  // this information is only displayed when there's a guess to describe
  toggleHidden('previousGuess' , true)
  // restores element to blank state
  freshElement('lastGuess')
  // restores element to blank state
  freshElement('feedback')
}

function clearGuessField() {
  // clears the guess input field
  clearForm('guess')
  // disallows the clear button from being functional until there's a value to clear
  disallowClear(true)
}

function clearForm(id) {
  // resets an input field to blank
  document.getElementById(id).value = '';
}

function clearGuesses() {
  // resets guess-storage to an array
  previous = [null]
}

function clearGuess() {
  // resets guess to a non-useable value
  guess = null
}

function newNumber() {
  // sets answer to a new value
  answer = pickNumber()
}
