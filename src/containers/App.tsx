import React from "react";
import { Wrapper } from "../components/Wrapper";
import { RollState } from "../types/enums";
import { DicesContainer } from "./DicesContainer";

export const App: React.FC = () => {
  return (
    <Wrapper>
      <DicesContainer />
    </Wrapper>
  );
};
