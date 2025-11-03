import { Random } from "@woowacourse/mission-utils";
import Lotto from "../class/Lotto.js";
import {
  MININUM_NUMBER,
  MAXIMUM_NUMBER,
  REQUIRED_NUMBERS_COUNT,
} from "../constant.js";

export const generateLottos = (count) => {
  const lottos = [];
  for (let i = 0; i < count; i++) {
    const numbers = pickNumbers();
    const lotto = createLotto(numbers);
    lottos.push(lotto);
  }
  return lottos;
};

export const createLotto = (numbers) => {
  try {
    const lotto = new Lotto(numbers);
    return lotto;
  } catch (error) {
    const numbers = pickNumbers();
    return createLotto(numbers);
  }
};

const pickNumbers = () => {
  const numbers = Random.pickUniqueNumbersInRange(
    MININUM_NUMBER,
    MAXIMUM_NUMBER,
    REQUIRED_NUMBERS_COUNT
  );
  return numbers.sort((a, b) => a - b);
};
