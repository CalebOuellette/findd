import React from "react";
import { TextStepBase } from "./TextStepBase";

export const Step3: React.FC<{
  nextStepReady: boolean;
  setNextStepReady: (state: boolean) => void;
  goNext: () => void;
}> = (props) => {
  return (
    <TextStepBase
      {...props}
      text={`But before i get start...

      I need to know some things about you!
      
      Let’s start with something easy.
      `}
      duration={2000}
    />
  );
};
