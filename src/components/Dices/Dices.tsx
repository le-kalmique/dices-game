import React, { useMemo } from "react";
import { ToggleButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { RollState } from "../../types/enums";
import styles from "./Dices.module.scss";

interface IProps {
  onRoll: () => void;
  onSave: () => void;
  onNext: () => void;
  onStop: () => void;
  state: RollState;
}

export const Dices: React.FC<IProps> = ({
  onRoll,
  onSave,
  onNext,
  onStop,
  state,
  children,
}) => {
  const message = useMemo(() => {
    switch (state) {
      case RollState.Roll:
        return "Бросай кубики";
      case RollState.Choose:
        return "Выбери, какие кубики оставить";
      case RollState.Results:
        return "Выбери, какое поле закрыть";
    }
  }, [state]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>{message}</div>
        {children}
      </div>
      <div className={styles.buttonsContainer}>
        {state === RollState.Roll && (
          <Button variant="outline-primary" onClick={() => onRoll()}>
            Roll
          </Button>
        )}
        {state === RollState.Choose && (
          <>
            <Button variant="outline-primary" onClick={() => onSave()}>
              Save
            </Button>
            <Button variant="outline-secondary" onClick={() => onStop()}>
              Stop
            </Button>
          </>
        )}
        {state === RollState.Results && (
          <Button variant="outline-primary" onClick={() => onNext()}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};
