export interface IIntegration {
  name: string
  head: string
  scripts: string
  organization_id?: string // New field - tenant slug
  public?: boolean // New field - visibility flag
}

export interface IIntegrationSearch {
  name?: string
  public?: boolean // New field - filter by visibility (super-admin only)
  organization_id?: string // New field - filter by tenant (super-admin only)
}
