import { Console } from "@woowacourse/mission-utils";
import Amount from "./class/Amount.js";

export async function getAmount() {
  try {
    const amountInput = await Console.readLineAsync(
      "구입 금액을 입력해 주세요.\n"
    );
    return new Amount(amountInput);
  } catch (error) {
    Console.print(error.message);
    return await getAmount();
  }
}
