import { IIntegration } from '@/redux/services/interfaces/integration.interface'

interface Props {
  integrations: IIntegration[]
  staticValue: string
}

export function StepPreview({ integrations, staticValue }: Props) {
  const pageSkeleton = (userContent: string): string | undefined => {
    if (integrations) {
      return `<head>${integrations.reduce(
        (ac, cur) => ac + cur.head,
        ''
      )}</head><main>${userContent}${integrations.reduce((ac, cur) => {
        return ac + cur.scripts
      }, '')}</main>`
    }
  }
  return (
    <iframe
      style={{
        border: 0,
        width: '100%',
        height: '100%',
      }}
      src={'data:text/html,' + encodeURIComponent(pageSkeleton(staticValue) as string)}
    />
  )
}
