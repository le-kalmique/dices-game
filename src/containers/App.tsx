import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Message } from "../components/Message";
import { Wrapper } from "../components/Wrapper";
import { UserAdd } from "../components/UserAdd";
import { DicesContainer } from "./DicesContainer";
import { TableContainer } from "./TableContainer";

import { ICombination, IUser } from "../types/interfaces";
import { RollState } from "../types/enums";
import { countPoints } from "../utils";
import { combinationCheck } from "../utils/combinationCheck";

export const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [rollState, setRollState] = useState<RollState>(RollState.Roll);
  const [users, setUsers] = useState<IUser[]>([]);
  const [lvl, setLvl] = useState(1);
  const [rolls, setRolls] = useState(0);
  const [workingCombinations, setWorkingCombinations] = useState<
    ICombination[]
  >([]);

  const onNext = () => {
    setUsers(() => {
      const newUsers = [...users];
      const activeUserIndex = newUsers.findIndex((user) => user.active);
      newUsers[activeUserIndex] = {
        ...newUsers[activeUserIndex],
        active: false,
      };
      newUsers[(activeUserIndex + 1) % newUsers.length] = {
        ...newUsers[(activeUserIndex + 1) % newUsers.length],
        active: true,
      };
      if ((activeUserIndex + 1) % newUsers.length === 0) {
        setLvl((l) => l + 1);
      }
      console.log(
        activeUserIndex,
        (activeUserIndex + 1) % newUsers.length,
        newUsers
      );

      return newUsers;
    });
    setRollState(RollState.Roll);
  };

  useEffect(() => {
    if (lvl === 15) {
      countResults();
    }
  }, [lvl]);

  const countResults = () => {
    setUsers((u) => countPoints(u));
    setGameStarted(false);
  };

  return (
    <Wrapper>
      {!gameStarted && (
        <>
          <Message>
            <div>Добавьте игроков в таблицу и начните игру</div>
            <Button size="lg" onClick={() => setGameStarted(true)}>
              Начать игру
            </Button>
          </Message>
          <UserAdd
            onRemoveAll={() => setUsers([])}
            onUserAdded={(name) =>
              setUsers((u) => [
                ...u,
                {
                  name,
                  id: u.length,
                  combinations: [],
                  active: u.length === 0,
                },
              ])
            }
          />
        </>
      )}
      {gameStarted && (
        <>
          <DicesContainer
            state={rollState}
            setState={setRollState}
            onNext={onNext}
            onDicesChanged={(dices) =>
              setWorkingCombinations(combinationCheck(dices, rolls))
            }
            rolls={rolls}
            setRolls={setRolls}
          />
          <Message>Ходит {users.find((u) => u.active)?.name}</Message>
        </>
      )}
      <TableContainer
        users={users}
        disabled={rollState !== RollState.Results}
        workingCombinations={workingCombinations}
      />
      <Message>
        <Button onClick={() => countResults()}>Закончить игру</Button>
      </Message>
    </Wrapper>
  );
};
