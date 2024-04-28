import React from "react";
import { StepBase } from "./StepBase";
import { DdTextArea } from "@/components/input";
import { useUser } from "@/contexts/UserContext";
import styles from "./animations.module.css";

export const Step5: React.FC<{
  goNext: () => void;
}> = (props) => {
  const userContext = useUser();

  return (
    <StepBase {...props}>
      <div className="whitespace-pre-wrap text-center text-xl text-neutral-700">
        {`Now the hard part... tell me a bit about you? 
        
Try to go into detail about what you like, what you do, and what you are looking for.`}
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
        <div
          onClick={props.goNext}
          className={"text-neutral-400" + " " + styles.fadeIn}
        >
          (Tap to continue)
        </div>
      )}
    </StepBase>
  );
};
