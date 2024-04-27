import React, { useEffect } from "react";

export const Home = () => {
  const [connections, setConnections] = React.useState([]);

  useEffect(() => {
    const effect = async () => {
      const res = await fetch("/api/connections");
    };
    effect();
  }, []);

  return <div>Home</div>;
};
