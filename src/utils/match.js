import { SCORE_RANK_MAP } from "../constant/constant.js";

export const countMatchingNumbers = (lottoNumbers, winningNumbers) => {
  return winningNumbers.filter((number) => lottoNumbers.includes(number))
    .length;
};

export const hasBonusNumber = (lottoNumbers, bonusNumber) => {
  return lottoNumbers.includes(bonusNumber);
};

export const findRank = (matchCount, hasBonus) => {
  if (matchCount === 5 && hasBonus) {
    matchCount += "+";
  }
  return SCORE_RANK_MAP[matchCount];
};
