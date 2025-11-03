import { RANK_WINNING_MAP, SCORE_RANK_MAP } from "../constant/constant.js";

export const getMatchResult = (lottos, winningNumbers, bonusNumber, amount) => {
  const ranks = {};

  lottos.forEach((lotto) => {
    const rank = lotto.getRank(winningNumbers, bonusNumber);
    if (rank) ranks[rank] = (ranks[rank] || 0) + 1;
  });

  const totalWinning = getTotalWinning(ranks);
  const ratio = getRatio(totalWinning, amount);
  return { ranks, ratio };
};

export const getTotalWinning = (ranks) => {
  return Object.entries(ranks).reduce(
    (acc, [rank, count]) => acc + RANK_WINNING_MAP[rank] * count,
    0
  );
};

export const getRatio = (totalWinning, amount) => {
  const num = (totalWinning / amount) * 100;
  return Math.round(num * 10) / 10;
};

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
