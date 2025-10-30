import {
  clearInput,
  checkIfForbidden,
  convertToNumber,
  checkAmountRange,
} from "../validate";

class Amount {
  #ammount;

  constructor(input) {
    this.#ammount = this.#validateAndParse(input);
  }

  #validateAndParse(input) {
    const cleaned = clearInput("amount", input);
    checkIfForbidden(cleaned);

    const ammount = convertToNumber(cleaned);
    checkAmountRange(ammount);

    return ammount;
  }

  getAmount() {
    return this.#ammount;
  }
}

export default Amount;
