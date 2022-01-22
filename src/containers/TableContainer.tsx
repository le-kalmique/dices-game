import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { CombinationsTable } from "../components/Table";
import { ICombination, IUser } from "../types/interfaces";

interface IProps {
  users: IUser[];
  disabled: boolean;
  workingCombinations?: ICombination[];
}

export const TableContainer: React.FC<IProps> = ({
  users,
  disabled,
  workingCombinations,
}) => {
  return (
    <div>
      <CombinationsTable
        users={users}
        disabled={disabled}
        workingCombinations={workingCombinations}
      />
    </div>
  );
};
