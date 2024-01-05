## Backlog

- ✅ US1: When the game starts, the user will see a 3x3 game board created with a message saying that the game was created
- ✅ UAT1:
  +-+-+-+
  | | | |
  +-+-+-+
  | | | |
  +-+-+-+
  | | | |
  +-+-+-+
  [Sandbox 3x3] Game created

- ✅ US2: The game will choose a square at random to start. If the gameboard position has a bomb, the user will see a message saying they stepped on a bomb and the game is over. A bomb that exploded is indicated with a `X`

  - ✅ UAT2.1:

  ````text
    +-+-+-+
    | | | |
    +-+-+-+
    | |X| |
    +-+-+-+
    | | | |
    +-+-+-+
  [Sandbox 3x3] BOOM! – Game Over.
  ```
  - ✅ UAT2.2:

  ```text
    +-+-+-+
    | |X| |
    +-+-+-+
    | | | |
    +-+-+-+
    | | | |
    +-+-+-+
  [Sandbox 3x3] BOOM! – Game Over.
  ````

  - ✅ UAT2.2:

  ```text
    +-+-+-+
    | | | |
    +-+-+-+
    | | | |
    +-+-+-+
    |X| | |
    +-+-+-+
  [Sandbox 3x3] BOOM! – Game Over.
  ```

  - ✅ UAT2.3:

  ```text
    +-+-+-+
    | | |X|
    +-+-+-+
    | | | |
    +-+-+-+
    | | | |
    +-+-+-+
  [Sandbox 3x3] BOOM! – Game Over.
  ```

- ✅ US3: The game will choose a square at random to start. If the gameboard position does not have a bomb, the gameboard will indicate the number of bombs around the user with that number in the gameboard slot and a message below the gameboard. Then, the bot will clear each adjacent square around the starting position

  - ✅ UAT-3.1
    +-+-+-+
    | | | |
    +-+-+-+
    | | | |
    +-+-+-+
    |3| | |
    +-+-+-+
    [Sandbox 3x3] 3 bombs around your square.
    +-+-+-+
    | | | |
    +-+-+-+
    |\*| | |
    +-+-+-+
    |3| | |
    +-+-+-+
    [Sandbox 3x3] Square flagged as bomb.
    +-+-+-+
    | | | |
    +-+-+-+
    |\*| | |
    +-+-+-+
    |3|\*| |
    +-+-+-+
    [Sandbox 3x3] Square flagged as bomb.
    +-+-+-+
    | | | |
    +-+-+-+
    |\*|\*| |
    +-+-+-+
    |3|\*| |
    +-+-+-+
    [Sandbox 3x3] Square flagged as bomb.

  - ✅ UAT-3.2
    +-+-+-+
    | | | |
    +-+-+-+
    | |8| |
    +-+-+-+
    | | | |
    +-+-+-+
    [Sandbox 3x3] 8 bombs around your square.
  - ✅ UAT-3.3
    +-+-+-+
    |1| | |
    +-+-+-+
    | | | |
    +-+-+-+
    | | | |
    +-+-+-+
    [Sandbox 3x3] 1 bombs around your square.
  - ✅ UAT-3.4
    +-+-+-+
    | | | |
    +-+-+-+
    | | |5|
    +-+-+-+
    | | | |
    +-+-+-+
    [Sandbox 3x3] 5 bombs around your square.

- ✅ US4: If the gameboard position does not have a bomb and it is marked with a number, the bot will adjacent slots with "mark as bomb" that number of squares at random. A bomb that has not exploded is indicated with a `*`.
- UAT4:
  +-+-+-+
  | | | |
  +-+-+-+
  |_|_| |
  +-+-+-+
  |3|\*| |
  +-+-+-+
  [Sandbox 3x3] Square flagged as bomb.

```text
  +-+-+-+
  |2|*|3|
  +-+-+-+
  |2|*|*|
  +-+-+-+
  |1|2|2|
  +-+-+-+
[Sandbox 3x3] the land is cleared! GOOD JOB!
```
