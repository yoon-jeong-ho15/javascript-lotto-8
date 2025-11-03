import { validateNumbers } from "../utils/validate.js";
import {
  countMatchingNumbers,
  hasBonusNumber,
  findRank,
} from "../utils/match.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    validateNumbers(numbers);
  }

  toString() {
    return `[${this.#numbers.join(", ")}]`;
  }

  getRank(winningNumbers, bonusNumber) {
    const matchCount = countMatchingNumbers(this.#numbers, winningNumbers);
    const hasBonus = hasBonusNumber(this.#numbers, bonusNumber);
    const rank = findRank(matchCount, hasBonus);

    return rank;
  }
}

export default Lotto;
