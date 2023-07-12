import { useContext } from "react";

//
import { AuthContext } from "./JwtContext";
import { JWTContextType } from "./types";

// ----------------------------------------------------------------------

export const useAuthContext = (): JWTContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext context must be use inside AuthProvider");
  }

  return context;
};
