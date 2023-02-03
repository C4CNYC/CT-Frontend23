import {
  createContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from "react";
// utils
import axios from "../utils/axios";
import localStorageAvailable from "../utils/localStorageAvailable";
//
import { isValidToken, setSession } from "./utils";
import {
  ActionMapType,
  AuthStateType,
  AuthUserType,
  JWTContextType,
} from "./types";
import { useDispatch } from "react-redux";
import { cleanUser, setUser } from "src/redux/slices/global";

// ----------------------------------------------------------------------

enum Types {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
  AUTHENTICATE = "AUTHENTICATE",
}

type Payload = {
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
  [Types.AUTHENTICATE]: {};
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
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

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const reduxDispatch = useDispatch();

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable
        ? localStorage.getItem("accessToken")
        : "";

      const tenantName = localStorage.getItem("tenantName");

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken, tenantName);

        const response = await axios.get("/auth/profile");

        const user = response.data;
        reduxDispatch(setUser(user));

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user,
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
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // AUTHENTICATE
  const authenticate = () => {
    dispatch({
      type: Types.AUTHENTICATE,
      payload: {},
    });
  };

  // LOGIN
  const login = useCallback(
    async (email: string, password: string, tenantName: string) => {
      localStorage.setItem("tenantName", tenantName);
      // Update <any, any> to normall types
      const { data } = await axios.post<any, any>("auth/signin", {
        email,
        password,
      });

      const { access_token, user } = data;
      reduxDispatch(setUser(user));

      setSession(access_token, localStorage.getItem("tenantName"));

      dispatch({
        type: Types.LOGIN,
        payload: {
          user,
        },
      });
    },
    []
  );

  // REGISTER
  const register = useCallback(
    async (
      email: string,
      password: string,
      firstName: string,
      lastName: string,
      tenantName: string
    ) => {
      const { data: tenant } = await axios.post("/tenant", {
        name: tenantName,
      });
      localStorage.setItem("tenantName", tenantName);

      const { data } = await axios.post("/auth/signup", {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });

      const { access_token, user } = data;
      reduxDispatch(setUser(user));

      localStorage.setItem("accessToken", access_token);

      dispatch({
        type: Types.REGISTER,
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
      loginWithGoogle: () => {},
      loginWithGithub: () => {},
      loginWithTwitter: () => {},
      register,
      logout,
    }),
    [
      state.isAuthenticated,
      state.isInitialized,
      state.user,
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
