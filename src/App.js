import {
  handleAmountInput,
  printLottos,
  handleNumberInput,
  handleBonusInput,
} from "./console.js";
import { generateLottos } from "./utils/generate.js";

class App {
  async run() {
    const amount = await handleAmountInput();
    const lottos = generateLottos(amount.getCount());
    printLottos(lottos);
    const winningNumbers = await handleNumberInput();
    const bonusNumber = await handleBonusInput(winningNumbers);
  }
}

export default App;
