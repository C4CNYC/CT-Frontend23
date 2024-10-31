import {
  useGetPropertiesQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} from '@root/src/redux/services/manager/properties-manager'

import { IUseProperty } from '../redux/services/interfaces/properties.interface'

export const useProperties = ({ entityType, entityId, propertyName }: IUseProperty) => {
  const { data: properties } = useGetPropertiesQuery({ entityType, entityId }, { skip: !entityId })

  const [createProperty] = useCreatePropertyMutation()
  const [updateProperty] = useUpdatePropertyMutation()
  const [deleteProperty] = useDeletePropertyMutation()

  const property = properties?.data?.find((p) => p.propertyName === propertyName)

  const setProperty = async (value: string) => {
    if (!entityId) return
    if (property) {
      // Update if it exists
      await updateProperty({
        id: property.id,
        propertyValue: value,
        entityType,
        entityId,
        propertyName,
      })
    } else {
      // Create if it doesn't exist
      await createProperty({
        entityType,
        entityId,
        propertyName,
        propertyValue: value,
      })
    }
  }

  // Function to remove the property
  const removeProperty = async () => {
    if (property) {
      await deleteProperty({ id: property.id })
    }
  }

  return [property?.propertyValue, setProperty, removeProperty] as const
}
