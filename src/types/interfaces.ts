interface IDice {
  value: number;
  disabled?: boolean;
  saved?: boolean;
}

interface IUser {
  id: number;
  name: string;
  combinations: (ICombination | ISchoolCombination)[];
  active?: boolean;
  result?: number;
}

interface ICombination {
  name: string;
  points?: number;
}

interface ISchoolCombination extends ICombination {
  number: number;
}

export type { IDice, IUser, ICombination, ISchoolCombination };
