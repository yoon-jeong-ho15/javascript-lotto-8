import {
  checkIfDuplicatedNumbers,
  checkLength,
  validateNumbers,
} from "../utils/validate.js";

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

  matchNumbers(winningNumbers) {
    const matchCount = winningNumbers.filter((number) =>
      this.#numbers.includes(number)
    ).length;
    return matchCount;
  }

  hasBonus(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;
