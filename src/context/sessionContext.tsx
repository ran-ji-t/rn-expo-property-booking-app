import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "../hooks/useStorageState";
import { login } from "../services/apiHandler";
import { logMessage } from "../helpers/logger";
import { LogLevel } from "../types/utils";
import { useAtom } from "jotai";
import { userAtom } from "../stores/userAtom";
import { deleteItem, setItem } from "../helpers/utils";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext<{
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => {},
  signOut: async () => {},
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [_, setUser] = useAtom(userAtom);
  const queryClient = useQueryClient();

  const signIn = async () => {
    try {
      const res = await login();
      const user = {
        email: res.email,
        id: res.id,
        name: res.name,
      };
      setUser(user);
      setItem(user);
    } catch (error) {
      logMessage(LogLevel.Error, "Unable to perform action");
    }
    setSession("xxx");
  };
  const signOut = async () => {
    try {
      await deleteItem();
      queryClient.invalidateQueries();
      setUser(undefined);
      setSession(null);
    } catch (error) {}
  };
  return (
    <AuthContext.Provider
      value={{
        signIn: async () => {
          await signIn();
        },
        signOut: async () => {
          await signOut();
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
