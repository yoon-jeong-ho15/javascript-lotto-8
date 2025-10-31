import {
  handleAmountInput,
  printLottos,
  handleNumberInput,
} from "./console.js";
import { generateLottos } from "./utils/generate.js";

class App {
  async run() {
    const amount = await handleAmountInput();
    const lottos = generateLottos(amount.getCount());
    printLottos(lottos);
    const winningNumber = await handleNumberInput();
  }
}

export default App;
