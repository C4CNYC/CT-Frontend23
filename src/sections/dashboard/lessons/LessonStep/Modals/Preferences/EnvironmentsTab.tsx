import React from 'react'

import { javascript } from '@codemirror/lang-javascript'
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Box,
  Chip,
  Skeleton,
  TextField,
  Typography,
  alpha,
} from '@mui/material'
import { MdOutlineCheckBox } from '@react-icons/all-files/md/MdOutlineCheckBox'
import { MdOutlineCheckBoxOutlineBlank } from '@react-icons/all-files/md/MdOutlineCheckBoxOutlineBlank'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
// import Link from 'next/link'
import { useSnackbar } from 'notistack'

import { RHFCode, SearchNotFound } from '@/components'
import { useFilters } from '@/hooks'
import { IEnvironment } from '@/redux/interfaces/environment.interface'
import { useGetEnvironmentsQuery } from '@/redux/services/manager/environments-manager'
import {
  useAddEnvironmentMutation,
  useGetLessonEnvironmentsQuery,
  useRemoveEnvironmentMutation,
} from '@/redux/services/manager/lessons-manager'
// import { MANAGER_PATH_DASHBOARD } from '@/routes/manager.paths'
import { BaseResponseInterface, voidFunction } from '@/utils'
import { useTranslate } from '@/utils/translateHelper'

export function EnvironmentsTab({ contentId }: { contentId: string }): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar()

  const { filters, setFilter } = useFilters({ name: '', take: 50 })
  const translate = useTranslate()
  const [addEnvironment, { isLoading: addLoading }] = useAddEnvironmentMutation()
  const [removeEnvironment, { isLoading: removeLoading }] = useRemoveEnvironmentMutation()
  const { data, isFetching } = useGetLessonEnvironmentsQuery({
    id: contentId,
  })
  const { data: environments } = useGetEnvironmentsQuery(filters)

  if (!environments || !data) {
    return (
      <Skeleton
        animation='wave'
        variant='rounded'
        sx={{ width: '100%', height: '56px' }}
      />
    )
  }

  async function selectOption(environmentId?: string, optionName?: string): Promise<void> {
    await addEnvironment({
      lessonId: contentId,
      environment_id: environmentId || '',
    }).unwrap()
    enqueueSnackbar(
      translate('messages_sth_added', {
        name: optionName ?? '',
      })
    )
  }

  const onChange = async (
    _event: React.SyntheticEvent<any>,
    _newValue: Array<IEnvironment & BaseResponseInterface>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<IEnvironment & BaseResponseInterface>
  ): Promise<void> => {
    try {
      const payload = {
        lessonId: contentId,
        environment_id: details?.option.id ?? '',
      }
      switch (reason) {
        case 'selectOption': {
          await selectOption(details?.option?.id, details?.option?.name)
          return
        }
        case 'removeOption': {
          await removeEnvironment(payload).unwrap()
          enqueueSnackbar(
            translate('messages_sth_removed', {
              name: details?.option.name ?? '',
            })
          )
          return
        }
        default:
          return
      }
    } catch {
      enqueueSnackbar(translate('messages_error'), { variant: 'error' })
    }
  }

  // if (!environments.length) {
  //   return (
  //     <Box>
  //       <Typography>{translate('environments_empty')}</Typography>
  //       <Typography>
  //         {translate('environments_lets_create')}{' '}
  //         <Link href={MANAGER_PATH_DASHBOARD.environments.root}>{translate('here')}</Link>
  //       </Typography>
  //     </Box>
  //   )
  // }

  return (
    <>
      <Autocomplete<IEnvironment & BaseResponseInterface, true>
        multiple
        id='environments-tab-autocomplete'
        loading={isFetching || addLoading || removeLoading}
        value={data}
        onChange={onChange}
        options={environments}
        popupIcon={null}
        onLoadStart={voidFunction}
        noOptionsText={
          <SearchNotFound
            sx={{ p: '20px 0' }}
            query={filters.name}
          />
        }
        onInputChange={(event, value) => {
          setFilter('name', value)
        }}
        getOptionLabel={(option) => JSON.stringify(option)}
        renderTags={(tagValue, getTagProps): React.ReactElement[] =>
          tagValue.map((option, index) => (
            <Chip
              label={option.name}
              {...getTagProps({ index })}
              key={option.name}
            />
          ))
        }
        style={{ width: '100%', display: 'block', overflow: 'visible' }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={translate('environments')}
          />
        )}
        renderOption={(props, recipient, { inputValue }) => {
          const { name } = recipient
          const matches = match(name, inputValue)
          const parts = parse(name, matches)

          const selected = data?.find((c) => c.name === name)

          return (
            <Box
              component='li'
              sx={{
                p: '12px !important',
                pointerEvents: selected ? 'none' : 'auto',
              }}
              {...props}
              key={name}
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
                <Box
                  sx={{
                    top: 0,
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
                  {selected ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
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
      {environments?.map((environment) => {
        return (
          <button
            key={environment.id}
            onClick={() => {
              selectOption(environment.id, environment.name)
            }}
          >
            <Typography
              variant='subtitle2'
              color='primary'
            >
              {environment.name}
            </Typography>
          </button>
        )
      })}
      <Box pt={2}>
        <RHFCode
          placeholder={translate('environments_head_links_plh')}
          name='head'
          height='180px'
          extensions={[javascript({ jsx: true })]}
        />
      </Box>
    </>
  )
}
