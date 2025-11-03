import { Random } from "@woowacourse/mission-utils";
import {
  MININUM_NUMBER,
  MAXIMUM_NUMBER,
  REQUIRED_NUMBERS_COUNT,
} from "../constant/constant.js";

export const generateLottoNumbers = (count) => {
  const lottoNumbers = [];
  for (let i = 0; i < count; i++) {
    lottoNumbers.push(pickNumbers());
  }
  return lottoNumbers;
};

const pickNumbers = () => {
  const numbers = Random.pickUniqueNumbersInRange(
    MININUM_NUMBER,
    MAXIMUM_NUMBER,
    REQUIRED_NUMBERS_COUNT
  );
  return numbers.sort((a, b) => a - b);
};
