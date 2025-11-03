import {
  checkAboveMinimum,
  checkBelowMaximum,
  checkDivisible,
  checkIfForbidden,
  checkIfHasNonNumberic,
  checkLength,
  checkNumberRange,
} from "../../src/utils/validate.js";

describe("입력 형식 검증", () => {
  describe("금액 형식 검증", () => {
    test.each(["*$원", "14억원", "가나다"])(
      "허용되지 않은 입력 : %s",
      (input) => {
        expect(() => checkIfForbidden(input)).toThrow(
          `[ERROR] 올바르지 않은 입력입니다.`
        );
      }
    );
    test.each(["3만원", "삼만원", "이만5천원", "16000원"])(
      "정상 범위의 입력: %s",
      (input) => {
        expect(() => checkIfForbidden(input)).not.toThrow(`[ERROR]`);
      }
    );
  });
  describe("번호 형식 검증", () => {
    test.each(["3,+8", "6-4", "삼,이,사십"])(
      "숫자 외의 문자 입력 : %s",
      (input) => {
        expect(() => checkIfHasNonNumberic(input)).toThrow(`[ERROR]`);
      }
    );
    test.each(["3,8", "6,4", "1,2,9"])("숫자만 입력 : %s", (input) => {
      expect(() => checkIfHasNonNumberic(input)).not.toThrow(`[ERROR]`);
    });
  });
});

describe("금액 검증", () => {
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

describe("당첨번호 검증", () => {
  test.each([0, 46])("1~45 범위 밖의 숫자 입력 : %i", (num) => {
    expect(() => checkNumberRange(num)).toThrow(`[ERROR]`);
  });
  test("7개 숫자 입력", () => {
    const nums = [1, 2, 3, 4, 5, 6, 7];
    expect(() => checkLength(nums)).toThrow(`[ERROR]`);
  });
});
