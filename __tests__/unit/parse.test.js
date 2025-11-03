import {
  clearInput,
  convertToNumber,
  translate,
  calculateAmount,
  calculateCount,
} from "../../src/utils/parse";

describe("공통", () => {
  describe("clearInput", () => {
    describe("금액 입력값은 '원', 콤마(,), 공백을 제거한다.", () => {
      test.each([
        ["14,000", "14000"],
        ["14000원", "14000"],
        ["14 000", "14000"],
        ["14 000 원", "14000"],
      ])("%s -> %s", (input, cleaned) => {
        const result = clearInput("amount", input);
        expect(result).toBe(cleaned);
      });
    });
    describe("번호 입력값은 공백만 제거한다.", () => {
      test.each([
        ["1, 2, 3", "1,2,3"],
        ["1 2 3", "123"],
      ])("번호 입력값은 공백만 제거한다.", (input, cleaned) => {
        const result = clearInput("number", input);
        expect(result).toBe(cleaned);
      });
    });
  });
});

describe("금액 파싱", () => {
  describe("convertToNumber는 입력된 문자열을 숫자로 변환한다.", () => {
    test.each([
      ["30000", 30000],
      ["3만", 30000],
      ["삼만", 30000],
      ["5천", 5000],
      ["오천", 5000],
      ["이천삼백사십오만육천칠백팔십구", 23456789],
    ])("%s -> %i", (str, number) => {
      const result = convertToNumber(str);
      expect(result).toBe(number);
    });
  });

  describe("translate는 문자로 입력한 네자리 수('0000')를 숫자로 변환한다.", () => {
    test.each([
      ["육천칠백팔십구", 6789],
      ["육천팔십", 6080],
      ["육천구", 6009],
      ["6천7백8십9", 6789],
      ["", 0],
    ])("%s -> %i", (str, number) => {
      const result = translate(str);
      expect(result).toBe(number);
    });
  });

  describe("calculateAmount는 배열을 받아 단위에 맞게 계산하여 합산한다.", () => {
    test.each([
      [[0, 0], 0],
      [[5000, 0], 5000],
      [[0, 3], 30000],
      [[5000, 3], 35000],
      [[6789, 2345], 23456789],
      [[0, 0, 1], 100000000],
      [[5000, 3, 2], 200035000],
    ])("%s -> %i", (numbers, expected) => {
      const result = calculateAmount(numbers);
      expect(result).toBe(expected);
    });
  });
});

describe("로또 개수 계산", () => {
  describe("calculateCount", () => {
    test.each([
      [1000, 1],
      [5000, 5],
      [10000, 10],
      [100000, 100],
    ])("%i원 -> %i장", (amount, count) => {
      const result = calculateCount(amount);
      expect(result).toBe(count);
    });
  });
});
