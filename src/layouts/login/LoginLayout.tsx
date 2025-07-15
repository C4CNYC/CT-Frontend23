import { Typography } from '@mui/material'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { Image } from '@/components/image'
import { Logo } from '@/components/logo'
import ThemeSwitcher from '@/components/theme-switcher'
import { useTranslate } from '@root/src/utils/translateHelper'

import {
  StyledLink,
  StyledLogoCont,
  StyledRoot,
  StyledSection,
  StyledSectionBg,
  StyledSwitcher,
} from './styles'

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
          <StyledLogoCont>
            <Logo />
          </StyledLogoCont>
          <Typography
            variant='h3'
            sx={{
              maxWidth: 480,
              textAlign: 'left',
            }}
          >
            {title ?? translate('login_layout_title')}
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
            {subtitle ?? translate('login_layout_subtitle')}
          </Typography>

          <Image
            disabledEffect
            visibleByDefault
            alt='auth'
            src={illustration ?? '/assets/illustrations/auth-cat.webp'}
            sx={{ maxWidth: 720 }}
          />
          <StyledSectionBg />
        </StyledSection>
        {children}
        <StyledSwitcher>
          <ThemeSwitcher />
        </StyledSwitcher>
        <StyledLink
          href={'https://codetribe.com/privacy-policy/'}
          target='_blank'
          variant='caption'
        >
          {translate('privacy_policy')}
        </StyledLink>
      </StyledRoot>
    </GoogleOAuthProvider>
  )
}
