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
  home_page_body?: string
}

export interface IAdministrationCreate {
  name: string
  slug: string
  home_page_type?: HomePageType
  home_page_body?: string
}
