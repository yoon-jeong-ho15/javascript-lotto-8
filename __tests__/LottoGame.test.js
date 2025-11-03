import LottoGame from "../src/domain/LottoGame.js";
import { mockRandoms } from "../src/mock.js";

test("생성자는 입력된 개수만큼 로또를 구매한다.", () => {
  const game = new LottoGame(5);

  const lottos = game.getLottos();
  expect(lottos).toHaveLength(5);
});

describe("getResult는 당첨 통계를 계산한다.", () => {
  test("모두 꽝인 경우", () => {
    mockRandoms([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
    ]);

    const game = new LottoGame(2);
    game.setWinningNumbers([20, 21, 22, 23, 24, 25], 26);
    const result = game.getResult();

    expect(result.ranks).toEqual({});
    expect(result.ratio).toBe(0);
  });

  test("5등 1개", () => {
    mockRandoms([[1, 2, 3, 4, 5, 6]]);

    const game = new LottoGame(1);
    game.setWinningNumbers([1, 2, 3, 20, 21, 22], 23);
    const result = game.getResult();

    expect(result.ranks).toEqual({ 5: 1 });
    expect(result.ratio).toBe(500.0);
  });

  test("1등 1개", () => {
    mockRandoms([[1, 2, 3, 4, 5, 6]]);

    const game = new LottoGame(1);
    game.setWinningNumbers([1, 2, 3, 4, 5, 6], 7);
    const result = game.getResult();

    expect(result.ranks).toEqual({ 1: 1 });
    expect(result.ratio).toBe(200000000.0);
  });

  test("2등 1개", () => {
    mockRandoms([[1, 2, 3, 4, 5, 7]]);

    const game = new LottoGame(1);
    game.setWinningNumbers([1, 2, 3, 4, 5, 6], 7);
    const result = game.getResult();

    expect(result.ranks).toEqual({ 2: 1 });
    expect(result.ratio).toBe(30000000.0);
  });

  test("여러 등수 혼합", () => {
    mockRandoms([
      [1, 2, 3, 4, 5, 6], // 1등
      [1, 2, 3, 4, 5, 7], // 2등
      [1, 2, 3, 4, 8, 9], // 4등
      [1, 2, 3, 8, 9, 10], // 5등
    ]);

    const game = new LottoGame(4);
    game.setWinningNumbers([1, 2, 3, 4, 5, 6], 7);
    const result = game.getResult();

    expect(result.ranks).toEqual({
      1: 1,
      2: 1,
      4: 1,
      5: 1,
    });

    expect(result.ratio).toBe(57501375.0);
  });
});
