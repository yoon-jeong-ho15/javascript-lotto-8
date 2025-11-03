import { clearInput, convertToNumber } from "../parse.js";
import {
  validateAmountInput,
  validateNumbers,
  validateBonusNumber,
} from "../validate.js";

export const handleAmountInput = async () => {
  try {
    const input = clearInput(
      "amount",
      await Console.readLineAsync("구입 금액을 입력해 주세요.\n")
    );

    validateAmountInput(input);
    const amount = convertToNumber(input);

    validateAmount(amount);
    const count = calculateCount(amount);

    return { amount, count };
  } catch (error) {
    Console.print(error.message);
    return await handleAmountInput();
  }
};

export const handleNumberInput = async () => {
  try {
    const input = clearInput(
      "number",
      await Console.readLineAsync("당첨 번호를 입력해 주세요.\n")
    );

    validateNumbersInput(input);
    const numbers = input.split(",").map(Number);

    validateNumbers(numbers);

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
    validateBonusNumberInput(input);
    const number = Number(input);

    validateBonusNumber(number, winningNumbers);

    return number;
  } catch (error) {
    Console.print(error.message);
    return await handleBonusInput(winningNumbers);
  }
};
