import React from "react";
import { StepBase } from "./StepBase";
import { useUser } from "@/contexts/UserContext";

export const Step6: React.FC<{
  goNext: () => void;
}> = (props) => {
  const userContext = useUser();

  return (
    <StepBase {...props}>
      <div className="whitespace-pre-wrap text-center text-xl text-neutral-700">
        Any tell us a little bit about you?
      </div>
      {JSON.stringify(userContext.userObject)}
      {userContext.userObject.description && (
        <div onClick={props.goNext}> Create</div>
      )}
    </StepBase>
  );
};
