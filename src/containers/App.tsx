import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Message } from "../components/Message";
import { Wrapper } from "../components/Wrapper";
import { UserAdd } from "../components/UserAdd";
import { DicesContainer } from "./DicesContainer";
import { TableContainer } from "./TableContainer";

import { IUser } from "../types/interfaces";
import { RollState } from "../types/enums";

export const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [rollState, setRollState] = useState<RollState>(RollState.Roll);
  const [users, setUsers] = useState<IUser[]>([]);
  const [lvl, setLvl] = useState(1);

  const onNext = () => {
    setUsers((u) => {
      const newUsers = [...u];
      const activeUserIndex = newUsers.findIndex((user) => user.active);
      newUsers[activeUserIndex].active = false;
      newUsers[(activeUserIndex + 1) % newUsers.length].active = true;
      if (activeUserIndex + (1 % newUsers.length) === 0) {
        setLvl((l) => l + 1);
      }
      return newUsers;
    });
    setRollState(RollState.Roll);
  };

  const countResults = () => {
    setUsers((u) => {
      const newUsers = [...u].map((user) => {
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
    });
  };

  useEffect(() => {
    if (lvl === 15) {
      console.log("GAME OVER");
      countResults();
    }
  }, [lvl]);

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
          />
          <Message>Ходит {users.find((u) => u.active)?.name}</Message>
        </>
      )}
      <TableContainer
        users={users}
        disabled={rollState !== RollState.Results}
      />
      <Message>
        <Button onClick={() => countResults()}>Закончить игру</Button>
      </Message>
    </Wrapper>
  );
};
