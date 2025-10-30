import Amount from "../src/class/Amount.js";

describe("Amount 클래스 테스트", () => {
  describe("정상 케이스", () => {
    test.each([
      ["5000", 5000, "숫자 문자열"],
      ["오천", 5000, "한글 숫자"],
      ["2만5천", 25000, "한글과 아라비아 숫자 혼합"],
      ["10,000원", 10000, "공백, 쉼표, 원 기호 포함"],
      ["1000", 1000, "최소 금액(1,000원)"],
      ["100000", 100000, "최대 금액(100,000원)"],
    ])("%s -> %i (%s)", (input, expected) => {
      const amount = new Amount(input);
      expect(amount.getAmount()).toBe(expected);
    });
  });

  describe("예외 케이스", () => {
    test("금지된 문자 사용", () => {
      expect(() => {
        new Amount("abc");
      }).toThrow(`[ERROR] 올바르지 않은 입력입니다.`);
    });

    test("최소 금액(1,000원) 미만", () => {
      expect(() => {
        new Amount("500");
      }).toThrow(`[ERROR] 최소 1,000원 이상의 금액을 입력해주세요.`);
    });

    test("1,000 단위로 나누어지지 않음", () => {
      expect(() => {
        new Amount("1500");
      }).toThrow(`[ERROR] 1,000원 단위의 금액을 입력해주세요.`);
    });

    test("최대 금액(100,000원)을 초과", () => {
      expect(() => {
        new Amount("150000");
      }).toThrow(`[ERROR] 1회 구매 한도는 10만원 100장 입니다.`);
    });
  });
});
