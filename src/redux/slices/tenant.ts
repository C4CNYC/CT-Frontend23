import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IOrgMeta } from '../services/interfaces/administration'

export interface Tenant {
  name: string
  slug: string
  logo: string
  min_logo: string
  favicon: string
  home_page_type?: string
  domain?: string
  meta?: IOrgMeta
}

export const DEFAULT_TENANT: Tenant = {
  name: 'CodeTribe',
  slug: 'codetribe',
  logo: '/logo/logo.png',
  min_logo: '/logo/logo.png',
  favicon: '/favicon/favicon-32x32.png',
  domain: 'app.codetribe.com',
  meta: {
    meta_title: 'CodeTribe',
    meta_description:
      'Text-based Coding for Teens, Schools & Summer Camps – Coding real-world, social-impact websites. Learn web development with friends.',
  },
}

const initialState: Tenant = {
  name: '',
  slug: '',
  logo: '',
  min_logo: '',
  favicon: '',
  domain: '',
  meta: {
    meta_title: '',
    meta_description: '',
  },
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
      state.domain = action.payload.domain || DEFAULT_TENANT.domain
      state.meta = {
        meta_title: action.payload.meta?.meta_title ?? DEFAULT_TENANT.meta?.meta_title ?? '',
        meta_description:
          action.payload.meta?.meta_description ?? DEFAULT_TENANT.meta?.meta_description ?? '',
      }
    },
    resetTenant: (state) => {
      state.name = ''
      state.slug = ''
      state.logo = ''
      state.min_logo = ''
      state.favicon = ''
      state.domain = ''
      state.meta = {
        meta_title: '',
        meta_description: '',
      }
    },
  },
})

export const { setTenant, resetTenant } = tenantSlice.actions

export default tenantSlice.reducer
