import {
  calculateTotalWinning,
  calculateRatio,
} from "../../src/utils/calculate";

describe("calculateTotalWinning은 당첨금 총액을 반환한다.", () => {
  test.each([
    [{ 1: 1 }, 2000000000],
    [{ 2: 1 }, 300000000],
    [{ 3: 1 }, 1500000],
    [{ 4: 1 }, 50000],
    [{ 5: 1 }, 5000],
    [{ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 }, 2301555000],
    [{ 5: 3 }, 15000],
    [{ 1: 2 }, 4000000000],
  ])("%s 의 총 상금의 합은 %i다", (ranks, total) => {
    const result = calculateTotalWinning(ranks);
    expect(result).toBe(total);
  });
});

describe("calculateRatio는 총 수익률('당첨금 총액 / 구입액')을 소수 한자리수 까지 반올림을 해서 반환한다.", () => {
  test.each([
    [1000, 1, 100.0], // 1000원 당첨, 1개 구매(1000원) = 100%
    [5000, 1, 500.0], // 5000원 당첨, 1개 구매(1000원) = 500%
    [2000, 4, 50.0], // 2000원 당첨, 4개 구매(4000원) = 50%
    [5000, 8, 62.5], // 5000원 당첨, 8개 구매(8000원) = 62.5%
  ])(
    "당첨금 %i원, 로또 %i개 구매 시 수익률은 %i%",
    (totalWinning, count, expectedRatio) => {
      const result = calculateRatio(totalWinning, count);
      expect(result).toBe(expectedRatio);
    }
  );
});
