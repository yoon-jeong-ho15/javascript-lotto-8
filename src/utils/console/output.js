import { Console } from "@woowacourse/mission-utils";

export const printLottoCount = (count) => {
  Console.print(`${count}개를 구매했습니다.`);
};

export const printLottos = (lottos) => {
  lottos.forEach((lotto) => Console.print(`${lotto}`));
};

export const printResult = ({ ranks, ratio }) => {
  Console.print(`3개 일치 (5,000원) - ${ranks[5] || 0}개`);
  Console.print(`4개 일치 (50,000원) - ${ranks[4] || 0}개`);
  Console.print(`5개 일치 (1,500,000원) - ${ranks[3] || 0}개`);
  Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${ranks[2] || 0}개`);
  Console.print(`6개 일치 (2,000,000,000원) - ${ranks[1] || 0}개`);
  Console.print(`총 수익률은 ${ratio}%입니다.`);
};
