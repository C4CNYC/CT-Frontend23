import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
// utils
import { axios, voidFunction } from "@ct-nx/utils";
// routes
import { PATH_AUTH } from "../routes/paths";
// config
import { COGNITO_API } from "../config-global";
//
import {
  ActionMapType,
  AuthStateType,
  AuthUserType,
  AWSCognitoContextType,
} from "./types";

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  AUTH = "AUTH",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
}

interface Payload {
  [Types.AUTH]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
}

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

type UserAttributeType = Record<string, string>;

const reducer = (state: AuthStateType, action: ActionsType): AuthStateType => {
  if (action.type === Types.AUTH) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<AWSCognitoContextType | null>(null);

// ----------------------------------------------------------------------

const userPool = new CognitoUserPool({
  UserPoolId: COGNITO_API.userPoolId ?? "",
  ClientId: COGNITO_API.clientId ?? "",
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps): React.ReactElement {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getUserAttributes = useCallback(
    async (currentUser: CognitoUser): Promise<UserAttributeType> =>
      await new Promise((resolve, reject) => {
        currentUser.getUserAttributes((error, attributes) => {
          if (error) {
            reject(error);
          } else {
            const results: UserAttributeType = {};

            attributes?.forEach((attribute) => {
              results[attribute.Name] = attribute.Value;
            });

            resolve(results);
          }
        });
      }),
    []
  );

  const getSession = useCallback(
    async () =>
      await new Promise((resolve, reject) => {
        const cognitoUser = userPool.getCurrentUser();

        if (cognitoUser) {
          cognitoUser.getSession(
            async (error: Error | null, session: CognitoUserSession | null) => {
              if (error) {
                reject(error);
              }
              const attributes = await getUserAttributes(cognitoUser);

              const token = session?.getIdToken().getJwtToken();

              // use the token or Bearer depend on the wait BE handle, by default amplify API only need to token.
              axios.defaults.headers.common.Authorization = token as string;

              resolve({
                cognitoUser,
                session,
                headers: {
                  Authorization: token,
                },
              });

              dispatch({
                type: Types.AUTH,
                payload: {
                  isAuthenticated: true,
                  user: {
                    ...cognitoUser,
                    ...attributes,
                    displayName: attributes.name,
                    role: "admin",
                  },
                },
              });
            }
          );
        } else {
          dispatch({
            type: Types.AUTH,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      }),
    [getUserAttributes]
  );

  const initialize = useCallback(async () => {
    try {
      await getSession();
    } catch {
      dispatch({
        type: Types.AUTH,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [getSession]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // We make sure to handle the user update here, but return the resolve value in order for our components to be
  // able to chain additional `.then()` logic. Additionally, we `.catch` the error and "enhance it" by providing
  // a message that our React components can use.

  // LOGIN
  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      await new Promise((resolve, reject) => {
        const userData = new CognitoUser({
          Username: email,
          Pool: userPool,
        });

        const authDetails = new AuthenticationDetails({
          Username: email,
          Password: password,
        });

        userData.authenticateUser(authDetails, {
          onSuccess: (result): void => {
            getSession();
            resolve(result);
          },
          onFailure: (error): void => {
            reject(error);
          },
        });
      });
    },
    [getSession]
  );

  // REGISTER
  const register = useCallback(
    async (
      email: string,
      password: string,
      firstName: string,
      lastName: string
    ) =>
      await new Promise((resolve, reject) => {
        const newAttributes = [
          new CognitoUserAttribute({
            Name: "email",
            Value: email,
          }),
          new CognitoUserAttribute({
            Name: "name",
            Value: `${firstName} ${lastName}`,
          }),
        ];

        userPool.signUp(
          email,
          password,
          newAttributes,
          [],
          async (error): Promise<void> => {
            if (error) {
              reject(error);
              return;
            }

            resolve(undefined);
            window.location.href = PATH_AUTH.login;
          }
        );
      }),
    []
  );

  // LOGOUT
  const logout = useCallback(() => {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.signOut();
      dispatch({
        type: Types.LOGOUT,
      });
    }
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: "cognito",
      login,
      loginWithGoogle: voidFunction,
      loginWithGithub: voidFunction,
      loginWithTwitter: voidFunction,
      register,
      logout,
    }),
    [
      state.isAuthenticated,
      state.isInitialized,
      state.user,
      login,
      register,
      logout,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
