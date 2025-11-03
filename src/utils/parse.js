import {
  DIGIT_NUMBER_MAP,
  LOTTO_PRICE,
  NUMBER_MAP,
} from "../constant/constant.js";

export const clearInput = (type, input) => {
  if (type === "amount") return input.replaceAll(/[ ,원]/g, "");
  if (type === "number") return input.replaceAll(" ", "");
};

/////////////////////////////////////////////////////////////////////
// 금액 파싱
/////////////////////////////////////////////////////////////////////

export const convertToNumber = (cleaned) => {
  if (Number(cleaned)) return Number(cleaned);

  // 만의 단위와 일의 단위 분리 : "2만5천" -> "2","5천"
  const index = cleaned.indexOf("만");
  // man : 만 이상의 단위 (만,십만,백만,천만)
  // il : 만 이하의 단위 (일,십,백,천)
  const man = cleaned.slice(0, Math.max(0, index));
  const il = cleaned.slice(index + 1);

  // "2","5천" -> 25000
  const result = calculateAmount([il, man].map(translate));

  return result;
};

export const calculateAmount = (numbers) => {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    const digit = 10000 ** i;
    sum += number * digit;
  }
  return sum;
};

export const translate = (str) => {
  if (str === "") return 0;

  let result = [0, 0, 0, 0];
  let digitIndex = 3;

  for (let i = str.length - 1; i >= 0; i--) {
    const ch = str[i];
    if (ch in DIGIT_NUMBER_MAP) digitIndex = DIGIT_NUMBER_MAP[ch];
    if (ch in NUMBER_MAP) result[digitIndex] = NUMBER_MAP[ch];
    if (Number(ch)) result[digitIndex] = Number(ch);
  }
  return Number(result.join(""));
};

/////////////////////////////////////////////////////////////////////
//
/////////////////////////////////////////////////////////////////////

export const calculateCount = (amount) => {
  return amount / LOTTO_PRICE;
};
