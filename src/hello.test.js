const { hello, MineField } = require('./hello');

describe('hello', () => {
  it('should return hello', () => {
    expect(hello()).toBe('hello');
  });
});

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
});
