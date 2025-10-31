import { handleAmountInput, printLottos } from "./console.js";
import { generateLottos } from "./utils/generate.js";

class App {
  async run() {
    const amount = await handleAmountInput();
    const lottos = generateLottos(amount.getCount());
    printLottos(lottos);
  }
}

export default App;
