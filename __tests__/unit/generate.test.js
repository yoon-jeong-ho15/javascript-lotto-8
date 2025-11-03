import { createLotto, generateLottos } from "../../src/utils/generate";

describe("generateLottos 입력된 숫자만큼 Lotto 객체가 생성된다", () => {
  test.each([1, 9, 32, 57, 100])("%i ", (num) => {
    const result = generateLottos(num);
    expect(result.length).toBe(num);
  });
});

describe("createLotto 잘못된 번호를 입력해도 재시도 한다.", () => {
  test("중복된 숫자 입력", () => {
    const numbers = [1, 2, 3, 4, 5, 5];
    const result = createLotto(numbers);
    expect(result).toBeDefined();
    expect(result.toString()).not.toBe(`[${numbers.join(", ")}]`);
  });

  test("6개 보다 많은 숫자 입력", () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7];
    const result = createLotto(numbers);
    expect(result).toBeDefined();
    expect(result.toString()).not.toBe(`[${numbers.join(", ")}]`);
  });
});
