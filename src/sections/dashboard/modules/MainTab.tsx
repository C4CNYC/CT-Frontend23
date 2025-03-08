import { Box, IconButton, Typography } from '@mui/material'
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose'

import { RHFSwitch } from '@root/src/components/hook-form/RHFSwitch'
import { RHFTextField } from '@root/src/components/hook-form/RHFTextField'
import { RHFUpload } from '@root/src/components/hook-form/RHFUpload'
import { SingleFilePreview } from '@root/src/components/upload/preview/SingleFilePreview'
import { useTranslate } from '@root/src/utils/translateHelper'

import { HELPER_IMG_TEXT, INPUT_SX, UPLOAD_IMG_BTN } from './constants'

interface MainTabProps {
  uploadedFile: File | null
  setUploadedFile: (file: null | File) => void
  uploadedBackground: File | null
  setUploadedBackground: (file: null | File) => void
}

const MainTab = ({
  setUploadedFile,
  uploadedFile,
  uploadedBackground,
  setUploadedBackground,
}: MainTabProps): React.ReactElement => {
  const translate = useTranslate()
  return (
    <>
      <Box>
        <Typography
          variant='body1'
          pb={1}
          pl={1}
          mt={-3}
        >
          {translate('modules_module_image')}
        </Typography>
        <Box sx={{ position: 'relative' }}>
          {uploadedFile ? (
            <IconButton
              sx={UPLOAD_IMG_BTN}
              onClick={() => {
                setUploadedFile(null)
              }}
            >
              <IoMdClose size='20px' />
            </IconButton>
          ) : null}
          <RHFUpload
            name='module_img'
            onDrop={(files: File[]) => {
              setUploadedFile(files[0])
            }}
            helperText={
              <Typography
                variant='caption'
                noWrap
                width='90px'
                sx={HELPER_IMG_TEXT}
              >
                {uploadedFile?.name}
              </Typography>
            }
          />
          <SingleFilePreview file={uploadedFile ? URL.createObjectURL(uploadedFile) : null} />
        </Box>
      </Box>
      <Box>
        <Typography
          variant='body1'
          pb={1}
          pl={1}
          mt={-1}
        >
          {translate('modules_module_background')}
        </Typography>
        <Box sx={{ position: 'relative' }}>
          {uploadedBackground ? (
            <IconButton
              sx={UPLOAD_IMG_BTN}
              onClick={() => {
                setUploadedBackground(null)
              }}
            >
              <IoMdClose size='20px' />
            </IconButton>
          ) : null}
          <RHFUpload
            name='module_bg_img'
            onDrop={(files: File[]) => {
              setUploadedBackground(files[0])
            }}
            helperText={
              <Typography
                variant='caption'
                noWrap
                width='90px'
                sx={HELPER_IMG_TEXT}
              >
                {uploadedBackground?.name}
              </Typography>
            }
          />
          <SingleFilePreview
            file={uploadedBackground ? URL.createObjectURL(uploadedBackground) : null}
          />
        </Box>
      </Box>
      <RHFTextField
        sx={INPUT_SX}
        name='name'
        label={translate('modules_module_name')}
        required
      />

      <RHFTextField
        name='description'
        label={translate('modules_module_description')}
        required
        multiline
        rows={3}
      />

      <RHFSwitch
        name='active'
        label={translate('modules_module_active')}
      />
    </>
  )
}

export default MainTab
