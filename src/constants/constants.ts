import { ICombination, IDice, ISchoolCombination } from "../types/interfaces";

const defaultDices: IDice[] = [...new Array(5).fill(0)].map((_, i) => ({
  value: i + 1,
  saved: false,
}));

const schoolCombinations: ISchoolCombination[] = [...new Array(6).fill(0)].map(
  (_, i) => ({ name: `${i + 1}`, number: i + 1 })
);

const combinations: ICombination[] = [
  { name: "Пара", points: 2 },
  { name: "2 Пары", points: 2 },
  { name: "3 Одинаковых", points: 2 },
  { name: "4 Одинаковых", points: 2 },
  { name: "Маленькая дорожка", points: 2 },
  { name: "Большая дорожка", points: 2 },
  { name: "3 и 2", points: 2 },
  { name: "Шанс", points: 2 },
  { name: "Покер", points: 2 },
];

export { defaultDices, schoolCombinations, combinations };
