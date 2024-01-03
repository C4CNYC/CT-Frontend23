import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { useDispatch } from "react-redux";

import { axios, localStorageAvailable, voidFunction } from "@utils";
import { Role } from "src/redux/services/enums/role.enum";
import { cleanUser, cleanUserRole, setUser } from "src/redux/slices/global";

import {
  ActionMapType,
  AuthStateType,
  AuthUserType,
  JWTContextType,
} from "./types";
import { isValidToken, setSession } from "./utils";

// ----------------------------------------------------------------------

enum Types {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  REGISTER_TO_ORGANIZATION = "REGISTER_TO_ORGANIZATION",
  LOGOUT = "LOGOUT",
  AUTHENTICATE = "AUTHENTICATE",
}

interface Payload {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.REGISTER_TO_ORGANIZATION]: {
    user: AuthUserType;
  };
  [Types.AUTHENTICATE]: Record<string, unknown>;
  [Types.LOGOUT]: undefined;
}

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType): AuthStateType => {
  switch (action.type) {
    case Types.INITIAL:
      return {
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    case Types.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case Types.REGISTER:
      return {
        ...state,
        user: action.payload.user,
      };
    case Types.REGISTER_TO_ORGANIZATION:
      return {
        ...state,
        user: action.payload.user,
      };
    case Types.AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: true,
      };
    case Types.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps): React.ReactElement | null {
  const [state, dispatch] = useReducer(reducer, initialState);
  const reduxDispatch = useDispatch();
  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable
        ? localStorage.getItem("accessToken")
        : "";

      const tenantName = localStorage.getItem("tenantName") ?? "codetribe";
      const isManagerRoute = window.location.pathname.includes("manager/");

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken, tenantName);
        const { data } = await axios.get("/auth/profile");

        if (isManagerRoute && data.role === Role.Student) {
          window.location.pathname = "/permission-denied";
        }
        reduxDispatch(setUser(data));

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user: data,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize().catch(() => {
      voidFunction();
    });
  }, [initialize]);

  // AUTHENTICATE
  const authenticate = (): void => {
    dispatch({
      type: Types.AUTHENTICATE,
      payload: {},
    });
  };

  // LOGIN
  const login = useCallback(
    async (email: string, password: string, tenantName: string) => {
      try {
        localStorage.setItem("tenantName", tenantName);
        const { data } = await axios.post<any, any>("auth/signin", {
          email,
          password,
        });

        const { access_token: accessToken, user } = data;
        reduxDispatch(setUser(user));
        setSession(
          accessToken,
          localStorage.getItem("tenantName") ?? "codetribe"
        );

        dispatch({
          type: Types.LOGIN,
          payload: {
            user,
          },
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    []
  );

  // LOGIN WITH GOOGLE
  const loginWithGoogle = async (token: string) => {
    const { data } = await axios.post<any, any>("auth/google-signin", {
      auth_token: token,
    });

    const { access_token: accessToken, user } = data;
    reduxDispatch(setUser(user));
    setSession(accessToken, localStorage.getItem("tenantName") ?? "codetribe");

    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    });
  };

  // Register WITH GOOGLE
  const registerWithGoogle = async (token: string, role: Role) => {
    try {
      const { data } = await axios.post<any, any>("auth/google-signup", {
        auth_token: token,
        role
      });

      const { access_token: accessToken, user } = data;
      reduxDispatch(setUser(user));
      setSession(
        accessToken,
        localStorage.getItem("tenantName") ?? "codetribe"
      );

      dispatch({
        type: Types.REGISTER,
        payload: {
          user,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // REGISTER
  const register = useCallback(
    async ({
      email,
      password,
      firstName,
      lastName,
      emojiAvatar,
      role,
      tenantName,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      emojiAvatar?: string;
      role: Role;
      tenantName?: string;
    }) => {
      if (tenantName) {
        await axios.post("/tenant", {
          name: tenantName,
        });
        localStorage.setItem("tenantName", tenantName);
      }
      const { data } = await axios.post("/auth/signup", {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        role,
        emojiAvatar,
      });

      const { access_token: accessToken, user } = data;
      reduxDispatch(setUser(user));

      localStorage.setItem("accessToken", accessToken);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user,
        },
      });
    },
    []
  );

  const registerToOrganization = useCallback(
    async (
      email: string,
      password: string,
      firstName: string,
      lastName: string
    ) => {
      const { data } = await axios.post("/auth/signup", {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });
      const { access_token: accessToken, user } = data;
      reduxDispatch(setUser(user));

      localStorage.setItem("accessToken", accessToken);

      dispatch({
        type: Types.REGISTER_TO_ORGANIZATION,
        payload: {
          user,
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null, null);
    reduxDispatch(cleanUser());
    reduxDispatch(cleanUserRole());
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: "jwt",
      login,
      authenticate,
      loginWithGoogle,
      registerWithGoogle,
      loginWithGithub: voidFunction,
      loginWithTwitter: voidFunction,
      register,
      registerToOrganization,
      logout,
    }),
    [
      state.isAuthenticated,
      state.isInitialized,
      state.user,
      registerWithGoogle,
      loginWithGoogle,
      authenticate,
      login,
      logout,
      register,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
