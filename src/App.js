import {
  handleAmountInput,
  handleNumberInput,
  handleBonusInput,
} from "./utils/console/input.js";
import {
  printLottos,
  printLottoCount,
  printResult,
} from "./utils/console/output.js";
import LottoGame from "./domain/LottoGame.js";

class App {
  async run() {
    const { amount, count } = await handleAmountInput();
    printLottoCount(count);

    const game = new LottoGame(count);
    printLottos(game.getLottos());

    const winningNumbers = await handleNumberInput();
    const bonusNumber = await handleBonusInput(winningNumbers);
    game.setWinningNumbers(winningNumbers, bonusNumber);

    const result = game.getResult();
    printResult(result);
  }
}

export default App;
