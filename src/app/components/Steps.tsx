import React, { useMemo } from "react";

import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";

const allSteps = [Step1, Step2, Step3, Step4, Step5];

export const Steps = () => {
  const [step, setStep] = React.useState(3);

  return (
    <div className="max-w-64">
      {allSteps.map((Step, index) => {
        return (
          index === step && (
            <Step key={index} goNext={() => setStep(step + 1)} />
          )
        );
      })}
    </div>
  );
};
