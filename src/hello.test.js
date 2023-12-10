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
    expect(new MineField().gameboard).toEqual([...Array(6)].map(() => Array(3).fill(' ')));
  });
});
