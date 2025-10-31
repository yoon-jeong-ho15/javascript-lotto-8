import { Console } from "@woowacourse/mission-utils";
import { clearInput, convertToNumber } from "./utils/parse.js";
import Amount from "./class/Amount.js";
import {
  checkIfDuplicatedNumbers,
  checkIfForbidden,
  checkIfHasNonNumberic,
  checkNumberRange,
  checkLength,
} from "./utils/validate.js";

export const handleAmountInput = async () => {
  try {
    const input = clearInput(
      "amount",
      await Console.readLineAsync("구입 금액을 입력해 주세요.\n")
    );
    checkIfForbidden(input);
    const amountNumber = convertToNumber(input);
    const amount = new Amount(amountNumber);
    printAmountAndCount(amount);
    return amount;
  } catch (error) {
    Console.print(error.message);
    return await handleAmountInput();
  }
};

const printAmountAndCount = (amount) => {
  Console.print(
    `${amount.getCount()}장을 구매하셨습니다.(${amount.getAmount()}원)`
  );
};

export const printLottos = (lottos) => {
  lottos.forEach((lotto) => Console.print(`${lotto}`));
};

export const handleNumberInput = async () => {
  try {
    const input = clearInput(
      "number",
      await Console.readLineAsync("당첨 번호를 입력해 주세요.\n")
    );
    checkIfHasNonNumberic(input);
    const numbers = input.split(",").map((number) => {
      checkNumberRange(Number(number));
      return Number(number);
    });
    checkIfDuplicatedNumbers(numbers);
    checkLength(numbers);
    return numbers;
  } catch (error) {
    Console.print(error.message);
    return await handleNumberInput();
  }
};
