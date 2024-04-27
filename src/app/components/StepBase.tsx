import React, { ReactNode } from "react";
import { DD } from "@/components/dd";

export const StepBase: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div className="flex flex-col items-center gap-10">
      <DD />
      {children}
    </div>
  );
};
