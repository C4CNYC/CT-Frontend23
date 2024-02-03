import { Typography } from '@mui/material'
import { CgBrowser } from '@react-icons/all-files/cg/CgBrowser'
import { useAtom } from 'jotai'

import { globalCodePanelAtom } from '@/sections/code-panel/atoms/global-code-panel.atom'

import { SupportedLang } from '../..'
import BaseBlock from '../BaseBlock'

import BrowserView from './BrowserView'

const title = 'Browser Preview'
const icon = (
  <CgBrowser
    size='20px'
    color='#43D4DD'
  />
)

interface IVueBlock {
  code: string
  language: SupportedLang
}

const ViewBlock = ({ code, language }: IVueBlock): React.ReactElement => {
  const [{ isBrowserHidden }, setGlobalCodePanel] = useAtom(globalCodePanelAtom)

  switch (language) {
    case 'html': {
      return !isBrowserHidden ? (
        <BaseBlock
          title={title}
          icon={icon}
          className='browserTour'
          hideTabsHandler={() => {
            setGlobalCodePanel((prev) => ({
              ...prev,
              isBrowserHidden: true,
            }))
          }}
        >
          <BrowserView value={code} />
        </BaseBlock>
      ) : (
        <></>
      )
    }
    default: {
      return !isBrowserHidden ? (
        <BaseBlock
          title={title}
          icon={icon}
        >
          <Typography
            mt='40px'
            textAlign='center'
            textTransform='uppercase'
            color='#c4c4c4'
            variant='h6'
          >
            LANGUAGE NOT SUPORTED
          </Typography>
        </BaseBlock>
      ) : (
        <></>
      )
    }
  }
}

export default ViewBlock
