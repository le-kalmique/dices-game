import React, { useMemo } from "react";
import { RollState } from "../../types/enums";
import styles from "./Dices.module.scss";

interface IProps {
  onRoll: () => void;
  onSave: () => void;
  state: RollState;
}

export const Dices: React.FC<IProps> = ({
  onRoll,
  onSave,
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
          <button
            className={styles.button}
            type="button"
            onClick={() => onRoll()}
          >
            Roll
          </button>
        )}
        {state === RollState.Choose && (
          <button
            className={styles.button}
            type="button"
            onClick={() => onSave()}
          >
            Save
          </button>
        )}
        {state === RollState.Results && (
          <button
            className={styles.button}
            type="button"
            onClick={() => onSave()}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
