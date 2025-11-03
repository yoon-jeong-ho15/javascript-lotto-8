import {
  validateAmountInput,
  hasInvalidCharacters,
  validateAmount,
  isBelowMinimumAmount,
  isAboveMaximumAmount,
  isNotDivisivle,
  validateNumbersInput,
  hasNonNumeric,
  validateNumbers,
  hasDuplicateNumbers,
  isBelowMinimumNumber,
  isAboveMaximumNumber,
  notHaveValidLength,
  validateBonusNumberInput,
} from "../../src/utils/validate.js";
describe("금액", () => {
  describe("형식 검증", () => {
    describe("validateAmountInput", () => {
      test.each(["*$", "14억", "가나다abc"])(
        "허용되지 않은 문자 입력 시 에러 발생: %s",
        (input) => {
          expect(() => validateAmountInput(input)).toThrow(
            `[ERROR] 올바르지 않은 입력입니다.`
          );
        }
      );

      test.each(["3만", "삼만", "이만오천", "16000", "1000"])(
        "허용된 문자만 입력 시 에러 없음: %s",
        (input) => {
          expect(() => validateAmountInput(input)).not.toThrow();
        }
      );
    });

    describe("hasInvalidCharacters", () => {
      test("허용되지 않은 문자가 포함되면 true 반환", () => {
        expect(hasInvalidCharacters("abc123")).toBe(true);
        expect(hasInvalidCharacters("!@#")).toBe(true);
        expect(hasInvalidCharacters("가나다라")).toBe(true);
      });

      test("허용된 문자만 포함되면 false 반환", () => {
        expect(hasInvalidCharacters("일만")).toBe(false);
        expect(hasInvalidCharacters("10000")).toBe(false);
        expect(hasInvalidCharacters("삼천오백")).toBe(false);
      });
    });
  });
  describe("값 검증", () => {
    describe("validateAmount", () => {
      test("최소 금액 미만 입력 시 에러 발생", () => {
        expect(() => validateAmount(500)).toThrow(
          `[ERROR] 최소 1,000원 이상의 금액을 입력해주세요.`
        );
      });

      test("최대 금액 초과 입력 시 에러 발생", () => {
        expect(() => validateAmount(150000)).toThrow(
          `[ERROR] 1회 구매 한도는 10만원 100장 입니다.`
        );
      });

      test("1000원 단위가 아닌 금액 입력 시 에러 발생", () => {
        expect(() => validateAmount(1500)).toThrow(
          `[ERROR] 1,000원 단위의 금액을 입력해주세요.`
        );
      });

      test.each([5000, 10000, 50000, 100000])(
        "유효한 금액 입력 시 에러 없음: %i",
        (amount) => {
          expect(() => validateAmount(amount)).not.toThrow();
        }
      );
    });

    describe("isBelowMinimumAmount", () => {
      test.each([999, 0, 500])("1000원 미만이면 true 반환: %i", (amount) => {
        expect(isBelowMinimumAmount(amount)).toBe(true);
      });

      test.each([1000, 5000, 10000])(
        "1000원 이상이면 false 반환: %i",
        (amount) => {
          expect(isBelowMinimumAmount(amount)).toBe(false);
        }
      );
    });

    describe("isAboveMaximumAmount", () => {
      test.each([100001, 200000, 150000])(
        "100000원 초과면 true 반환: %i",
        (amount) => {
          expect(isAboveMaximumAmount(amount)).toBe(true);
        }
      );

      test.each([100000, 50000, 1000])(
        "100000원 이하면 false 반환: %i",
        (amount) => {
          expect(isAboveMaximumAmount(amount)).toBe(false);
        }
      );
    });

    describe("isNotDivisivle", () => {
      test.each([1500, 2300, 3700])(
        "1000원 단위가 아니면 true 반환: %i",
        (amount) => {
          expect(isNotDivisivle(amount)).toBe(true);
        }
      );

      test.each([1000, 5000, 10000])(
        "1000원 단위면 false 반환: %i",
        (amount) => {
          expect(isNotDivisivle(amount)).toBe(false);
        }
      );
    });
  });
});

describe("로또 번호", () => {
  describe("형식 검증", () => {
    describe("validateNumbersInput", () => {
      test.each(["1,2,a", "1-2-3", "가,나,다", "1.2.3"])(
        "숫자와 쉼표 외의 문자 입력 시 에러 발생: %s",
        (input) => {
          expect(() => validateNumbersInput(input)).toThrow(
            `[ERROR] 숫자 외의 문자를 입력할 수 없습니다.`
          );
        }
      );

      test.each(["1,2,3", "10,20,30", "1,2,3,4,5,6"])(
        "숫자와 쉼표만 입력 시 에러 없음: %s",
        (input) => {
          expect(() => validateNumbersInput(input)).not.toThrow();
        }
      );
    });

    describe("hasNonNumeric", () => {
      test.each(["1,2,a", "1-2-3", "가나다"])(
        "일반 번호 입력 시 쉼표와 숫자 외 문자가 있으면 true 반환: %s",
        (input) => {
          expect(hasNonNumeric(input)).toBe(true);
        }
      );

      test.each(["1,2,3", "123"])(
        "일반 번호 입력 시 쉼표와 숫자만 있으면 false 반환: %s",
        (input) => {
          expect(hasNonNumeric(input)).toBe(false);
        }
      );

      test.each(["1a", "가", "1,2"])(
        "보너스 번호 입력 시 숫자 외 문자가 있으면 true 반환: %s",
        (input) => {
          expect(hasNonNumeric(input, "bonus")).toBe(true);
        }
      );

      test.each(["7", "45"])(
        "보너스 번호 입력 시 숫자만 있으면 false 반환: %s",
        (input) => {
          expect(hasNonNumeric(input, "bonus")).toBe(false);
        }
      );
    });
  });
  describe("값 검증", () => {
    describe("validateNumbers", () => {
      test("중복된 번호가 있으면 에러 발생", () => {
        expect(() => validateNumbers([1, 2, 3, 4, 5, 5])).toThrow(
          `[ERROR] 중복된 번호가 입력되었습니다.`
        );
      });

      test("번호 개수가 6개가 아니면 에러 발생", () => {
        expect(() => validateNumbers([1, 2, 3, 4, 5])).toThrow(
          `[ERROR] 로또 번호는 6개여야 합니다.`
        );
        expect(() => validateNumbers([1, 2, 3, 4, 5, 6, 7])).toThrow(
          `[ERROR] 로또 번호는 6개여야 합니다.`
        );
      });

      test("유효한 번호 배열은 에러 없음", () => {
        expect(() => validateNumbers([1, 2, 3, 4, 5, 6])).not.toThrow();
      });
    });

    describe("hasDuplicateNumbers", () => {
      test.each([[[1, 2, 3, 4, 5, 5]], [[1, 1, 1, 1, 1, 1]]])(
        "중복된 번호가 있으면 true 반환: %p",
        (numbers) => {
          expect(hasDuplicateNumbers(numbers)).toBe(true);
        }
      );

      test.each([[[1, 2, 3, 4, 5, 6]], [[10, 20, 30, 40]]])(
        "중복된 번호가 없으면 false 반환: %p",
        (numbers) => {
          expect(hasDuplicateNumbers(numbers)).toBe(false);
        }
      );
    });

    describe("isBelowMinimumNumber", () => {
      test.each([0, -1])("1 미만이면 true 반환: %i", (number) => {
        expect(isBelowMinimumNumber(number)).toBe(true);
      });

      test.each([1, 10, 45])("1 이상이면 false 반환: %i", (number) => {
        expect(isBelowMinimumNumber(number)).toBe(false);
      });
    });

    describe("isAboveMaximumNumber", () => {
      test.each([46, 100])("45 초과면 true 반환: %i", (number) => {
        expect(isAboveMaximumNumber(number)).toBe(true);
      });

      test.each([45, 30, 1])("45 이하면 false 반환: %i", (number) => {
        expect(isAboveMaximumNumber(number)).toBe(false);
      });
    });

    describe("notHaveValidLength", () => {
      test.each([[1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6, 7], [1]])(
        "길이가 6이 아니면 true 반환: %p",
        (numbers) => {
          expect(notHaveValidLength(numbers)).toBe(true);
        }
      );

      test("길이가 6이면 false 반환", () => {
        expect(notHaveValidLength([1, 2, 3, 4, 5, 6])).toBe(false);
      });
    });
  });
});

describe("보너스 번호", () => {
  describe("형식 검증", () => {
    describe("validateBonusNumberInput", () => {
      test.each(["1a", "가", "1,2", "!@#"])(
        "숫자 외의 문자 입력 시 에러 발생: %s",
        (input) => {
          expect(() => validateBonusNumberInput(input)).toThrow(
            `[ERROR] 숫자 외의 문자를 입력할 수 없습니다.`
          );
        }
      );

      test.each(["1", "45", "7"])("숫자만 입력 시 에러 없음: %s", (input) => {
        expect(() => validateBonusNumberInput(input)).not.toThrow();
      });
    });
  });

  describe("값 검증", () => {
    //로또 번호 값 검증 함수들 재활용해 사용중인 관계로 생략
  });
});
