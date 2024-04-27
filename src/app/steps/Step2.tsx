import React from "react";
import { TextStepBase } from "./TextStepBase";

export const Step2: React.FC<{
  goNext: () => void;
}> = (props) => {
  return (
    <TextStepBase
      {...props}
      text={`Welcome to findd

My name is dd. 
      
I help connect people.
      `}
      duration={1000}
    />
  );
};
