import { Console } from "@woowacourse/mission-utils";
import Amount from "./class/Amount.js";

export const handleAmountInput = async () => {
  try {
    const amount = new Amount(
      await Console.readLineAsync("구입 금액을 입력해 주세요.\n")
    );
    printAmountAndCount(amount);
    return amount;
  } catch (error) {
    Console.print(error.message);
    return await handleAmountInput();
  }
};

const printAmountAndCount = (amount) => {
  Console.print(
    `${amount.getCount}장을 구매하셨습니다.(${amount.getAmount}원)`
  );
};

export const printLottos = (lottos) => {
  lottos.forEach((lotto) => Console.print(`${lotto}`));
};

export async function numberInput() {}
