import { checkIfForbiden, clearInput } from "../../src/validate";

describe("clearInput", () => {
  test.each([
    ["14,000", "14000"],
    ["14000원", "14000"],
    ["14 000", "14000"],
    ["14 000 원", "14000"],
  ])("정상: %s", (input, cleaned) => {
    const result = clearInput("ammount", input);
    expect(result).toBe(cleaned);
  });
});

describe("checkIfForbiden", () => {
  test.each(["*$원", "14억원", "가나다"])("에러 : %s", (input) => {
    expect(() => checkIfForbiden(input)).toThrow(
      `[ERROR] 올바르지 않은 입력입니다.`
    );
  });
  test;
});
