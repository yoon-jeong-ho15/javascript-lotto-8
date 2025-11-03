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
import { generateLottoNumbers } from "./utils/generate.js";
import { getMatchResult } from "./utils/match.js";
import Lotto from "./class/Lotto.js";

class App {
  async run() {
    const { amount, count } = await handleAmountInput();
    printLottoCount(count);

    const lottoNumbers = generateLottoNumbers(count);
    const lottos = lottoNumbers.map((numbers) => new Lotto(numbers));
    printLottos(lottos);

    const winningNumbers = await handleNumberInput();
    const bonusNumber = await handleBonusInput(winningNumbers);

    const result = getMatchResult(lottos, winningNumbers, bonusNumber, amount);
    printResult(result);
  }
}

export default App;
