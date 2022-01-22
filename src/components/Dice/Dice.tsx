import React, { useEffect, useRef } from "react";
import DiceComponent from "react-dice-roll";
import classnames from "classnames/bind";
import styles from "./Dice.module.scss";
import { RollState } from "../../types/enums";

interface IProps {
  state: RollState;
  onRoll: (result: number) => void;
  onSave: (saved: boolean) => void;
  saved?: boolean;
  disabled?: boolean;
  triggerRoll?: boolean;
}

const cn = classnames.bind(styles);
export const Dice: React.FC<IProps> = ({ onRoll, disabled, ...props }) => {
  const ref = useRef(null);
  const className = cn(styles.container, {
    [styles.disabled]: disabled,
    [styles.saving]: props.state === RollState.Choose,
    [styles.saved]: props.saved,
    [styles.final]: props.state === RollState.Results,
  });

  const firstTime = useRef(true);
  useEffect(() => {
    if (!disabled && !props.saved && !firstTime.current) {
      // @ts-ignore
      ref.current?.rollDice();
    }
    firstTime.current = false;
  }, [props.triggerRoll]);

  const onClick = () => {
    switch (props.state) {
      case RollState.Roll:
        break;
      case RollState.Choose:
        props.onSave(!props.saved);
        break;
    }
  };

  return (
    <div className={className} onClick={onClick}>
      <DiceComponent
        ref={ref}
        onRoll={onRoll}
        disabled={disabled || props.saved}
        size={100}
      />
    </div>
  );
};
