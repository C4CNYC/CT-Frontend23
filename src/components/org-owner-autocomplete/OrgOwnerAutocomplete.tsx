import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Avatar,
  Box,
  Skeleton,
  TextField,
  Typography,
  alpha,
} from '@mui/material'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { useSnackbar } from 'notistack'

import { SearchNotFound } from '@/components'
import { useFilters } from '@/hooks'
import { useGetOrgMembersQuery } from '@/redux/services/admin/members-admin'
import { Role } from '@/redux/services/enums/role.enum'
import { IUser } from '@/redux/services/interfaces/user.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import {
  useDeleteOrgOwnerMutation,
  useUpdateOrgOwnerMutation,
} from '@root/src/redux/services/manager/super-admin'
import { useTranslate } from '@root/src/utils/translateHelper'

export type IOwnerType = IUser & BaseResponseInterface

interface IOrgOwnerAutocompleteProps {
  orgId: string
  owner: IOwnerType | null
}

export default function OrgOwnerAutocomplete({
  orgId,
  owner,
}: IOrgOwnerAutocompleteProps): React.ReactElement {
  const translate = useTranslate()
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
    _newValue: IOwnerType | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<IOwnerType>
  ): Promise<void> => {
    try {
      const payload = {
        id: orgId,
        user_id: details?.option.id ?? '',
      }
      switch (reason) {
        case 'selectOption': {
          await updateOwner(payload).unwrap()
          enqueueSnackbar(translate('owner_added'))
          return
        }
        case 'clear': {
          if (!owner) return
          await deleteOwner(payload).unwrap()
          enqueueSnackbar({ variant: 'warning', message: translate('owner_removed') })
        }
      }
    } catch (error: any) {
      enqueueSnackbar(`${error?.data.message ?? translate('messages_error')}`, { variant: 'error' })
    }
  }
  return (
    <Autocomplete<IOwnerType>
      id='add-owner-input'
      value={owner}
      onChange={onChange}
      options={admins.data}
      popupIcon={null}
      noOptionsText={
        <SearchNotFound
          sx={{ p: '20px 0' }}
          query={filters.name}
        />
      }
      onInputChange={(_, value) => {
        setFilter('email', value)
      }}
      getOptionLabel={(option) => option.email}
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
              ></Box>
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
