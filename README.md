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
