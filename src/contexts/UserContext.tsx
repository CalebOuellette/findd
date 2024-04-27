import React, { createContext, ReactNode, useEffect } from "react";

type UserObject = {
  name?: string;
  description?: string;
  id?: string;
  state: "new" | "created";
  step: number;
};

type CreatedUser = UserObject & {
  state: "created";
  name: string;
  description: string;
  id: string;
};

type User = UserObject | CreatedUser;

const UserContext = createContext({
  userObject: {
    state: "new",
  } as User,
  setUserObject: ((userObject: User) => {}) as React.Dispatch<
    React.SetStateAction<User>
  >,
  createUser: async () => {},
});

const existingUser = () =>
  localStorage &&
  localStorage.getItem("user") &&
  (JSON.parse(localStorage.getItem("user") as string) as UserObject);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userObject, setUserObject] = React.useState<User>(
    existingUser() || {
      state: "new",
      step: 0,
    }
  );

  const createUser = async () => {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    });
    const data = (await res.json()) as { user: CreatedUser };
    setUserObject({ ...data.user, state: "created" });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userObject));
  }, [userObject]);

  return (
    <UserContext.Provider value={{ userObject, setUserObject, createUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
