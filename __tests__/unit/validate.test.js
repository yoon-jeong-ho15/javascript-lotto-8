import { checkIfForbidden } from "../../src/utils/validate.js";

describe("checkIfForbiden", () => {
  test.each(["*$원", "14억원", "가나다"])("에러 : %s", (input) => {
    expect(() => checkIfForbidden(input)).toThrow(
      `[ERROR] 올바르지 않은 입력입니다.`
    );
  });
});
