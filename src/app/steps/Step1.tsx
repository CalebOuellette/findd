import React from "react";
import { TextStepBase } from "./TextStepBase";

export const Step1: React.FC<{
  goNext: () => void;
}> = (props) => {
  return (
    <TextStepBase
      {...props}
      text={`Hello,

Would you like to meet someone? 

Someone just like you?`}
      duration={1000}
    />
  );
};
