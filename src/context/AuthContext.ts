import { Session } from "@supabase/supabase-js";
import { createContext, Dispatch, SetStateAction } from "react";

type AuthContextType = {
  session: Session | null;
  authorized: boolean;
  loading: boolean;

  setSession: Dispatch<SetStateAction<Session | null>>;
  setAuthorized: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
  authorized: false,
  loading: true,

  setSession: () => {},
  setAuthorized: () => {},
  setLoading: () => {},
});
