import { combinations, schoolCombinations } from "../constants";
import { ICombination, IDice } from "../types/interfaces";

const findPairs = (dices: IDice[]): IDice[][] => {
  let pairs = [];
  for (let i = 0; i < dices.length; i++) {
    for (let j = i + 1; j < dices.length; j++) {
      if (dices[i].value === dices[j].value) {
        pairs.push([dices[i], dices[j]]);
      }
    }
  }
  return pairs;
};

const findBiggestPair = (pairs: IDice[][]): IDice[] => {
  let biggestPair = pairs[0];
  for (let i = 1; i < pairs.length; i++) {
    if (pairs[i][0].value > biggestPair[0].value) {
      biggestPair = pairs[i];
    }
  }
  return biggestPair;
};

const combinationCheck = (dices: IDice[], rolls: number) => {
  let workingCombinations: ICombination[] = [];
  if (dices.every((d) => d.value === 0)) return [];

  schoolCombinations.forEach((c) => {
    const amountOfNumber = dices.reduce(
      (acc, d) => (d.value === c.number ? acc + 1 : acc),
      0
    );
    if (amountOfNumber >= 3)
      workingCombinations.push({
        ...c,
        points: (amountOfNumber - 3) * c.number,
      });
  });
  combinations.forEach((c) => {
    switch (c.name) {
      case "Пара":
        {
          const pairs = findPairs(dices);
          if (pairs.length) {
            const biggestPair = findBiggestPair(pairs);
            workingCombinations.push({
              ...c,
              points: biggestPair[0].value * 2,
            });
          }
        }
        break;
      case "2 Пары":
        {
          /** @TODO Fix algorithm in case of 3 items = 2 pairs */
          let pairs = findPairs(dices);
          if (pairs.length > 1) {
            const biggestPair = findBiggestPair(pairs);
            const biggestPairIndex = pairs.findIndex(
              (pair) => pair[0].value == biggestPair[0].value
            );
            pairs.splice(biggestPairIndex, 1);
            const secondBiggestPair = findBiggestPair(pairs);
            workingCombinations.push({
              ...c,
              points: biggestPair[0].value * 2 + secondBiggestPair[0].value * 2,
            });
          }
        }
        break;
    }
  });
  if (rolls === 1) {
    workingCombinations = workingCombinations.map((c) => ({
      ...c,
      points: (c.points || 0) * 2,
    }));
  }
  // console.log(workingCombinations, rolls);
  return workingCombinations;
};

export { combinationCheck };
