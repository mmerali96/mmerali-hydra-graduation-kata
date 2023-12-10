# Mine Sweeper Kata

## Game Rules:

You are presented with a board of squares. Some squares contain mines (bombs), others don't. If you step on a square containing a bomb, you lose. If you manage to clear all the squares (without clicking on any bombs) you win.
Clearing a square which doesn't have a bomb reveals the number of neighbouring squares containing bombs. If you guess a square contains a bomb mark it with a flag.
A squares "neighbours" are the squares adjacent above, below, left, right, and all 4 diagonals. Squares on the sides of the board or in a corner have fewer neighbors. The board does not wrap around the edges. If you clear a square with 0 neighboring bombs, all its neighbors will automatically open; recursively.
The first square you open could be a bomb.
You don't have to mark all the bombs to win; you just need to open all non-bomb squares.

## Legend

- ⚠ TODO
- 🚧 IN PROGRESS
- ✅ DONE

## Examples

### Example 1: Empty gameboard

```text
  +-+-+-+
  | | | |
  +-+-+-+
  | | | |
  +-+-+-+
  | | | |
  +-+-+-+
  [Sandbox 3x3] Game created
```

### Example 2: Stepped on bomb

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

### Example 3: Winning scenario

```text
  +-+-+-+
  | | | |
  +-+-+-+
  | | | |
  +-+-+-+
  | | | |
  +-+-+-+
  [Sandbox 3x3] Game created
```

```text
  +-+-+-+
  | | |3|
  +-+-+-+
  | | | |
  +-+-+-+
  | | | |
  +-+-+-+
[Sandbox 3x3] 3 bombs around your square.
```

```text
  +-+-+-+
  |2|*|3|
  +-+-+-+
  | | | |
  +-+-+-+
  | | | |
  +-+-+-+
[Sandbox 3x3] Square flagged as bomb.
```

```text
  +-+-+-+
  |2|*|3|
  +-+-+-+
  |2|*| |
  +-+-+-+
  |1|2| |
  +-+-+-+
[Sandbox 3x3] Square flagged as bomb.
```

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

### Example 3: Winning scenario from different starting position

```text
  +-+-+-+
  | | | |
  +-+-+-+
  | | | |
  +-+-+-+
  | | | |
  +-+-+-+
  [Sandbox 3x3] Game created
```

```text
  +-+-+-+
  | | | |
  +-+-+-+
  |4| | |
  +-+-+-+
  | | | |
  +-+-+-+
[Sandbox 3x3] 4 bombs around your square.
```

```text
  +-+-+-+
  | | |2|
  +-+-+-+
  |4|*|1|
  +-+-+-+
  | | |1|
  +-+-+-+
[Sandbox 3x3] Square flagged as bomb.
```

```text
  +-+-+-+
  |*| |2|
  +-+-+-+
  |4|*|1|
  +-+-+-+
  | | |1|
  +-+-+-+
[Sandbox 3x3] Square flagged as bomb.
```

```text
  +-+-+-+
  |*|*|2|
  +-+-+-+
  |4|*|1|
  +-+-+-+
  | | |1|
  +-+-+-+
[Sandbox 3x3] Square flagged as bomb.
```

```text
  +-+-+-+
  |*|*|2|
  +-+-+-+
  |4|*|1|
  +-+-+-+
  |*|2|1|
  +-+-+-+
[Sandbox 3x3] the land is cleared! GOOD JOB!
```

## Example 4: Losing scenario

```text
  +-+-+-+
  | | | |
  +-+-+-+
  | | | |
  +-+-+-+
  | | | |
  +-+-+-+
  [Sandbox 3x3] Game created
```

```text
  +-+-+-+
  | | | |
  +-+-+-+
  | | | |
  +-+-+-+
  | | | |
  +-+-+-+
  [Sandbox 3x3] Game created
```

```text
  +-+-+-+
  | | | |
  +-+-+-+
  |2| | |
  +-+-+-+
  | | | |
  +-+-+-+
[Sandbox 3x3] 2 bombs around your square.
```

```text
  +-+-+-+
  |*|1| |
  +-+-+-+
  |2|1| |
  +-+-+-+
  | | | |
  +-+-+-+
[Sandbox 3x3] Square flagged as bomb.
```

```text
  +-+-+-+
  |*|1| |
  +-+-+-+
  |2|1| |
  +-+-+-+
  |X| | |
  +-+-+-+
[Sandbox 3x3] BOOM! – Game Over.
```

## Example 5: Clearing all the bombs

```text
  +-+-+-+
  | | | |
  +-+-+-+
  | | | |
  +-+-+-+
  | | | |
  +-+-+-+
  [Sandbox 3x3] Game created
```

- Step on a bomb on 0,1

```text
  +-+-+-+
  |_|_|_|
  +-+-+-+
  |1|1|_|
  +-+-+-+
  | | | |
  +-+-+-+
  [Sandbox 3x3] No bombs around your square
```

- Step on a bomb on 2,1

```text
  +-+-+-+
  |_|_|_|
  +-+-+-+
  |1|1|_|
  +-+-+-+
  | |1| |
  +-+-+-+
  [Sandbox 3x3] 1 bomb around your square
```

- Mark 2,0 as a bomb

```text
  +-+-+-+
  |_|_|_|
  +-+-+-+
  |1|1|_|
  +-+-+-+
  |*|1|_|
  +-+-+-+
[Sandbox 3x3] the land is cleared! GOOD JOB!
```
