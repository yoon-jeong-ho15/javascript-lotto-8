import {
  clearInput,
  convertToNumber,
  breakIntoArr,
  translate,
} from "../../src/utils/parse";

describe("clearInput", () => {
  test.each([
    ["14,000", "14000"],
    ["14000원", "14000"],
    ["14 000", "14000"],
    ["14 000 원", "14000"],
  ])("정상: %s", (input, cleaned) => {
    const result = clearInput("amount", input);
    expect(result).toBe(cleaned);
  });
});

escribe("convertToNumber", () => {
  test.each([
    ["3만", 30000],
    ["삼만", 30000],
    ["30000", 30000],
  ])("%s", (str, number) => {
    const result = convertToNumber(str);
    expect(result).toBe(number);
  });
});

describe("breakIntoArr", () => {
  test.each([
    ["30만", ["30", ""]],
    ["3십만", ["3십", ""]],
    ["삼십만", ["삼십", ""]],
    ["삼십사만육천칠백팔십구", ["삼십사", "육천칠백팔십구"]],
    ["34만6천8백", ["34", "6천8백"]],
    ["5천", ["", "5천"]],
  ])("%s", (str, arr) => {
    const result = breakIntoArr(str);
    expect(result).toEqual(arr);
  });
});

describe("translate", () => {
  test.each([
    ["육천칠백팔십구", 6789],
    ["육천팔십", 6080],
    ["육천구", 6009],
    ["6천7백8십9", 6789],
  ])("%s", (str, a) => {
    const result = translate(str);
    expect(result).toBe(a);
  });
});
