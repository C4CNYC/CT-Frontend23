import { IconButton, Stack, Typography } from '@mui/material'
import { MdOutlineArrowBackIosNew } from '@react-icons/all-files/md/MdOutlineArrowBackIosNew'
import { useRouter } from 'next/router'

// import { TbShare2 } from "react-icons/tb"; // Hide share link

import { useTranslate } from '@/lib/utils/translateHelper'

export default function QuestHeader(): React.ReactElement {
  const { back } = useRouter()
  const translate = useTranslate()

  return (
    <Stack
      direction='row'
      sx={{ justifyContent: 'space-between' }}
    >
      <IconButton
        edge='start'
        onClick={back}
      >
        <MdOutlineArrowBackIosNew size={30} />
      </IconButton>
      <Stack sx={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
        {/* Hide share link */}

        {/* <Button
          variant="text"
          disableRipple
          sx={{
            color: "inherit",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              background: "none",
            },
          }}
        >
          <TbShare2 size="18px" />
          <Typography variant="button" sx={{ ml: 0.5 }}>
            {translate("actions_share")}
          </Typography>
        </Button> */}
        <Typography variant='button'>{translate('quest_type')}</Typography>
      </Stack>
    </Stack>
  )
}
