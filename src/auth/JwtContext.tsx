import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react'

import { useDispatch } from 'react-redux'

import { Role } from '@/redux/services/enums/role.enum'
import { cleanUser, cleanUserRole, setUser } from '@/redux/slices/global'
import { axios } from '@/utils/axios'
import { localStorageAvailable } from '@/utils/localStorageAvailable'
import { voidFunction } from '@/utils/voidFunction'

import { useLogin } from '../hooks/useLogin'
import { resetTenant, setTenant, Tenant } from '../redux/slices/tenant'

import { ActionMapType, AuthStateType, AuthUserType, JWTContextType } from './types'
import { isValidToken, setSession } from './utils'

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  REGISTER_TO_ORGANIZATION = 'REGISTER_TO_ORGANIZATION',
  LOGOUT = 'LOGOUT',
  AUTHENTICATE = 'AUTHENTICATE',
}

interface Payload {
  [Types.INITIAL]: {
    isAuthenticated: boolean
    user: AuthUserType
  }
  [Types.LOGIN]: {
    user: AuthUserType
  }
  [Types.REGISTER]: {
    user: AuthUserType
  }
  [Types.REGISTER_TO_ORGANIZATION]: {
    user: AuthUserType
  }
  [Types.AUTHENTICATE]: Record<string, unknown>
  [Types.LOGOUT]: undefined
}

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>]

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
}

const reducer = (state: AuthStateType, action: ActionsType): AuthStateType => {
  switch (action.type) {
    case Types.INITIAL:
      return {
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      }
    case Types.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      }
    case Types.REGISTER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      }
    case Types.REGISTER_TO_ORGANIZATION:
      return {
        ...state,
        user: action.payload.user,
      }
    case Types.AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: true,
      }
    case Types.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    default:
      return state
  }
}

export const AuthContext = createContext<JWTContextType | null>(null)

interface AuthProviderProps {
  children: React.ReactNode
  tenant?: Tenant
}
const localStorageDontClearThose = ['HAS_SEEN', 'i18', 'iconify', 'tenant']

// TODO: Handle scenario when user is not logged in and user data is an empty string with isAuthenticated set to true
export function AuthProvider({ children, tenant }: AuthProviderProps): React.ReactElement | null {
  const [state, dispatch] = useReducer(reducer, initialState)
  const reduxDispatch = useDispatch()
  const storageAvailable = localStorageAvailable()
  useLogin()

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : ''

      const tenantName = getTenantFromDomain()
      const isManagerRoute = window.location.pathname.includes('manager/')

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken, tenantName)
        const { data } = await axios.get('/auth/profile')

        if (isManagerRoute && data.role === Role.Student) {
          window.location.pathname = '/permission-denied'
        }
        reduxDispatch(setUser(data))
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user: data,
          },
        })
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
      }
    } catch (error: any) {
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      })
    }
  }, [])

  useEffect(() => {
    initialize().catch(() => {
      voidFunction()
    })
  }, [initialize])

  useEffect(() => {
    if (!tenant) return

    reduxDispatch(setTenant(tenant))

    return () => {
      reduxDispatch(resetTenant())
    }
  }, [tenant])

  // AUTHENTICATE
  const authenticate = (): void => {
    dispatch({
      type: Types.AUTHENTICATE,
      payload: {},
    })
  }

  const getTenantFromDomain = (): string => {
    return localStorage.getItem('tenantName') ?? 'codetribe'
  }

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const tenantName = getTenantFromDomain()
    try {
      if (tenantName) localStorage.setItem('tenantName', tenantName)
      const { data } = await axios.post<any, any>('auth/signin', {
        email,
        password,
      })

      const { access_token: accessToken, user } = data
      reduxDispatch(setUser(user))
      setSession(accessToken, localStorage.getItem('tenantName') ?? 'codetribe')

      dispatch({
        type: Types.LOGIN,
        payload: {
          user,
        },
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }, [])

  // LOGIN WITH GOOGLE
  const loginWithGoogle = async (token: string) => {
    const tenantName = getTenantFromDomain()

    const { data } = await axios.post<any, any>('auth/google-signin', {
      auth_token: token,
    })

    const { access_token: accessToken, user } = data
    reduxDispatch(setUser(user))
    setSession(accessToken, tenantName)

    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    })
  }

  // Register WITH GOOGLE
  const registerWithGoogle = async (token: string, role: Role) => {
    const tenantName = getTenantFromDomain()

    try {
      const { data } = await axios.post<any, any>('auth/google-signup', {
        auth_token: token,
        role,
      })

      const { access_token: accessToken, user } = data
      reduxDispatch(setUser(user))
      setSession(accessToken, tenantName)

      dispatch({
        type: Types.REGISTER,
        payload: {
          user,
        },
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // REGISTER
  const register = useCallback(
    async ({
      email,
      password,
      firstName,
      lastName,
      emojiAvatar,
      role,
    }: {
      email: string
      password: string
      firstName: string
      lastName: string
      emojiAvatar?: string
      role: Role
    }) => {
      const tenantName = getTenantFromDomain()

      const { data } = await axios.post('/auth/signup', {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        role,
        emojiAvatar,
      })

      const { access_token: accessToken, user } = data

      localStorage.setItem('accessToken', accessToken)

      reduxDispatch(setUser(user))
      setSession(accessToken, tenantName)

      dispatch({
        type: Types.REGISTER,
        payload: {
          user,
        },
      })
    },
    []
  )

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null, null)
    reduxDispatch(cleanUser())
    reduxDispatch(cleanUserRole())

    for (let i = localStorage.length - 1; i > -1; i--)
      if (!localStorageDontClearThose.some((x) => localStorage.key(i)?.includes(x)))
        localStorage.removeItem(localStorage.key(i)!)

    // localStorage.clear() // please write here why we needed to clear localStorage?
    dispatch({
      type: Types.LOGOUT,
    })
  }, [])

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      authenticate,
      loginWithGoogle,
      registerWithGoogle,
      loginWithGithub: voidFunction,
      loginWithTwitter: voidFunction,
      register,
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
  )

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
}
