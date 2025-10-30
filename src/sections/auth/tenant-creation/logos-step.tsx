import { useState } from 'react'

import { Box, IconButton, Stack, Typography } from '@mui/material'
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose'
import { MdCloudUpload } from '@react-icons/all-files/md/MdCloudUpload'

import { RHFUploadBox, SingleFilePreview } from '@root/src/components'
import { useTranslate } from '@root/src/utils/translateHelper'

import CustomLabel from './_components/CustomLabel'
import NextBtn from './_components/NextBtn'
import SkipBtn from './_components/SkipBtn'
import { HELPER_IMG_TEXT, UPLOAD_IMG_BTN } from './constants'
import { useStepperContext } from './stepper-context'
const LogosStep = () => {
  const translate = useTranslate()
  const { handleNext, handleValidationScreenLogo, isLoading } = useStepperContext()

  const [uploadedLogo, setUploadedLogo] = useState<null | File>(null)

  return (
    <Stack sx={{ gap: 3 }}>
      <CustomLabel
        whiteSpace='nowrap'
        translationKey='Got a Logo?'
      />
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 2,
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
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
            sx={{
              width: '120px',
              height: '120px',
              filter: uploadedLogo
                ? 'grayscale(1) contrast(1.2) brightness(0.8) blur(3px)'
                : 'none',
            }}
            name='logo'
            accept={{
              'image/*': [],
            }}
            onDrop={(files: File[]) => {
              setUploadedLogo(files[0])
            }}
            placeholder={
              <Stack alignItems='center'>
                <MdCloudUpload size={28} />
                <Typography variant='button'>{translate('Square Logo')}</Typography>
              </Stack>
            }
          />
          <Typography
            variant='caption'
            noWrap
            width='90px'
            sx={HELPER_IMG_TEXT}
          >
            {uploadedLogo?.name}
          </Typography>
          <SingleFilePreview file={uploadedLogo ? URL.createObjectURL(uploadedLogo) : null} />
        </Box>
        <CustomLabel
          variant='caption'
          translationKey='No larger than 200×200 px and supports PNG, JPG formats.'
        />
      </Stack>
      <NextBtn
        onClick={() => handleValidationScreenLogo(uploadedLogo || '')}
        loading={isLoading}
      />
      <SkipBtn onClick={handleNext} />
    </Stack>
  )
}

export default LogosStep
