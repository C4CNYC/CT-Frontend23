import { BaseSearchInterface, BaseResponseInterface } from '@root/src/utils'

export const PropertyEntityTypes = [
  'school',
  'class',
  'lesson',
  'student',
  'teacher',
  'parent',
  'course',
  'course-lesson',
] as const
export type PropertyEntityType = (typeof PropertyEntityTypes)[number]

export interface IProperty extends BaseResponseInterface {
  entityType: PropertyEntityType
  entityId: string
  propertyName: string
  propertyValue: string
}
export interface IUseProperty {
  entityType: PropertyEntityType
  entityId?: string // if optional it basically wont communicate with backend
  propertyName: string
}
export interface IPropertyCreate {
  entityType: PropertyEntityType
  entityId: string
  propertyName: string
  propertyValue: string
}

export interface IPropertyUpdate extends IPropertyCreate {
  id: string
}
export interface IPropertySearchParams extends BaseSearchInterface {
  entityType?: PropertyEntityType
  entityId?: string
  propertyName?: string
  propertyValue?: string
}
