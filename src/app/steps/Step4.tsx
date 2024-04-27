import React from "react";
import { StepBase } from "./StepBase";
import { DdInput } from "@/components/input";
import { useUser } from "@/contexts/UserContext";

export const Step4: React.FC<{
  goNext: () => void;
}> = (props) => {
  const userContext = useUser();

  return (
    <StepBase {...props}>
      <div className="whitespace-pre-wrap text-center text-xl text-neutral-700">
        What is your name?
      </div>
      <DdInput
        placeholder="Caleb"
        value={userContext.userObject.name}
        onChange={(e) => {
          userContext.setUserObject((user) => ({
            ...user,
            name: e.target.value,
          }));
        }}
      />
      {userContext.userObject.name && (
        <div onClick={props.goNext}> Tap to continue</div>
      )}
    </StepBase>
  );
};
