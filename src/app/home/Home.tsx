import React, { useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
type User = { distance: number; name: string; description: string };

export const Home = () => {
  const userContext = useUser();
  const [connections, setConnections] = React.useState<User[]>([]);

  useEffect(() => {
    const effect = async () => {
      console.log(userContext.userObject);
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

  return (
    <div>
      {connections.map((connection) => (
        <div key={connection.name}>{connection.name}</div>
      ))}
    </div>
  );
};
