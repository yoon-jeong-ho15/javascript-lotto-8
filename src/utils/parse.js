import { DIGIT_NUMBER_MAP, LOTTO_PRICE, NUMBER_MAP } from "../constant.js";

export const clearInput = (type, input) => {
  if (type === "amount") return input.replaceAll(/[ ,원]/g, "");
  if (type === "number") return input.replaceAll(" ", "");
};

/////////////////////////////////////////////////////////////////////
// 금액 파싱
/////////////////////////////////////////////////////////////////////

export const convertToNumber = (cleaned) => {
  // "25000" -> 25000
  if (Number(cleaned)) return Number(cleaned);

  // "2만5천", "이만오천" -> ["2","5천"]
  const arr = breakIntoArr(cleaned);

  // ["2","5천"] -> [2,5000]
  const [man, il] = arr.map(translate);

  //[2,5000] -> 25000
  let result = man * 10000 + il;

  return result;
};

export const breakIntoArr = (cleaned) => {
  if (!cleaned.includes("만")) return ["", cleaned];
  return cleaned.split("만");
};

export const translate = (str) => {
  // "오천" -> ["","오천"] -> [0,5000]
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

export const calculateCount = (amount) => {
  return amount / LOTTO_PRICE;
};
