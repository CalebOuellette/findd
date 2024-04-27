import React from "react";
import { TextStepBase } from "./TextStepBase";

export const Step3: React.FC<{
  goNext: () => void;
}> = (props) => {
  return (
    <TextStepBase
      {...props}
      text={`But before I get start...

I need to understand you!

Let’s start with something easy.
      `}
      duration={1000}
    />
  );
};
