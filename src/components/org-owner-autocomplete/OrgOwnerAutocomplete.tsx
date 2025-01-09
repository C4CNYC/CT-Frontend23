import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Avatar,
  Box,
  Chip,
  Skeleton,
  TextField,
  Typography,
  alpha,
} from '@mui/material'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { useSnackbar } from 'notistack'

import { CustomAvatar, Iconify, SearchNotFound } from '@/components'
import { useFilters } from '@/hooks'
import { useGetOrgMembersQuery } from '@/redux/services/admin/members-admin'
import { Role } from '@/redux/services/enums/role.enum'
import { IUser } from '@/redux/services/interfaces/user.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import {
  useDeleteOrgOwnerMutation,
  useUpdateOrgOwnerMutation,
} from '@root/src/redux/services/manager/super-admin'

type UserType = IUser & BaseResponseInterface

interface IOrgOwnerAutocompleteProps {
  orgId: string
  owner?: UserType
}

export default function OrgOwnerAutocomplete({
  orgId,
  owner,
}: IOrgOwnerAutocompleteProps): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar()

  const [updateOwner] = useUpdateOrgOwnerMutation()
  const [deleteOwner] = useDeleteOrgOwnerMutation()

  const { filters, setFilter } = useFilters({
    name: '',
    role: Role.Admin,
    take: 50,
  })
  const { data: admins } = useGetOrgMembersQuery(filters)

  if (!admins?.data) {
    return (
      <Skeleton
        variant='rounded'
        height='56px'
      />
    )
  }

  const onChange = async (
    _event: React.SyntheticEvent<any>,
    _newValue: UserType[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<UserType>
  ): Promise<void> => {
    try {
      const payload = {
        id: orgId,
        user_id: details?.option.id ?? '',
      }
      switch (reason) {
        case 'selectOption': {
          await updateOwner(payload).unwrap()
          enqueueSnackbar(`${details?.option.email ?? ''} became owner`)
          return
        }
        case 'removeOption': {
          await deleteOwner(payload).unwrap()
          enqueueSnackbar(`${details?.option.email ?? ''} is not a owner`)
        }
      }
    } catch {
      enqueueSnackbar('something went wrong', { variant: 'error' })
    }
  }
  return (
    <Autocomplete<any, true>
      id='add-owner-input'
      value={[owner]}
      onChange={onChange}
      options={admins.data}
      popupIcon={null}
      noOptionsText={
        <SearchNotFound
          sx={{ p: '20px 0' }}
          query={filters.name}
        />
      }
      onInputChange={(event, value) => {
        setFilter('email', value)
      }}
      getOptionLabel={(option) => option.email}
      renderTags={(tagValue, getTagProps): React.ReactElement[] =>
        tagValue.map((option, index) => (
          <Chip
            sx={{ direction: 'ltr !important' }}
            avatar={
              <CustomAvatar
                alt={option.email}
                src='/assets/images/avatar_2.jpg'
              />
            }
            label={option.email}
            {...getTagProps({ index })}
            key={option.email}
          />
        ))
      }
      style={{ width: '100%' }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder='Admins'
        />
      )}
      renderOption={(props, recipient, { inputValue }) => {
        const { email, avatar } = recipient

        const matches = match(email, inputValue)
        const parts = parse(email, matches)

        const selected = owner?.email

        return (
          <Box
            component='li'
            sx={{
              p: '12px !important',
              pointerEvents: selected ? 'none' : 'auto',
            }}
            {...props}
          >
            <Box
              sx={{
                mr: 1.5,
                width: 32,
                height: 32,
                overflow: 'hidden',
                borderRadius: '50%',
                position: 'relative',
              }}
            >
              <Avatar
                alt={email}
                src={avatar ?? '/assets/images/avatar_2.jpg'}
              >
                {avatar}
              </Avatar>
              <Box
                sx={{
                  top: 0,
                  opacity: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                  transition: (theme) =>
                    theme.transitions.create('opacity', {
                      easing: theme.transitions.easing.easeInOut,
                      duration: theme.transitions.duration.shorter,
                    }),
                  ...(selected && {
                    opacity: 1,
                    color: 'primary.main',
                  }),
                }}
              >
                <Iconify icon='eva:checkmark-fill' />
              </Box>
            </Box>

            {parts.map((part, index) => (
              <Typography
                key={index}
                variant='subtitle2'
                color={part.highlight ? 'primary' : 'textPrimary'}
              >
                {part.text}
              </Typography>
            ))}
          </Box>
        )
      }}
    />
  )
}
