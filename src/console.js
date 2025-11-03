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
  Console.print(`${amount.getCount()}개를 구매했습니다.`);
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

export const handleBonusInput = async (winningNumbers) => {
  try {
    const input = clearInput(
      "number",
      await Console.readLineAsync("보너스 번호를 입력해 주세요.\n")
    );
    checkIfHasNonNumberic(input);
    const num = Number(input);
    checkNumberRange(num);
    checkIfDuplicatedNumbers([...winningNumbers, num]);
    return num;
  } catch (error) {
    Console.print(error.message);
    return await handleBonusInput(winningNumbers);
  }
};

export const printResult = ({ ranks, ratio }) => {
  Console.print(`3개 일치 (5,000원) - ${ranks[5] || 0}개`);
  Console.print(`4개 일치 (50,000원) - ${ranks[4] || 0}개`);
  Console.print(`5개 일치 (1,500,000원) - ${ranks[3] || 0}개`);
  Console.print(
    `5개 일치, 보너스 볼 일치 (30,000,000원) - ${ranks[2] || 0}개`
  );
  Console.print(`6개 일치 (2,000,000,000원) - ${ranks[1] || 0}개`);
  Console.print(`총 수익률은 ${ratio}%입니다.`);
};
