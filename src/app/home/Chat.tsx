import React, { useState, useEffect } from "react";
import { useCompletion } from "ai/react";
import { useUser } from "@/contexts/UserContext";
import { DD } from "@/components/dd";
import { UserCard, User } from "./Home";

export const Chat = ({ connectionUser }: { connectionUser: User }) => {
  const userContext = useUser();
  const [intro, setIntro] = useState(true);

  const { completion, handleSubmit, isLoading, setInput } = useCompletion({
    api: "/api/intro",
    body: {
      connectionUserId: connectionUser.id,
      id: userContext.userObject.id,
    },
  });

  useEffect(() => {
    // need this to make completion thing work
    setInput("hello world");
  }, []);

  return (
    <div className="flex flex-col justify-between items-center gap-10 w-64">
      <UserCard user={connectionUser} hideIcon />
      {intro && (
        <>
          <DD />
          <div className="text-2xl text-center">
            Ready to start chatting? I’ll make introductions!
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
              //setIntro(false);
            }}
            className="w-full"
          >
            <button
              disabled={isLoading}
              className="bg-neutral-950 text-neutral-100 w-full p-3 rounded-md text-2xl"
              type="submit"
            >
              Start
            </button>
          </form>
        </>
      )}
      {completion}
    </div>
  );
};
