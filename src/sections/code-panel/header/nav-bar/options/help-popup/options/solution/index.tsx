import { type FC } from 'react'

// import { CopyBlock, dracula } from "react-code-blocks";

import { Box } from '@mui/material'

import { useSelector } from '@/redux/store'

const Solution: FC = () => {
  const solutionCode = useSelector((state) => state.codePanelGlobal.solutionCode)

  return (
    // <CopyBlock
    //   text={solutionCode || NO_SOLUTION_TEXT}
    //   language="html"
    //   theme={dracula}
    //   customStyle={COPY_BLOCK_STYLES}
    // />
    <Box
      component='div'
      style={COPY_BLOCK_STYLES as any}
    >
      {solutionCode || NO_SOLUTION_TEXT}
    </Box>
  )
}

const NO_SOLUTION_TEXT = 'NO SOLUTION'

const COPY_BLOCK_STYLES = {
  height: '150px',
  overflowY: 'scroll',
  borderRadius: '0',
  boxShadow: 'none',
  fontSize: '0.75rem',
}

export default Solution
