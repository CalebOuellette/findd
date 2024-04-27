import React from "react";
import { Steps } from "./steps/Steps";
import { Home } from "./home/Home";
import { useUser } from "@/contexts/UserContext";

export const Main = () => {
  const userContext = useUser();

  return (
    <div>
      {userContext.userObject.state === "new" && <Steps />}
      {userContext.userObject.state === "created" && <Home />}
    </div>
  );
};
