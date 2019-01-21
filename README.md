Intermission Work: http://backend.turing.io/module4/intermission_work/intermission_work

Assignment: http://backend.turing.io/module4/intermission_work/number_guesser

**Goals:**
* Build a game where the user guesses a number between 1 and 100 or can enter their own range.
* The user must receive instructional feedback about the accuracy of their guess.
* If the user wins a round, the range is expanded and the user is informed.
* Annotate every line of code, per assignment spec, for review by teachers.

**Technology**

This is a JavaScript & Node.js application, deployed on GitHub Pages: https://kate-v2.github.io/number_guesser/
* There are no tests
* There is no CSS yet
* HTML is structured to accommodate spec CSS.
* `node_modules/` includes files associated with debugging tool: `pryjs`.
* `spec/` includes specification images associated with the original Frontend program assignment

**Interaction**

The user kicks off the Number Guessing Game with a default range of 1-100. Should the user decide, they may enter a new range. If the user wins a level, the forms are cleared and the range is expanded. With each guess entry, the user receives feedback about the validity of the guess value and accuracy of the value. If the user wins, the forms are cleared and the range is expanded - as is indicated in the feedback and via the placeholder values in the min, max and guess fields. 

The user has buttons to submit a guess (custom min/max does not have to be submitted), clear a guess (does not clear min/max), or reset the entire game.



**Future**

* If a user enters an invalid value type in the min/max fields, they're not currently aware of what the system does. 

Currently, the value used for that part of the range is the default value, either min: 1 or max: 100, even if the user was previously using a valid custom range, that limit still reverts to the default. 

The user should be alerted of the error, and that form field should get cleared and ready to receive a correct value (and should also hold the placeholder of it's current value). Should the value maintain what it was last or still revert to the default upon alert?


* There is currently no validation that the max is greater than and not equal to the min. If infact the user does enter these incorrectly, the game will break. The system may still pick a number answer, but the user is unable to enter any number - all numbers are invalid and an alert appears.








