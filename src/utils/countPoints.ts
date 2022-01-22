import { IUser } from "../types/interfaces";

const countPoints = (users: IUser[]) => {
  const newUsers = [...users].map((user) => {
    let schoolResult = 0;
    let result = user.combinations.reduce((acc, v) => {
      //@ts-ignore
      if (v.number) {
        //@ts-ignore
        schoolResult += v.points;
        return acc;
      } else {
        return acc + (v.points || 0);
      }
    }, 0);
    if (schoolResult >= 0) {
      result += schoolResult;
    } else {
      result -= 50;
    }
    return {
      ...user,
      result,
    };
  });
  return newUsers;
};

export { countPoints };
