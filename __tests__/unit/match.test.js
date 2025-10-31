import { getRank, getRatio, getTotalWinning } from "../../src/utils/match.js";
import Lotto from "../../src/class/Lotto.js";

describe("getRank", () => {
  test.each([
    [[1, 2, 3, 4, 5, 6], 1],
    [[1, 2, 3, 4, 5, 7], 2],
    [[1, 2, 3, 4, 5, 8], 3],
    [[1, 2, 3, 4, 9, 10], 4],
    [[1, 2, 3, 11, 12, 13], 5],
    [[1, 2, 10, 11, 12, 13], 0],
    [[1, 10, 11, 12, 13, 14], 0],
    [[10, 11, 12, 13, 14, 15], 0],
  ])("%s 번호는 %i등을 반환한다", (numbers, rank) => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const lotto = new Lotto(numbers);
    const result = getRank(lotto, winningNumbers, bonusNumber);
    expect(result).toBe(rank);
  });
});

describe("getTotalWinning", () => {
  test.each([
    [[1, 0, 0, 0, 0, 0], 2000000000],
    [[2, 0, 0, 0, 0, 0], 300000000],
    [[3, 0, 0, 0, 0, 0], 1500000],
    [[4, 0, 0, 0, 0, 0], 50000],
    [[5, 0, 0, 0, 0, 0], 5000],
    [[0, 0, 0, 0, 0, 0], 0],
    [[1, 2, 3, 4, 5, 0], 2301555000],
    [[5, 5, 5, 0, 0, 0], 15000],
    [[1, 1, 0, 0, 0, 0], 4000000000],
    [[0, 0, 0, 0, 0, 0], 0],
  ])("%s 의 총 상금의 합은 %i다", (ranks, total) => {
    const result = getTotalWinning(ranks);
    expect(result).toBe(total);
  });
});

describe("getRatio", () => {
  test.each([
    [100, 3, 33.3],
    [100, 4, 25.0],
    [100, 17, 5.9],
  ])("%i를 반올림하면 %i가 된다.", (total, amount, rounded) => {
    const result = getRatio(total, amount);
    expect(result).toBe(rounded);
  });
});
