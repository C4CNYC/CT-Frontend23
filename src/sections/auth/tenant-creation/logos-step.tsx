import { useState } from 'react'

import { Box, IconButton, Stack, Typography } from '@mui/material'
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose'
import { MdCloudUpload } from '@react-icons/all-files/md/MdCloudUpload'
import { useRouter } from 'next/router'

import { RHFUploadBox, SingleFilePreview } from '@root/src/components'
import { useTranslate } from '@root/src/utils/translateHelper'

import CustomLabel from './_components/CustomLabel'
import NextBtn from './_components/NextBtn'
import { HELPER_IMG_TEXT, UPLOAD_IMG_BTN } from './constants'
import { useStepperContext } from './stepper-context'
const LogosStep = () => {
  const translate = useTranslate()
  const { handleNext } = useStepperContext()
  const { push } = useRouter()

  const [uploadedLogo, setUploadedLogo] = useState<null | File>(null)
  const [uploadedLogoMini, setUploadedLogoMini] = useState<null | File>(null)

  return (
    <Stack sx={{ gap: 1 }}>
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
            sx={{ width: '120px', height: '120px' }}
            name='logo'
            accept={{
              'image/*': [],
            }}
            onDrop={(files: File[]) => {
              setUploadedLogoMini(files[0])
            }}
            placeholder={
              <Stack alignItems='center'>
                <MdCloudUpload size={28} />
                <Typography variant='button'>{translate('Square Logo')}</Typography>
              </Stack>
            }
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
          variant='caption'
          translationKey='No larger than 200×200 px and supports PNG, JPG formats.'
        />
      </Stack>
      <Box sx={{ position: 'relative', maxWidth: 'fit-content', pb: 1 }}>
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
          sx={{ width: '230px', height: '120px' }}
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
              <Typography variant='button'>{translate('Rectangle Logo')}</Typography>
            </Stack>
          }
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
      <NextBtn onClick={handleNext} />
    </Stack>
  )
}

export default LogosStep
