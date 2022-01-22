import React from "react";
import Table from "react-bootstrap/Table";
import { combinations, schoolCombinations } from "../../constants";
import { ICombination, IUser } from "../../types/interfaces";

import styles from "./CombinationsTable.module.scss";

interface IProps {
  users: IUser[];
  disabled?: boolean;
}

export const CombinationsTable: React.FC<IProps> = ({ users, disabled }) => {
  const onChange = (
    user: IUser,
    value: number | string,
    combination: ICombination
  ) => {
    const existingCombinationIndex = user.combinations.findIndex((c) => {
      return c.name === combination.name;
    });
    if (existingCombinationIndex !== -1) {
      user.combinations[existingCombinationIndex].points = Number(value);
    } else {
      user.combinations.push({
        name: combination.name,
        points: Number(value),
        //@ts-ignore
        number: combination.number,
      });
    }
  };
  return (
    <div className={styles.container}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Комбинация</th>
            {users.map((user) => (
              <th>{user.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={users.length + 1}>Школа</td>
          </tr>
          {schoolCombinations.map((c) => (
            <tr>
              <th>{c.name}</th>
              {users.map((user) => (
                <td>
                  <input
                    type="number"
                    min={-3 * c.number}
                    max={2 * c.number}
                    step={c.number}
                    disabled={disabled || !user.active}
                    onChange={(e) => onChange(user, e.target.value, c)}
                  />
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td colSpan={users.length + 1}></td>
            {/* <td>Сумма:</td>
            {users.map((user) => (
              <td>
                {user.combinations.reduce((acc, v) => acc + (v.points || 0), 0)}
              </td>
            ))} */}
          </tr>
          {combinations.map((c) => (
            <tr>
              <th>{c.name}</th>
              {users.map((user) => (
                <td>
                  <input
                    type="number"
                    disabled={disabled || !user.active}
                    onChange={(e) => onChange(user, e.target.value, c)}
                  />
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td />
          </tr>
          <tr>
            <th>Результат:</th>
            {users.map((user) => (
              <td>{user.result}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
