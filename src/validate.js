import { FORBIDDEN_INPUT, MAXIMUM_AMMOUNT, MINIMUM_AMMOUNT } from "./constant";

// 입력 금액 검증
export const clearInput = (type, input) => {
  if (type === "ammount") return input.replaceAll(/[ ,원]/g, "");
  if (type === "number") return input.replaceAll(" ", "");
};

export const checkIfForbiden = (input) => {
  if (FORBIDDEN_INPUT.test(input)) {
    throw new Error(`[ERROR] 올바르지 않은 입력입니다.`);
  }
};

export const convertToNumber = (valid) => {
  if (Number(valid)) return valid;
};

export const checkAmmountRange = (ammount) => {
  if (ammount > MAXIMUM_AMMOUNT) {
    throw new Error(`[ERROR] 1회 구매 한도는 10만원 100장 입니다.`);
  }
  if (ammount % MINIMUM_AMMOUNT !== 0) {
    throw new Error(`[ERROR] 1,000원 단위의 금액을 입력해주세요.`);
  }
  if (ammount < MINIMUM_AMMOUNT) {
    throw new Error(`[ERROR] 최소 1,000원 이상의 금액을 입력해주세요.`);
  }
};
