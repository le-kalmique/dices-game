import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import styles from "./UserAdd.module.scss";

interface IProps {
  onUserAdded: (user: string) => void;
  onRemoveAll: () => void;
}

export const UserAdd: React.FC<IProps> = ({ onUserAdded, onRemoveAll }) => {
  const [value, setValue] = useState("");
  const onAdd = () => {
    onUserAdded(value);
    setValue("");
  };
  return (
    <div className={styles.container}>
      <Form.Control
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Имя игрока"
        onKeyPress={(e) => e.key === "Enter" && onAdd()}
      />
      <div className={styles.container__buttons}>
        <Button variant="outline-primary" onClick={onAdd} size="sm">
          Добавить игрока
        </Button>
        <Button variant="outline-primary" onClick={onRemoveAll} size="sm">
          Удалить всех игроков
        </Button>
      </div>
    </div>
  );
};
