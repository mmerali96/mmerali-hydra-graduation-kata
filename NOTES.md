# Notes

## Plans

# Pomodoro 1 540pm - 605pm

- ✅ Create User stories for first 4 UATs
- 🚧 US1
  - ✅ Create testcase for MineField object
  - ✅ Create MineField class
  - ⚠ Represent gameboard in MineField class as a 2d array
  - ⚠ Create a function to print current contents of gameboard

# Pomodoro 2 610pm - 635pm

- ✅ Move backlog from readme.md to backlog.md
- ✅ Gather examples from backlog
- ✅ refactor backlog based on examples

# Pomodoro 3 640PM - 705PM

- 🚧 US1
  - ✅ Represent gameboard in MineField class as a 2d array
  - ✅ Create a function to print current contents of gameboard
  - ✅ Create helper function that prints board to console using getGameboard

# Pomodoro 4 710PM - 735PM

- ✅ US1
  - ✅ Create the startGame function that prints the empty gameboard with the message `[Sandbox 3x3] Game created`
- 🚧 US2
  - ✅ Create internal gameboard that holds a map of where the bombs are
  - 🚧 Initialize the internal map of bombs randomly when gameStart is called

# Pomodoro 5: 1/2/2024 1115PM - 1140PM

- 🚧 US2
  - ✅ Create test for seed bombs which will add 3 bombs to the internal map
  - ✅ Initialize the internal map of bombs randomly when gameStart is called
  - 🚧 Create a test for generating random starting location
  - 🚧 Create a function for generating random starting location

# Pomodoro 6: 1/2/2024 1145PM - 1210PM

- 🚧 US2
  - ✅ Create a test for generating random starting location
  - ✅ Create a function for generating random starting location
  - ✅ TD1: Remove boilerplate code
  - ✅ Call getStartingLocation in game driver
  - ✅ Create a test for function handleStepOnSquare
  - ⚠ Create a function that accepts a index and handles moving on that board spaced

# Pomodoro 7: 1/2/2024 1215PM - 1240PM

- 🚧 US2
  - ✅ Create a function that accepts a index and handles moving on that board spaced
  - ✅ handleStepOnSquare should return true if the space is a bomb and false otherwise
  - 🚧 calculateNeighboringBombs function should look at all the neighbors of a square and return the number that are bombs
    - ✅ define calculateNeighboringBombs
    - 🚧 calculateNeighboringBombs should take in 2 indices
    - 🚧 define directions that is a list offsets that can be added to indices to represent moving up, down, and diagonal
    - 🚧 calculateNeighboringBombs should return the number of bombs around a square
  - ⚠ handleStepOnSquare should mark the current square with the number of bombs around it if square is a clean square
- ✅ SONAR: fix security hotspot from sonarqube on math.random

# Pomodoro 8: 1/2/2024 1245PM - 110PM

- 🚧 US2
  - ✅ calculateNeighboringBombs function should look at all the neighbors of a square and return the number that are bombs
    - ✅ calculateNeighboringBombs should take in 2 indices
    - ✅ define directions that is a list offsets that can be added to indices to represent moving up, down, and diagonal
    - ✅ calculateNeighboringBombs should return the number of bombs around a square
  - ✅ handleStepOnSquare should mark the current square with the number of bombs around it if square is a clean square
  - ✅ TD5: Seed Bombs is hardcoded. Refactor it to be random but also take in a seed value to get a deterministic gameboard

# Pomodoro 9: 1/3/2023 345PM - 410PM

- ✅ US2
  - ✅ Create test that seeds all squares as bombs and checks for boom msg
  - ✅ On game start, bot will select a bomb square and the game will output "BOOM! - Game Over."

# Pomodoro 10: 1/3/2023 415PM - 440PM

- ✅ Resolve failing test for printing gameboard starting message
- ⚠ US3
  - ⚠ Create test to check that square gets marked with appropriate number of squares.

# Pomodoro 11: 1/3/2023 445PM - 510PM

- ✅ US3
  - ✅ Create test to check that square gets marked with appropriate number of squares.
  - ✅ when bot steps on a clean square, show number of bombs around a square on gameboard and message
- ✅ Resolve code smell https://sonarcloud.io/project/issues?open=AYzRSwPh3Wisr06qlbg7&id=mmerali96_mmerali-hydra-graduation-kata
- 🚧 TD6: Refactor prefix for '3x3' message to be dry
- ⚠ US4
  - ⚠ Mark adjacent squares at random as bombs and indicate bombs that are not exploded as \*

# Pomodoro 12: 1/4/2023 255PM - 320PM

- ✅ TD6: Refactor prefix for '3x3' message to be dry
- 🚧 US4
  - 🚧 Create a function to mark adjacent squares at random as bombs and indicate bombs that are not exploded as \*. Call the function clearBombs
  - ⚠ Get the positions of valid adjacent squares
  - ⚠ Mark adjacent squares as cleared
  - ⚠ Calculate the neighboring squares bombs
  - ⚠ create function checkBoardIsDiscovered which should signal that the game can be ended
  - ⚠ After clearing all the bombs, find the next position to select

# Pomodoro 12: 1/4/2023 325PM - 350PM

- 🚧 US4
  - ✅ Create a function to mark adjacent squares at random as bombs and indicate bombs that are not exploded as \*. Call the function clearBombs
  - ✅ TD4: Refactor postionOffset in calculateNeighboringBombs to be a global constant
  - ✅ Create function get neighbors that gets the indices of valid adjacent squares
  - ✅ fix complexity of calculateNeighboringBombs
  - 🚧 fix complexity of getListOfNeighboringSquares by refactoring it
  - ⚠ Mark adjacent squares as cleared
  - ⚠ Calculate the neighboring squares bombs
  - ⚠ create function checkBoardIsDiscovered which should signal that the game can be ended
  - ⚠ After clearing all the bombs, find the next position to select

# Pomodoro 12: 1/4/2023 355PM - 420PM

- 🚧 US4
  - ✅ fix complexity of getListOfNeighboringSquares by refactoring it
  - ✅ Mark adjacent squares as cleared in game driver
  - ✅ create function checkBoardIsDiscovered which should signal that the game can be ended
  - ⚠ After clearing all the bombs, find the next position to select
  - clearSquare function should print a message saying Square flagged as bomb after clearing it

# Pomodoro 13: 1/5/2023 1040AM - 1105AM

- 🚧 US4

  - 🚧 After clearing all the bombs, find the next position to select
  - clearSquare function should print a message saying Square flagged as bomb after clearing it

  # Pomodoro 14: 1/5/2023 1110AM - 1135AM

- 🚧 US4

  - ✅ After clearing all the bombs, find the next position to select
    - ✅ build a list of all empty squares and return one at random
    - ✅ refactor selectNextPosition to reduce complexity
  - ✅ clearSquare function should print a message saying Square flagged as bomb after clearing it
  - ⚠ Print victory message "the land is cleared! GOOD JOB!" if all squares are cleared

  # Pomodoro 15: 1/5/2023 1140AM - 1205AM

- ✅ TD7: add validation to seedBombs function
- ✅ TD8: refactor getting starting location and select next position to use a common function for generating random index
- 🚧 US4
  - ⚠ Print victory message "the land is cleared! GOOD JOB!" if all squares are cleared

## Legend

- ⚠ TODO
- 🚧 IN PROGRESS
- ✅ DONE
