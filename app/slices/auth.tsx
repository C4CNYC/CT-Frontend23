import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../app/services/auth'
import type { RootState } from '../../app/store'

type AuthState = {
  user: User | null
  token: string | null
}

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: typeof window === 'object' ? localStorage.getItem('token') : '' } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user
      state.token = token
    },
    setUser: (
      state,
      { payload: user }: PayloadAction<User>
    ) => {
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    }
  },
})

export const { setCredentials, logout, setUser } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
