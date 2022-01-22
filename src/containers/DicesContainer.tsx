import React, { useEffect, useState } from "react";

import { Dice } from "../components/Dice";
import { Dices } from "../components/Dices";

import { defaultDices } from "../constants";
import { RollState } from "../types/enums";
import { IDice } from "../types/interfaces";

export const DicesContainer: React.FC = () => {
  const [state, setState] = useState(RollState.Roll);
  const [dices, setDices] = useState<IDice[]>(defaultDices);
  const [rollAllTrigger, setRollAllTrigger] = useState(false);
  const [rollAmount, setRollAmount] = useState(0);

  useEffect(() => {
    switch (state) {
      case RollState.Roll:
        setDices((d) => d.map((dice) => ({ ...dice, disabled: false })));
        break;
      case RollState.Choose:
        setDices((d) => d.map((dice) => ({ ...dice, disabled: true })));
        break;
      case RollState.Results:
        setDices((d) =>
          d.map(() => ({ value: 0, saved: false, disabled: true }))
        );
    }
  }, [state]);

  useEffect(() => {
    if (rollAmount === 3) {
      setState(RollState.Results);
    }
  }, [rollAmount]);

  useEffect(() => {
    if (
      state === RollState.Roll &&
      dices.every((dice) => dice.disabled || dice.saved)
    ) {
      setRollAmount((amount) => amount + 1);
      setState(RollState.Choose);
    }
  }, [dices]);

  const onRollDice = (index: number, value: number) => {
    setDices((prevDices) => {
      const newDices = [...prevDices];
      newDices[index] = {
        value,
        disabled: true,
      };
      return newDices;
    });
  };
  const onSaveDice = (index: number, saved: boolean) => {
    setDices((prevDices) => {
      const newDices = [...prevDices];
      newDices[index] = {
        ...newDices[index],
        saved,
      };
      return newDices;
    });
  };

  return (
    <Dices
      state={state}
      onRoll={() => setRollAllTrigger(!rollAllTrigger)}
      onSave={() => setState(RollState.Roll)}
    >
      {dices.map((dice, i) => (
        <Dice
          key={i}
          state={state}
          onRoll={(res) => onRollDice(i, res)}
          onSave={(saved) => onSaveDice(i, saved)}
          disabled={dice.disabled}
          saved={dice.saved}
          triggerRoll={rollAllTrigger}
        />
      ))}
    </Dices>
  );
};
