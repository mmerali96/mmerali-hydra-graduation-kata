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

- ✅ US2
  - ✅ calculateNeighboringBombs function should look at all the neighbors of a square and return the number that are bombs
    - ✅ calculateNeighboringBombs should take in 2 indices
    - ✅ define directions that is a list offsets that can be added to indices to represent moving up, down, and diagonal
    - ✅ calculateNeighboringBombs should return the number of bombs around a square
  - ✅ handleStepOnSquare should mark the current square with the number of bombs around it if square is a clean square
  - ✅ TD5: Seed Bombs is hardcoded. Refactor it to be random but also take in a seed value to get a deterministic gameboard

## Legend

- ⚠ TODO
- 🚧 IN PROGRESS
- ✅ DONE
