import {
  checkAboveMinimum,
  checkBelowMaximum,
  checkDivisible,
  checkIfForbidden,
} from "../../src/utils/validate.js";

describe("checkIfForbiden", () => {
  test.each(["*$원", "14억원", "가나다"])("에러 : %s", (input) => {
    expect(() => checkIfForbidden(input)).toThrow(
      `[ERROR] 올바르지 않은 입력입니다.`
    );
  });
  test.each(["3만원", "삼만원", "이만5천원", "16000원"])(
    "정상 : %s",
    (input) => {
      expect(() => checkIfForbidden(input)).not.toThrow(`[ERROR]`);
    }
  );
});

describe("입력 금액 검증", () => {
  describe("예외 케이스", () => {
    test("checkAboveMinimum", () => {
      const input = 300;
      expect(() => checkAboveMinimum(input)).toThrow(
        `[ERROR] 최소 1,000원 이상의 금액을 입력해주세요.`
      );
    });
    test("checkBelowMaximum", () => {
      const input = 300000;
      expect(() => checkBelowMaximum(input)).toThrow(
        `[ERROR] 1회 구매 한도는 10만원 100장 입니다.`
      );
    });
    test("checkDivisible", () => {
      const input = 5400;
      expect(() => checkDivisible(input)).toThrow(
        `[ERROR] 1,000원 단위의 금액을 입력해주세요.`
      );
    });
  });
});
