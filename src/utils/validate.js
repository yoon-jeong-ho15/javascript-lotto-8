import {
  FORBIDDEN_INPUT,
  MAXIMUM_AMOUNT,
  LOTTO_PRICE,
  MAXIMUM_NUMBER,
  MININUM_NUMBER,
  REQUIRED_NUMBERS_COUNT,
} from "../constant/constant.js";

/////////////////////////////////////////////////////////////////////
// 금액 검증
/////////////////////////////////////////////////////////////////////

export const validateAmountInput = (input) => {
  if (hasInvalidCharacters(input)) {
    throw new Error(`[ERROR] 올바르지 않은 입력입니다.`);
  }
};

export const hasInvalidCharacters = (input) => {
  return FORBIDDEN_INPUT.test(input);
};

export const validateAmount = (amount) => {
  if (isBelowMinimumAmount(amount)) {
    throw new Error(`[ERROR] 최소 1,000원 이상의 금액을 입력해주세요.`);
  }
  if (isAboveMaximumAmount(amount)) {
    throw new Error(`[ERROR] 1회 구매 한도는 10만원 100장 입니다.`);
  }
  if (isNotDivisivle(amount)) {
    throw new Error(`[ERROR] 1,000원 단위의 금액을 입력해주세요.`);
  }
};

export const isBelowMinimumAmount = (amount) => {
  return amount < LOTTO_PRICE;
};
export const isAboveMaximumAmount = (amount) => {
  return amount > MAXIMUM_AMOUNT;
};
export const isNotDivisivle = (amount) => {
  return amount % LOTTO_PRICE !== 0;
};

/////////////////////////////////////////////////////////////////////
// 로또 번호 검증
/////////////////////////////////////////////////////////////////////

export const validateNumbersInput = (input) => {
  if (hasNonNumeric(input)) {
    throw new Error(`[ERROR] 숫자 외의 문자를 입력할 수 없습니다.`);
  }
};

export const hasNonNumeric = (input, type) => {
  if (type === "bonus") return /[^0-9]/.test(input);
  return /[^,0-9]/.test(input);
};

export const validateNumbers = (numbers) => {
  if (hasDuplicateNumbers(numbers)) {
    throw new Error(`[ERROR] 중복된 번호가 입력되었습니다.`);
  }
  if (notHaveValidLength(numbers)) {
    throw new Error(
      `[ERROR] 로또 번호는 ${REQUIRED_NUMBERS_COUNT}개여야 합니다.`
    );
  }
  numbers.forEach((number) => validateEachNumber(number));
};

export const validateEachNumber = (number) => {
  if (isBelowMinimumNumber(number)) {
    throw new Error(`[ERROR] ${MININUM_NUMBER} 이상의 숫자를 입력해주세요`);
  }
  if (isAboveMaximumNumber(number)) {
    throw new Error(`[ERROR] ${MAXIMUM_NUMBER} 이하의 숫자를 입력해주세요`);
  }
};

export const isBelowMinimumNumber = (number) => {
  return number < MININUM_NUMBER;
};

export const isAboveMaximumNumber = (number) => {
  return number > MAXIMUM_NUMBER;
};

export const hasDuplicateNumbers = (numbers) => {
  const set = new Set(numbers);
  return set.size !== numbers.length;
};

export const notHaveValidLength = (numbers) => {
  return numbers.length !== REQUIRED_NUMBERS_COUNT;
};

/////////////////////////////////////////////////////////////////////
// 보너스 번호 검증
/////////////////////////////////////////////////////////////////////

export const validateBonusNumberInput = (input) => {
  if (hasNonNumeric(input, "bonus")) {
    throw new Error(`[ERROR] 숫자 외의 문자를 입력할 수 없습니다.`);
  }
};

export const validateBonusNumber = (number, winningNumbers) => {
  validateEachNumber(number);
  if (hasDuplicateNumbers([...winningNumbers, number])) {
    throw new Error(`[ERROR] 당첨 번호와 중복된 보너스 번호가 입력되었습니다.`);
  }
};
