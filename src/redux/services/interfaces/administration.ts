import { HomePageType } from '../enums/administration.enum'

export interface AdminSearchParams {
  name?: string
}

export interface IAdministration {
  name: string
  slug: string
  id: string
  min_logo: string | null
  logo: string | null
  home_page_type: HomePageType
  favicon: string | null
}

export interface IAdministrationCreate {
  name: string
  slug: string
}
