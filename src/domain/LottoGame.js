import Lotto from "./Lotto.js";
import { generateLottoNumbers } from "../utils/generate.js";
import { calculateTotalWinning, calculateRatio } from "../utils/calculate.js";

class LottoGame {
  #lottos;
  #winningNumbers;
  #bonusNumber;

  constructor(count) {
    const lottoNumbers = generateLottoNumbers(count);
    this.#lottos = lottoNumbers.map((numbers) => new Lotto(numbers));
  }

  getLottos() {
    return this.#lottos;
  }

  setWinningNumbers(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  getResult() {
    const ranks = this.#getRanks();
    const totalWinning = calculateTotalWinning(ranks);
    const ratio = calculateRatio(totalWinning, this.#lottos.length);

    return { ranks, ratio };
  }

  #getRanks() {
    const ranks = {};

    this.#lottos.forEach((lotto) => {
      const rank = lotto.getRank(this.#winningNumbers, this.#bonusNumber);
      if (rank) ranks[rank] = (ranks[rank] || 0) + 1;
    });

    return ranks;
  }
}

export default LottoGame;
