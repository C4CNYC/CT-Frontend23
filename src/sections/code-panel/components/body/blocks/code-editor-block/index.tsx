import { type FC } from 'react'

import { BiCodeAlt } from '@react-icons/all-files/bi/BiCodeAlt'
import dynamic from 'next/dynamic'

import { type AuthUserType } from '@/auth/types'
import { SkeletonCodeEditorBlock } from '@/components/skeleton'
import { type IValidation } from '@/redux/interfaces/content.interface'
import type { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { useTranslate } from '@root/src/utils/translateHelper'

import BaseBlock from '../base-block'

const CodeEditorBlockContent = dynamic(() => import('./code-editor-block-content'), {
  ssr: false,
  loading: () => <SkeletonCodeEditorBlock />,
})

interface ICodeEditorBlock {
  user: AuthUserType | null
  code: string
  onChangeStreamingDocInfo: (doc: Record<string, string>) => void
  validations: Array<IValidation & BaseResponseInterface>
  preloadedCode: string
  contentId?: string
}

const icon = (
  <BiCodeAlt
    size='20px'
    color='#43D4DD'
  />
)
const CodeEditorBlock: FC<ICodeEditorBlock> = ({
  user,
  validations,
  code,
  onChangeStreamingDocInfo,
  preloadedCode,
  contentId,
}) => {
  const translate = useTranslate()

  return (
    <BaseBlock
      title={translate('code_editor')}
      icon={icon}
      className='codeEditorTour'
    >
      <CodeEditorBlockContent
        user={user}
        validations={validations}
        code={code}
        onChangeStreamingDocInfo={onChangeStreamingDocInfo}
        preloadedCode={preloadedCode}
        contentId={contentId}
      />
    </BaseBlock>
  )
}

export default CodeEditorBlock
