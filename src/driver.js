const { MineField } = require('./minefield');

function main() {
  new MineField().startGame();
}

if (require.main === module) {
  main();
}
