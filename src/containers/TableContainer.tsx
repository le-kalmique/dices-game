import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { CombinationsTable } from "../components/Table";
import { IUser } from "../types/interfaces";

interface IProps {
  users: IUser[];
  disabled: boolean;
}

export const TableContainer: React.FC<IProps> = ({ users, disabled }) => {
  return (
    <div>
      <CombinationsTable users={users} disabled={disabled} />
    </div>
  );
};
