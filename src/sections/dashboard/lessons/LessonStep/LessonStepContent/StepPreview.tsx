import { Box } from '@mui/material'

import { IIntegration } from '@/redux/services/interfaces/integration.interface'

interface Props {
  integrations: IIntegration[]
  staticValue: string
  bgColor: string
}

export function StepPreview({ integrations, staticValue, bgColor }: Props) {
  const pageSkeleton = (userContent: string): string | undefined => {
    if (integrations) {
      return `<head>${integrations.reduce(
        (ac, cur) => ac + (cur.head.startsWith('<') ? cur.head : `<style>${cur.head}</style>`),
        ''
      )}<meta charset="utf-8"></head><main>${userContent}${integrations.reduce((ac, cur) => {
        return ac + cur.scripts
      }, '')}</main>`
    }
  }
  return (
    <Box sx={{ bgcolor: bgColor }}>
      <iframe
        style={{
          border: 0,
          width: '100%',
          height: '100%',
        }}
        src={'data:text/html,' + encodeURIComponent(pageSkeleton(staticValue) as string)}
      />
    </Box>
  )
}
