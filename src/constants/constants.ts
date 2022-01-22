import { IDice } from "../types/interfaces";

const defaultDices: IDice[] = [...new Array(6).fill(0)].map((_, i) => ({
  value: i + 1,
  saved: false,
}));

export { defaultDices };
