import React, { useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { Chat } from "./Chat";
import { StepBase } from "@/app/steps/StepBase";

export type User = {
  distance: number;
  name: string;
  description: string;
  id: string;
};

export const Home = () => {
  const userContext = useUser();
  const [selectedChat, setSelectedChat] = React.useState<User | null>(null);
  const [connections, setConnections] = React.useState<User[]>([]);

  useEffect(() => {
    const effect = async () => {
      const res = await fetch("/api/connections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userContext.userObject.id }),
      });

      const data = (await res.json()) as {
        users: User[];
      };
      setConnections(data.users);
    };
    effect();
  }, []);

  if (selectedChat) {
    return <Chat connectionUser={selectedChat} />;
  }

  return (
    <StepBase>
      <div>We found three matches!</div>
      <div className="w-full flex flex-col gap-3">
        {connections.map((connection) => (
          <UserCard
            user={connection}
            key={connection.id}
            onClick={() => setSelectedChat(connection)}
          />
        ))}
      </div>
    </StepBase>
  );
};

export const UserCard = ({
  onClick,
  user,
  hideIcon = false,
}: {
  user: User;
  onClick?: () => void;
  hideIcon?: boolean;
}) => {
  return (
    <div
      className="w-full flex justify-between items-center cursor-pointer bg-neutral-100 p-3 rounded-[11px]"
      onClick={onClick}
    >
      <div>
        <div className="text-2xl capitalize">{user.name}</div>
        <div className="text-xs">{Math.round(user.distance * 100)}% match</div>
      </div>
      {!hideIcon && <MessageIcon />}
    </div>
  );
};

const MessageIcon = () => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 10.75C17 10.9489 16.921 11.1397 16.7803 11.2803C16.6397 11.421 16.4489 11.5 16.25 11.5H7.75C7.55109 11.5 7.36032 11.421 7.21967 11.2803C7.07902 11.1397 7 10.9489 7 10.75C7 10.5511 7.07902 10.3603 7.21967 10.2197C7.36032 10.079 7.55109 10 7.75 10H16.25C16.4489 10 16.6397 10.079 16.7803 10.2197C16.921 10.3603 17 10.5511 17 10.75ZM16.25 14H7.75C7.55109 14 7.36032 14.079 7.21967 14.2197C7.07902 14.3603 7 14.5511 7 14.75C7 14.9489 7.07902 15.1397 7.21967 15.2803C7.36032 15.421 7.55109 15.5 7.75 15.5H16.25C16.4489 15.5 16.6397 15.421 16.7803 15.2803C16.921 15.1397 17 14.9489 17 14.75C17 14.5511 16.921 14.3603 16.7803 14.2197C16.6397 14.079 16.4489 14 16.25 14ZM24.5 12.25C24.4964 15.4978 23.2046 18.6115 20.908 20.908C18.6115 23.2046 15.4978 24.4964 12.25 24.5H1.75C1.28587 24.5 0.840752 24.3156 0.512563 23.9874C0.184375 23.6592 0 23.2141 0 22.75V12.25C4.84124e-08 9.0011 1.29062 5.88526 3.58794 3.58794C5.88526 1.29062 9.0011 0 12.25 0C15.4989 0 18.6147 1.29062 20.9121 3.58794C23.2094 5.88526 24.5 9.0011 24.5 12.25ZM23 12.25C23 9.39892 21.8674 6.66462 19.8514 4.6486C17.8354 2.63259 15.1011 1.5 12.25 1.5C9.39892 1.5 6.66462 2.63259 4.6486 4.6486C2.63259 6.66462 1.5 9.39892 1.5 12.25V22.75C1.5 22.8163 1.52634 22.8799 1.57322 22.9268C1.62011 22.9737 1.6837 23 1.75 23H12.25C15.1001 22.9967 17.8324 21.863 19.8477 19.8477C21.863 17.8324 22.9967 15.1001 23 12.25Z"
        fill="black"
      />
    </svg>
  );
};
