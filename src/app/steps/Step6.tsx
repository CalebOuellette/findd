import React from "react";
import { StepBase } from "./StepBase";
import { useUser } from "@/contexts/UserContext";

export const Step6: React.FC<{
  goNext: () => void;
}> = (props) => {
  const userContext = useUser();

  const create = async () => {
    await userContext.createUser();
    props.goNext();
  };

  return (
    <StepBase {...props}>
      <div className="whitespace-pre-wrap text-center text-xl text-neutral-700"></div>

      {userContext.userObject.description && (
        <div className="cursor-pointer" onClick={create}>
          {" "}
          Create
        </div>
      )}
    </StepBase>
  );
};
