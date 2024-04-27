import React, { createContext, ReactNode } from "react";

type UserObject = {
  name?: string;
  description?: string;
  id?: string;
  state: "new" | "created";
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
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userObject, setUserObject] = React.useState<User>({
    state: "new",
  });

  return (
    <UserContext.Provider value={{ userObject, setUserObject }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
