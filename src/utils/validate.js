import {
  FORBIDDEN_INPUT,
  MAXIMUM_AMOUNT,
  LOTTO_PRICE,
  NUMBER_MAP,
  DIGIT_NUMBER_MAP,
} from "../constant.js";

/////////////////////////////////////////////////////////////////////
// 입력 금액 검증
/////////////////////////////////////////////////////////////////////

export const checkIfForbidden = (input) => {
  if (FORBIDDEN_INPUT.test(input)) {
    throw new Error(`[ERROR] 올바르지 않은 입력입니다.`);
  }
};

export const checkAmountRange = (ammount) => {
  if (ammount > MAXIMUM_AMOUNT) {
    throw new Error(`[ERROR] 1회 구매 한도는 10만원 100장 입니다.`);
  }
  if (ammount < LOTTO_PRICE) {
    throw new Error(`[ERROR] 최소 1,000원 이상의 금액을 입력해주세요.`);
  }
  if (ammount % LOTTO_PRICE !== 0) {
    throw new Error(`[ERROR] 1,000원 단위의 금액을 입력해주세요.`);
  }
};

/////////////////////////////////////////////////////////////////////
// 로또 번호 검증
/////////////////////////////////////////////////////////////////////

export const checkIfDuplicatedNumbers = (numbers) => {
  const set = new Set(numbers);
  if (set.size !== numbers.length) {
    throw new Error(`[ERROR] 중복된 숫자가 입력되었습니다.`);
  }
};
