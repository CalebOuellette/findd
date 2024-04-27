import React, { useEffect } from "react";
import { DD } from "@/components/dd";

export const TextStepBase: React.FC<{
  nextStepReady: boolean;
  setNextStepReady: (state: boolean) => void;
  goNext: () => void;
  text: string;
  duration: number;
}> = ({ text, duration, nextStepReady, setNextStepReady, goNext }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setNextStepReady(true);
    }, duration);
    return () => clearTimeout(timeout);
  }, [setNextStepReady, duration]);

  return (
    <div className="flex flex-col items-center gap-10" onClick={goNext}>
      <DD />
      <div className="whitespace-pre text-center">{text}</div>
      {nextStepReady && <div> Tap to continue</div>}
    </div>
  );
};
