import { useEffect, useMemo, useRef, useState } from 'react'

import { Skeleton, Typography, useTheme } from '@mui/material'
import { Stack } from '@mui/system'

import { useFileManager } from '../body/blocks/code-editor-block/code-editor-collab/hook/file-manager/useFileManager'
import {
  CODING_TYP_SX,
  getParentStackSx,
  getSkeletonSx,
  getStackBottonSx,
  HEADER_SKELETON_SX,
} from '../body/blocks/view-block/skeleton-view-box/constants'

import { prepareJavaCode } from './prepare/java'
import { preparePythonCode } from './prepare/python'

export function BrowserViewEx({ document, iframeKey }: { document: any; iframeKey: number }) {
  const theme = useTheme()
  const isLight = theme.palette.mode === 'light'
  const isOpenHeader = true
  const skeletonSx = useMemo(() => getSkeletonSx(isLight), [isLight])
  const parentStackSx = useMemo(
    () => getParentStackSx(isLight, !!isOpenHeader),
    [isLight, isOpenHeader]
  )
  const bottonStackSx = useMemo(() => getStackBottonSx(isLight, theme), [isLight, theme])
  let [processing, processingSet] = useState<boolean>(false)
  let [running, runningSet] = useState<number>(0)
  let [contents, contentsSet] = useState<string>('')
  let [stderr, stderrSet] = useState<string>('')
  let [stdout, stdoutSet] = useState<string>('')
  let iframeRef = useRef<number>(0)

  const { files } = useFileManager()

  // Safe function to extract code from files to prevent undefined errors
  const getCodeByExtension = (extension: string): string => {
    if (!files || !Array.isArray(files)) return ''
    return files
      .filter((file) => file && file.extension && file.extension.toLowerCase() === extension)
      .map((file) => file.body || '')
      .join('\n')
  }

  useEffect(() => {
    // Safely extract code using the helper function
    let pys = getCodeByExtension('py')
    let java = getCodeByExtension('java')
    let test = getCodeByExtension('test')

    runningSet((v) => v + 1)
    if (processing || iframeRef.current == iframeKey) return
    iframeRef.current = iframeKey
    processingSet(true)
    contentsSet(pys)
    stderrSet('')
    stdoutSet('')
    let code = java ? prepareJavaCode(java, test) : preparePythonCode(pys, test)

    fetch('https://ct-n8n-bbf1b54b7ede.herokuapp.com/webhook/CodeRunner', {
      method: 'POST',
      headers: {
        'x-school-id': '6e81fc6a-ffc0-4e07-b84b-d415d524d6df',
        'x-tenant-id': 'codetribe',
      },
      body: JSON.stringify({
        prompt: { code, language: java ? 'java' : 'python' },
        endPointPath: 'CodeRunner',
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        let { err, msg, stdout, output } = r
        // if (err) console.error(err)
        stderrSet((err || '') + (msg || ''))
        stdoutSet(stdout || '')
        contentsSet(`Results :`)
        let contents = ''
        if (output as { all: 'Passed' | 'Failed'; passed: string[]; failed: string[] }) {
          for (let testName of output.passed) {
            window.postMessage(
              {
                type: 'checker-validation',
                checkerId: testName,
                valid: true,
              },
              '*'
            )
            contents += `${testName} Passed\n`
          }
          for (let testName of output.failed) {
            contents += `${testName} Failed\n`
          }
          if (output.all === 'Passed') {
            contentsSet(`All Tests Passed`)
            window.postMessage(
              {
                type: 'checker-validation',
                checkerId: 'All Tests',
                valid: true,
              },
              '*'
            )
          } else {
            contentsSet(`Some Tests Failed:\n` + contents)
          }
        }
      })
      .catch((e) => {
        //console.error(e)
      })
      .finally(() => setTimeout(() => processingSet((v) => false), 2000))
  }, [iframeKey, files])

  return (
    <>
      <Stack
        sx={parentStackSx}
        key={iframeKey}
      >
        <Stack sx={HEADER_SKELETON_SX}>
          <Skeleton
            height='18px'
            width='192px'
            sx={skeletonSx}
          />
          <Stack
            spacing={1}
            display='flex'
            direction='row'
          >
            <Skeleton
              height='13px'
              width='13px'
              variant='circular'
              sx={skeletonSx}
            />
            <Skeleton
              height='13px'
              width='13px'
              variant='circular'
              sx={skeletonSx}
            />
            <Skeleton
              height='13px'
              width='13px'
              variant='circular'
              sx={skeletonSx}
            />
          </Stack>
        </Stack>

        <Stack sx={bottonStackSx}>
          <Typography
            sx={CODING_TYP_SX}
            variant='subtitle1'
          >
            {contents}
          </Typography>
          <div
            style={{
              whiteSpace: 'pre-wrap',
              color: 'darkgreen',
              padding: '8px',
              border: stdout ? '1px solid darkred' : 'none',
              display: stdout ? 'block' : 'none',
            }}
          >
            {stdout}
          </div>
          <div
            className='error-output'
            style={{
              whiteSpace: 'pre-wrap',
              color: 'darkred',
              padding: '8px',
              border: stderr ? '1px solid darkred' : 'none',
              display: stderr ? 'block' : 'none',
            }}
          >
            {stderr}  
          </div>
          <div style={{ color: '#F6F9FC', whiteSpace: 'pre-wrap' }}>
          {running}

            {processing ? 'Processing' : 'Ready'}
            </div>
        </Stack>
      </Stack>
    </>
  )
}
