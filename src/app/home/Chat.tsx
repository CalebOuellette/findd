import React, { useState, useEffect } from "react";
import { useCompletion } from "ai/react";
import { useUser } from "@/contexts/UserContext";
import { DD } from "@/components/dd";
import { UserCard, User } from "./Home";
import { DdInput } from "@/components/input";

export const Chat = ({
  connectionUser,
  back,
}: {
  connectionUser: User;
  back: () => void;
}) => {
  const userContext = useUser();
  const DEBUG = false;
  const [intro, setIntro] = useState(!DEBUG);

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
    <div className="flex flex-col justify-between items-stretch gap-10 w-[400px]">
      <div className="flex items-center cursor-pointer" onClick={back}>
        <div className="p-3">
          <BackIcon />
        </div>
        <UserCard user={connectionUser} hideIcon />
      </div>
      {intro && (
        <>
          <div className="flex justify-center">
            <DD />
          </div>

          <div className="text-2xl text-center">
            Ready to start chatting? I’ll make introductions!
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
              setIntro(false);
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
      {!intro && (
        <div className="flex w-full flex-1 flex-col gap-3">
          <div className="flex flex-1">
            <div className="flex gap-2 flex-1">
              <DD tiny />
              <div className="w-full flex-1 font-light">
                {completion}
                {DEBUG && "hello world this is a dumb thing to test styling"}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <DdInput />
            </div>
            <button className="bg-neutral-950 text-neutral-100 w-20 p-2 font-light rounded-md text-2xl">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const BackIcon = () => {
  return (
    <svg
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.7501 10C23.7501 10.1989 23.6711 10.3897 23.5304 10.5304C23.3898 10.671 23.199 10.75 23.0001 10.75H2.81132L10.5301 18.47C10.6038 18.5387 10.6629 18.6215 10.7039 18.7135C10.7448 18.8055 10.7669 18.9048 10.7687 19.0055C10.7704 19.1062 10.7519 19.2062 10.7142 19.2996C10.6765 19.393 10.6203 19.4778 10.5491 19.5491C10.4779 19.6203 10.3931 19.6764 10.2997 19.7142C10.2063 19.7519 10.1063 19.7704 10.0056 19.7686C9.90485 19.7668 9.80553 19.7448 9.71353 19.7038C9.62153 19.6628 9.53873 19.6037 9.47007 19.53L0.470072 10.53C0.329622 10.3894 0.250732 10.1988 0.250732 10C0.250732 9.80128 0.329622 9.61066 0.470072 9.47003L9.47007 0.470029C9.61225 0.337549 9.80029 0.265426 9.99459 0.268855C10.1889 0.272283 10.3743 0.350995 10.5117 0.488408C10.6491 0.625821 10.7278 0.811206 10.7312 1.00551C10.7347 1.19981 10.6626 1.38785 10.5301 1.53003L2.81132 9.25003H23.0001C23.199 9.25003 23.3898 9.32905 23.5304 9.4697C23.6711 9.61035 23.7501 9.80112 23.7501 10Z"
        fill="black"
      />
    </svg>
  );
};
