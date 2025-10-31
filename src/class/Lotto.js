import { REQUIRED_NUMBERS_COUNT } from "../constant.js";
import { checkIfDuplicatedNumbers } from "../utils/validate.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== REQUIRED_NUMBERS_COUNT) {
      throw new Error(
        `[ERROR] 로또 번호는 ${REQUIRED_NUMBERS_COUNT}개여야 합니다.`
      );
    }
    checkIfDuplicatedNumbers(numbers);
  }

  toString() {
    return `[${this.#numbers.join(", ")}]`;
  }
}

export default Lotto;
