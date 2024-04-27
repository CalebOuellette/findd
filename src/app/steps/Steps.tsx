import React, { useMemo } from "react";

import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";
import { Step6 } from "./Step6";
import { useUser } from "@/contexts/UserContext";

const allSteps = [Step1, Step2, Step3, Step4, Step5, Step6];

export const Steps = () => {
  const userContext = useUser();
  const step = userContext.userObject.step;

  return (
    <div className="">
      {allSteps.map((Step, index) => {
        return (
          index === step && (
            <Step
              key={index}
              goNext={() =>
                userContext.setUserObject((user) => ({
                  ...user,
                  step: user.step + 1,
                }))
              }
            />
          )
        );
      })}
    </div>
  );
};
