import React, { createContext, ReactNode, useEffect } from "react";
import { nanoid } from "nanoid";

type UserObject = {
  name?: string;
  description?: string;
  id: string;
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
  createUser: (async () => {}) as unknown as (
    user: UserObject
  ) => Promise<CreatedUser>,
});

const existingUser = () =>
  localStorage.getItem("user") &&
  (JSON.parse(localStorage.getItem("user") as string) as UserObject);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userObject, setUserObject] = React.useState<User>(
    existingUser() || {
      state: "new",
      id: nanoid(),
      step: 0,
    }
  );

  const createUser = async (user: UserObject): Promise<CreatedUser> => {
    // todo validate user info.
    const res = await fetch("/api/hello");
    const data = (await res.json()) as CreatedUser;
    setUserObject(data);
    return data;
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
