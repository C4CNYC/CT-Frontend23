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
export interface IPropertySearchParams extends BaseSearchInterface {
  entityType?: PropertyEntityType
  entityId?: string
  propertyName?: string
  propertyValue?: string
}
