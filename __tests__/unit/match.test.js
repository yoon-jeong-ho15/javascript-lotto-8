import { getRank, getRatio, getTotalWinning } from "../../src/utils/match.js";
import Lotto from "../../src/class/Lotto.js";

describe("getRank", () => {
  test.each([
    [[1, 2, 3, 4, 5, 6], 1],
    [[1, 2, 3, 4, 5, 7], 2],
    [[1, 2, 3, 4, 5, 8], 3],
    [[1, 2, 3, 4, 9, 10], 4],
    [[1, 2, 3, 11, 12, 13], 5],
  ])("%s 번호는 %i등을 반환한다", (numbers, rank) => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const lotto = new Lotto(numbers);
    const result = getRank(lotto, winningNumbers, bonusNumber);
    expect(result).toBe(rank);
  });
});

describe("getTotalWinning은 당첨금 총액을 반환한다.", () => {
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
    const result = getTotalWinning(ranks);
    expect(result).toBe(total);
  });
});

describe("getRatio는 총 수익률('당첨금 총액 / 구입액')을 소수 한자리수 까지 반올림을 해서 반환한다.", () => {
  test.each([
    [100, 3, 33.3],
    [100, 4, 25.0],
    [100, 17, 5.9],
  ])("%i를 %i로 나눈 후 반올림하면 %i가 된다.", (total, amount, rounded) => {
    const result = getRatio(total, amount);
    expect(result).toBe(rounded);
  });
});
