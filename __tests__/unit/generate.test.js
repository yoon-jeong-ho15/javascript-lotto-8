import { generateLottoNumbers } from "../../src/utils/generate";

describe("generateLottoNumbers 입력된 숫자만큼 로또 번호 배열이 생성된다", () => {
  test.each([1, 9, 32, 57, 100])("%i ", (num) => {
    const result = generateLottoNumbers(num);
    expect(result.length).toBe(num);
    result.forEach((numbers) => {
      expect(numbers.length).toBe(6);
      expect(numbers).toEqual([...numbers].sort((a, b) => a - b));
    });
  });
});
