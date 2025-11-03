import {
  countMatchingNumbers,
  hasBonusNumber,
  findRank,
} from "../../src/utils/match.js";

describe("countMatchingNumbers는 일치하는 번호의 개수를 반환한다.", () => {
  test.each([
    [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], 6],
    [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 7], 5],
    [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 8, 9], 4],
    [[1, 2, 3, 4, 5, 6], [1, 2, 3, 7, 8, 9], 3],
    [[1, 2, 3, 4, 5, 6], [1, 2, 7, 8, 9, 10], 2],
    [[1, 2, 3, 4, 5, 6], [1, 7, 8, 9, 10, 11], 1],
    [[1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12], 0],
  ])(
    "로또 번호 %s와 당첨 번호 %s는 %i개 일치한다",
    (lottoNumbers, winningNumbers, expected) => {
      const result = countMatchingNumbers(lottoNumbers, winningNumbers);
      expect(result).toBe(expected);
    }
  );
});

describe("hasBonusNumber는 보너스 번호 포함 여부를 반환한다.", () => {
  test.each([
    [[1, 2, 3, 4, 5, 6], 7, false],
    [[1, 2, 3, 4, 5, 6], 6, true],
    [[1, 2, 3, 4, 5, 6], 1, true],
    [[10, 20, 30, 40, 41, 42], 42, true],
    [[10, 20, 30, 40, 41, 42], 45, false],
  ])(
    "로또 번호 %s에 보너스 번호 %i가 포함되어 있는지: %s",
    (lottoNumbers, bonusNumber, expected) => {
      const result = hasBonusNumber(lottoNumbers, bonusNumber);
      expect(result).toBe(expected);
    }
  );
});

describe("findRank는 로또의 당첨 등급을 반환한다.", () => {
  test.each([
    [6, false, 1],
    [6, true, 1],
    [5, true, 2],
    [5, false, 3],
    [4, false, 4],
    [3, true, 5],
    [3, false, 5],
    [2, false, undefined],
    [1, false, undefined],
    [0, false, undefined],
  ])(
    "일치 개수 %i, 보너스 일치 %s는 %i등을 반환한다",
    (matchCount, hasBonus, rank) => {
      const result = findRank(matchCount, hasBonus);
      expect(result).toBe(rank);
    }
  );
});
