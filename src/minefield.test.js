const { MineField } = require('./minefield');

describe('MineField game', () => {
  it('should be defined', () => {
    expect(MineField).toBeDefined();
  });
  it('should contain gameboard array which initially a size of 3x3 and empty', () => {
    expect(new MineField().gameboard).toEqual([...Array(3)].map(() => Array(3).fill(' ')));
  });
  it('should have a function that returns the gameboard as a user readable string', () => {
    expect(new MineField().getGameboard()).toBe('+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
  });
  it('should have a helper function that prints the gameboard to the console', () => {
    const logSpy = jest.spyOn(console, 'log');
    expect(new MineField().printGameboard).toBeDefined();
    new MineField().printGameboard();
    expect(logSpy).toHaveBeenCalled();

    logSpy.mockRestore();
  });

  describe('function getStartingLocation', () => {
    it('should be defined', () => {
      expect(new MineField().getStartingLocation).toBeDefined();
    });

    it('should return the starting position as an array of 2 indices', () => {
      expect(new MineField().getStartingLocation()).toEqual(expect.arrayContaining([expect.any(Number), expect.any(Number)]));
    });

    it('should use the random function to generate the starting position', () => {
      const mockMathRandom = jest.spyOn(Math, 'random');
      new MineField().getStartingLocation();
      expect(mockMathRandom).toHaveBeenCalled();
      mockMathRandom.mockRestore();
    });
  });

  describe('function handleStepOnSquare', () => {
    it('should be defined', () => {
      expect(new MineField().handleStepOnSquare).toBeDefined();
    });

    it('should mark square as visible on the gameboard', () => {
      const minefield = new MineField();
      minefield.seedBombs();
      minefield.handleStepOnSquare(0, 0);
      expect(minefield.gameboard[0][0]).toBe('X');
    });
  });

  describe('should have a function called startGame', () => {
    it('should be defined', () => {
      expect(new MineField().startGame).toBeDefined();
    });

    it('should print the game board and starting message', () => {
      const logSpy = jest.spyOn(console, 'log');
      new MineField().startGame();
      expect(logSpy).toHaveBeenCalledTimes(2);
      expect(logSpy).toHaveBeenNthCalledWith(1, '+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+');
      expect(logSpy).toHaveBeenNthCalledWith(2, '[Sandbox 3x3] Game created');
      logSpy.mockRestore();
    });
  });

  describe('should hold an internal state of where bombs are on the gameboard', () => {
    it('should have 2d array bombBoard defined', () => {
      expect(new MineField().bombBoard).toBeDefined();
    });
    it('should be initialized to a 3x3 array', () => {
      expect(new MineField().bombBoard).toEqual([...Array(3)].map(() => Array(3).fill(' ')));
    });

    it('should have function seedBombs that adds bombs to the bomb board', () => {
      expect(new MineField().seedBombs).toBeDefined();
    });
    it('should randomly define squares with bombs in internal map', () => {
      let field = new MineField();
      field.seedBombs();
      expect(field.bombBoard.flat().filter((item) => item === 'X').length).toBe(3);
    });
  });
});
