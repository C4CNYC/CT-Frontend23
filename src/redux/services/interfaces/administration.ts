import { HomePageType } from '../enums/administration.enum'

export interface AdminSearchParams {
  name?: string
}

export interface IAdministration {
  name: string
  slug: string
  domain: string
  id: string
  min_logo: string | null
  logo: string | null
  home_page_type: HomePageType
  favicon: string | null
  home_page_body?: string
  meta?: IOrgMeta
}

export interface IAdministrationCreate {
  name: string
  slug: string
  domain: string
  home_page_type?: HomePageType
  home_page_body?: string
}

export interface IOrgMeta {
  meta_title: string
  meta_description: string
  [key: string]: string | number | boolean
}
