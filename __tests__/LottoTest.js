import Lotto from "../src/class/Lotto.js";

describe("로또 클래스 테스트", () => {
  describe("정상 케이스", () => {
    test.each([[[1, 2, 3, 4, 5, 6]], [[7, 8, 9, 10, 11, 12]]])("", (nums) => {
      const lotto = new Lotto(nums);
      expect(lotto.toString()).toBe(`[${nums.join(", ")}]`);
    });
  });
  describe("예외 케이스", () => {
    test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, 6, 7]);
      }).toThrow(`[ERROR] 로또 번호는 6개여야 합니다.`);
    });

    test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, 5]);
      }).toThrow(`[ERROR] 중복된 숫자가 입력되었습니다.`);
    });
  });
});

describe("당첨번호 매치 테스트", () => {
  test("3개 숫자가 일치", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto([1, 2, 3, 7, 8, 9]);
    const result = lotto.matchNumbers(numbers);
    expect(result).toBe(3);
  });
  test("0개 숫자가 일치", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto([7, 8, 9, 10, 11, 12]);
    const result = lotto.matchNumbers(numbers);
    expect(result).toBe(0);
  });
});
