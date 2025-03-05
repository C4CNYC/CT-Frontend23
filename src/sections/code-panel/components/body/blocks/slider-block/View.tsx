import { FC } from 'react'

import BrowserView from '@/sections/code-panel/components/body/blocks/view-block/browser-view/index'

import { IView } from './constants'

const View: FC<IView> = ({ type, body, connectIntegrations, stepBgColor, integrations }) => {
  switch (type) {
    default:
    case 'code':
      return (
        <BrowserView
          integrations={integrations}
          document={connectIntegrations(body)}
          stepBgColor={stepBgColor}
        />
      )
  }
}
export default View
