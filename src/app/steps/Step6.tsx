import React, { useState } from "react";
import { StepBase } from "./StepBase";
import { useUser } from "@/contexts/UserContext";

export const Step6: React.FC<{
  goNext: () => void;
}> = (props) => {
  const userContext = useUser();
  const [loading, setLoading] = useState(false);

  const create = async () => {
    setLoading(true);
    await userContext.createUser();
    props.goNext();
  };

  return (
    <StepBase {...props}>
      <div className="whitespace-pre-wrap text-center text-xl text-neutral-700"></div>
      Name: {userContext.userObject.name}
      <br />
      <br />
      Description: {userContext.userObject.description}
      {userContext.userObject.description && (
        <button
          className="bg-neutral-950 text-center text-neutral-100 w-full p-3 rounded-md text-2xl cursor-pointer"
          onClick={create}
          disabled={loading}
        >
          {loading ? "loading..." : "Create"}
        </button>
      )}
    </StepBase>
  );
};
