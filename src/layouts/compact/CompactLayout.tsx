import { Container, Stack, SxProps } from '@mui/material'
import dynamic from 'next/dynamic'

import { useOffSetTop } from '@/hooks'

import { HEADER_SIZES } from '../../theme/consts'

const Header = dynamic(async () => await import('./Header'), { ssr: false })

interface Props {
  children?: React.ReactNode
  sx?: SxProps
}

export default function CompactLayout({ children, sx }: Props): React.ReactElement | null {
  const isOffset = useOffSetTop(HEADER_SIZES.H_MAIN_DESKTOP)

  return (
    <>
      <Header isOffset={isOffset} />

      <Container component='main'>
        <Stack
          sx={{
            py: 12,
            m: 'auto',
            maxWidth: 400,
            minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
            ...sx,
          }}
        >
          {children}
        </Stack>
      </Container>
    </>
  )
}
