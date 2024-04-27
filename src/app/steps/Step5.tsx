import React from "react";
import { StepBase } from "./StepBase";
import { DdTextArea } from "@/components/input";
import { useUser } from "@/contexts/UserContext";

export const Step5: React.FC<{
  goNext: () => void;
}> = (props) => {
  const userContext = useUser();

  return (
    <StepBase {...props}>
      <div className="whitespace-pre-wrap text-center text-xl text-neutral-700">
        Any tell us a little bit about you?
      </div>
      <DdTextArea
        placeholder="I am..."
        value={userContext.userObject.description}
        onChange={(e) => {
          userContext.setUserObject((user) => ({
            ...user,
            description: e.target.value,
          }));
        }}
      />
      {userContext.userObject.description && (
        <div onClick={props.goNext}> Tap to continue</div>
      )}
    </StepBase>
  );
};
