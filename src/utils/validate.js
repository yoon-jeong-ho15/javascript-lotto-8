import {
  FORBIDDEN_INPUT,
  MAXIMUM_AMOUNT,
  LOTTO_PRICE,
  MAXIMUM_NUMBER,
  MININUM_NUMBER,
  REQUIRED_NUMBERS_COUNT,
} from "../constant.js";

/////////////////////////////////////////////////////////////////////
// 입력 금액(로또 개수) 검증
/////////////////////////////////////////////////////////////////////

export const checkIfForbidden = (input) => {
  if (FORBIDDEN_INPUT.test(input)) {
    throw new Error(`[ERROR] 올바르지 않은 입력입니다.`);
  }
};

export const checkAboveMinimum = (amount) => {
  if (amount < LOTTO_PRICE) {
    throw new Error(`[ERROR] 최소 1,000원 이상의 금액을 입력해주세요.`);
  }
};
export const checkBelowMaximum = (amount) => {
  if (amount > MAXIMUM_AMOUNT) {
    throw new Error(`[ERROR] 1회 구매 한도는 10만원 100장 입니다.`);
  }
};

export const checkDivisible = (amount) => {
  if (amount % LOTTO_PRICE !== 0) {
    throw new Error(`[ERROR] 1,000원 단위의 금액을 입력해주세요.`);
  }
};

/////////////////////////////////////////////////////////////////////
// 로또 번호 검증
/////////////////////////////////////////////////////////////////////

export const checkIfHasNonNumberic = (input) => {
  if (/[^,0-9]/.test(input)) {
    throw new Error(`[ERROR] 숫자 외의 문자를 입력할 수 없습니다.`);
  }
};

export const checkIfDuplicatedNumbers = (numbers) => {
  const set = new Set(numbers);
  if (set.size !== numbers.length) {
    throw new Error(`[ERROR] 중복된 숫자가 입력되었습니다.`);
  }
};

export const checkNumberRange = (number) => {
  if (number < MININUM_NUMBER) {
    throw new Error(`[ERROR] ${MININUM_NUMBER} 이상의 숫자를 입력해주세요`);
  }
  if (number > MAXIMUM_NUMBER) {
    throw new Error(`[ERROR] ${MAXIMUM_NUMBER} 이하의 숫자를 입력해주세요`);
  }
};

export const checkLength = (numbers) => {
  if (numbers.length !== REQUIRED_NUMBERS_COUNT) {
    throw new Error(
      `[ERROR] 로또 번호는 ${REQUIRED_NUMBERS_COUNT}개여야 합니다.`
    );
  }
};
