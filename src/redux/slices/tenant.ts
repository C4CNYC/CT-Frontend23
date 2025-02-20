import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface Tenant {
  name: string
  slug: string
  logo: string
  min_logo: string
  favicon: string
  home_page_type?: string
}

export const DEFAULT_TENANT: Tenant = {
  name: 'CodeTribe',
  slug: 'codetribe',
  logo: '/logo/logo.png',
  min_logo: '/logo/logo.png',
  favicon: '/favicon/favicon-32x32.png',
}

const initialState: Tenant = {
  name: '',
  slug: '',
  logo: '',
  min_logo: '',
  favicon: '',
}

export const tenantSlice = createSlice({
  name: 'schoolSettings',
  initialState,
  reducers: {
    setTenant: (state, action: PayloadAction<Tenant>) => {
      state.name = action.payload.name || DEFAULT_TENANT.name
      state.slug = action.payload.slug || DEFAULT_TENANT.slug
      state.logo = action.payload.logo || DEFAULT_TENANT.logo
      state.min_logo = action.payload.min_logo || DEFAULT_TENANT.min_logo
      state.favicon = action.payload.favicon || DEFAULT_TENANT.favicon
    },
    resetTenant: (state) => {
      state.name = ''
      state.slug = ''
      state.logo = ''
      state.min_logo = ''
      state.favicon = ''
    },
  },
})

export const { setTenant, resetTenant } = tenantSlice.actions

export default tenantSlice.reducer
