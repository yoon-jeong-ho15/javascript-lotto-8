import { LOTTO_PRICE } from "../constant.js";
import {
  checkAboveMinimum,
  checkBelowMaximum,
  checkDivisible,
} from "../utils/validate.js";

class Amount {
  #amount;
  #lottoCount;

  constructor(amount) {
    this.#validate(amount);
    this.#validateCount(amount);
    this.#amount = amount;
    this.#lottoCount = this.#amount / LOTTO_PRICE;
  }

  #validate(amount) {
    checkAboveMinimum(amount);
    checkBelowMaximum(amount);
  }

  #validateCount(amount) {
    const count = amount / LOTTO_PRICE;
    checkDivisible(amount);
    if (amount !== count * LOTTO_PRICE) {
      throw new Error(`[ERROR] 로또 갯수와 입력한 금액이 일치하지 않습니다.`);
    }
  }

  getAmount() {
    return this.#amount;
  }

  getCount() {
    return this.#lottoCount;
  }
}

export default Amount;
