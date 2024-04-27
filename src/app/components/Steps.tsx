import React, { useMemo } from "react";

import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";

export const Steps = () => {
  const [step, setStep] = React.useState(0);
  const [nextStepReady, setNextStepReady] = React.useState(false);

  return (
    <div>
      {step === 0 && (
        <Step1
          nextStepReady={nextStepReady}
          setNextStepReady={setNextStepReady}
          goNext={() => setStep(step + 1)}
        />
      )}
      {step === 1 && (
        <Step2
          nextStepReady={nextStepReady}
          setNextStepReady={setNextStepReady}
          goNext={() => setStep(step + 1)}
        />
      )}
      {step === 2 && (
        <Step3
          nextStepReady={nextStepReady}
          setNextStepReady={setNextStepReady}
          goNext={() => setStep(step + 1)}
        />
      )}
    </div>
  );
};
