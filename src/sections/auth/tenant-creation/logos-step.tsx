import { useState } from 'react'

import { Box, IconButton, Stack, Typography } from '@mui/material'
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose'
import { useRouter } from 'next/router'

import { RHFUploadBox, SingleFilePreview } from '@root/src/components'
import { PATH_PAGE } from '@root/src/routes/paths'
import { useTranslate } from '@root/src/utils/translateHelper'

import CustomLabel from './_components/CustomLabel'
import NextBtn from './_components/NextBtn'
import { HELPER_IMG_TEXT, UPLOAD_IMG_BTN } from './constants'

const LogosStep = () => {
  const translate = useTranslate()
  const { push } = useRouter()
  const [uploadedLogo, setUploadedLogo] = useState<null | File>(null)
  const [uploadedLogoMini, setUploadedLogoMini] = useState<null | File>(null)

  return (
    <Stack sx={{ gap: 2 }}>
      <Stack
        sx={{ flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Box sx={{ position: 'relative' }}>
          {uploadedLogo ? (
            <IconButton
              sx={UPLOAD_IMG_BTN}
              onClick={() => {
                setUploadedLogo(null)
              }}
            >
              <IoMdClose size='20px' />
            </IconButton>
          ) : null}
          <RHFUploadBox
            sx={{ width: '100px', height: '100px' }}
            name='logo'
            accept={{
              'image/*': [],
            }}
            onDrop={(files: File[]) => {
              setUploadedLogo(files[0])
            }}
            helperText={
              <Typography
                variant='caption'
                noWrap
                width='90px'
                sx={HELPER_IMG_TEXT}
              >
                {uploadedLogo?.name}
              </Typography>
            }
          />
          <SingleFilePreview file={uploadedLogo ? URL.createObjectURL(uploadedLogo) : null} />
        </Box>
        <CustomLabel
          variant='h6'
          whiteSpace='nowrap'
          translationKey='Upload logo mini'
        />
      </Stack>
      <Stack
        sx={{ flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Box sx={{ position: 'relative' }}>
          {uploadedLogoMini ? (
            <IconButton
              sx={UPLOAD_IMG_BTN}
              onClick={() => {
                setUploadedLogoMini(null)
              }}
            >
              <IoMdClose size='20px' />
            </IconButton>
          ) : null}
          <RHFUploadBox
            sx={{ width: '230px', height: '130px' }}
            name='logo'
            accept={{
              'image/*': [],
            }}
            onDrop={(files: File[]) => {
              setUploadedLogoMini(files[0])
            }}
            helperText={
              <Typography
                variant='caption'
                noWrap
                width='90px'
                sx={HELPER_IMG_TEXT}
              >
                {uploadedLogoMini?.name}
              </Typography>
            }
          />
          <SingleFilePreview
            file={uploadedLogoMini ? URL.createObjectURL(uploadedLogoMini) : null}
          />
        </Box>
        <CustomLabel
          variant='h6'
          whiteSpace='nowrap'
          translationKey='Upload logo'
        />
      </Stack>
      <Typography
        mt={-1}
        pl={1}
        variant='subtitle2'
      >
        {translate('*All fields are optional')}
      </Typography>
      <NextBtn onClick={() => push(PATH_PAGE.pricing)} />
    </Stack>
  )
}

export default LogosStep
