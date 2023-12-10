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
});
