import { Stack, Typography } from '@mui/material'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { Image } from '@/components/image'
import { Logo } from '@/components/logo'
import ThemeSwitcher from '@/components/theme-switcher'
import { useTranslate } from '@/lib/utils/translateHelper'

import { StyledContent, StyledRoot, StyledSection, StyledSectionBg, StyledSwitcher } from './styles'

interface Props {
  subtitle?: string
  title?: string
  illustration?: string
  children: React.ReactNode
}

export default function LoginLayout({
  children,
  illustration,
  title,
  subtitle,
}: Props): React.ReactElement | null {
  const translate = useTranslate()
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID as string}>
      <StyledRoot>
        <StyledSection>
          <Logo
            sx={{
              zIndex: 9,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              justifyContent: 'center',
              width: '100%',
              mt: {
                xs: 1.5,
                md: 5,
              },
            }}
          />
          <Typography
            variant='h3'
            sx={{
              maxWidth: 480,
              textAlign: 'left',
            }}
          >
            {title ?? translate('login_hi')}
          </Typography>

          <Typography
            variant='subtitle2'
            sx={{
              mb: 10,
              maxWidth: 480,
              textAlign: 'left',
              color: 'text.secondary',
            }}
          >
            {subtitle ?? translate('login_welcome_back')}
          </Typography>

          <Image
            disabledEffect
            visibleByDefault
            alt='auth'
            src={illustration ?? '/assets/illustrations/auth-cat.png'}
            sx={{ maxWidth: 720 }}
          />

          <StyledSectionBg />
        </StyledSection>

        <StyledContent>
          <Stack sx={{ width: 1 }}> {children} </Stack>
        </StyledContent>
        <StyledSwitcher>
          <ThemeSwitcher />
        </StyledSwitcher>
      </StyledRoot>
    </GoogleOAuthProvider>
  )
}
