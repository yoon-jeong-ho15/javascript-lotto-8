import { RANK_WINNING_MAP, SCORE_RANK_MAP } from "../constant";

export const getMatchResult = (lottos, winningNumbers, bonusNumber, amount) => {
  const ranks = lottos.map((lotto) =>
    getRank(lotto, winningNumbers, bonusNumber)
  );

  const totalWinning = getTotalWinning(ranks);
  const ratio = getRatio(totalWinning, amount);
  return { ranks, totalWinning, ratio };
};

export const getRank = (lotto, winningNumbers, bonusNumber) => {
  const matchCount = lotto.matchNumbers(winningNumbers);
  if (matchCount === 5 && lotto.hasBonus(bonusNumber)) {
    return SCORE_RANK_MAP["5+"];
  }
  if (SCORE_RANK_MAP[matchCount]) return SCORE_RANK_MAP[matchCount];
};

export const getTotalWinning = (ranks) => {
  return ranks.reduce((acc, rank) => acc + RANK_WINNING_MAP[rank], 0);
};

export const getRatio = (totalWinning, amount) => {
  const num = totalWinning / amount;
  return Math.round(num * 10) / 10;
};
