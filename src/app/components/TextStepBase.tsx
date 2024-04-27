import React, { useEffect, useState } from "react";
import { StepBase } from "./StepBase";

export const TextStepBase: React.FC<{
  goNext: () => void;
  text: string;
  duration: number;
}> = ({ text, duration, goNext }) => {
  const [nextStepReady, setNextStepReady] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setNextStepReady(true);
    }, duration);
    return () => clearTimeout(timeout);
  }, [setNextStepReady, duration]);

  return (
    <div onClick={() => nextStepReady && goNext()}>
      <StepBase>
        <div className="whitespace-pre-wrap text-center text-xl text-neutral-700">
          {text}
        </div>
        {nextStepReady && <div> Tap to continue</div>}
      </StepBase>
    </div>
  );
};
