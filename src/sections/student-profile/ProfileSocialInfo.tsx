import { Card, CardHeader, Link, Stack } from '@mui/material'

import { SOCIAL_ICONS } from '@/assets/data'
import { useGetSocialsQuery } from '@/redux/services/manager/socials-student'
import { useTranslate } from '@/utils/translateHelper'

interface Props {
  studentId: string
}

export default function ProfileSocialInfo({ studentId }: Props): React.ReactElement {
  const { data } = useGetSocialsQuery({ studentId })
  const translate = useTranslate()

  return (
    <Card>
      <CardHeader title={translate('socials')} />

      <Stack
        spacing={2}
        sx={{ p: 3 }}
      >
        {data?.map((link) => (
          <Stack
            key={link.name}
            sx={{ alignItems: 'center', flexDirection: 'row', gap: 1 }}
          >
            {SOCIAL_ICONS[link.type]}
            <Link
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              component='span'
              variant='body2'
              color='text.primary'
            >
              {link.link}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  )
}
