export const REQUIRED_NUMBERS_COUNT = 6;
export const MININUM_NUMBER = 1;
export const MAXIMUM_NUMBER = 45;

export const FORBIDDEN_INPUT = /[^ ,0-9일이삼사오육칠팔구십백천만원]/;

export const MAXIMUM_AMOUNT = 100000;
export const LOTTO_PRICE = 1000;

export const NUMBER_MAP = {
  일: 1,
  이: 2,
  삼: 3,
  사: 4,
  오: 5,
  육: 6,
  칠: 7,
  팔: 8,
  구: 9,
};

export const DIGIT_NUMBER_MAP = {
  십: 2,
  백: 1,
  천: 0,
};

export const SCORE_RANK_MAP = {
  6: 1,
  "5+": 2,
  5: 3,
  4: 4,
  3: 5,
  2: 0,
  1: 0,
  0: 0,
};

export const RANK_WINNING_MAP = {
  1: 2000000000, //20억
  2: 300000000, //3억
  3: 1500000, //150만
  4: 50000, //5만
  5: 5000, //5천
  0: 0,
};
