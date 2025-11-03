import { RANK_WINNING_MAP, LOTTO_PRICE } from "../constant/constant.js";

export const calculateTotalWinning = (ranks) => {
  return Object.entries(ranks).reduce(
    (acc, [rank, count]) => acc + RANK_WINNING_MAP[rank] * count,
    0
  );
};

export const calculateRatio = (totalWinning, count) => {
  const amount = count * LOTTO_PRICE;
  const number = (totalWinning / amount) * 100;
  return Math.round(number * 10) / 10;
};

export const calculateCount = (amount) => {
  return amount / LOTTO_PRICE;
};
