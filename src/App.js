import {
  handleAmountInput,
  printLottos,
  handleNumberInput,
  handleBonusInput,
  printResult,
} from "./console.js";
import { generateLottos } from "./utils/generate.js";
import { getMatchResult } from "./utils/match.js";

class App {
  async run() {
    const amount = await handleAmountInput();
    const lottos = generateLottos(amount.getCount());
    printLottos(lottos);
    const winningNumbers = await handleNumberInput();
    const bonusNumber = await handleBonusInput(winningNumbers);
    const result = getMatchResult(
      lottos,
      winningNumbers,
      bonusNumber,
      amount.getAmount()
    );
    printResult(result);
  }
}

export default App;
