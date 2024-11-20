import { type FC, useState } from 'react'

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import { BsChatText } from '@react-icons/all-files/bs/BsChatText'
import { useDispatch, useSelector } from 'react-redux'

import { Iconify } from '@/components/iconify'
import { useGetHelpFromAIMutation } from '@/redux/services/manager/lesson-student'
import {
  setChatMessages,
  setChatVisible,
  setSlideContext,
  IChatMessage,
} from '@/redux/slices/chat-handler'
import { useTranslate } from '@/utils/translateHelper'

import FullCodeSolutionModal from '../../modals/FullCodeSolution'

import {
  ASK_TEXTS,
  DIALOG_PAPER_PROPS,
  DIALOG_TITLE_SX,
  DIALOG_TITLE_TYP_SX,
  ICON_BTN_SX,
  LIST_ITEM_BTN_SX,
  LIST_ITEM_ICON_SX,
  LIST_MOB_SX,
} from './constants'

interface UnstuckMobileDialogProps {
  open: boolean
  onClose: () => void
  slideText: string
}

enum SENDER_AI {
  MUMU_AI = 'Mumu AI',
}

const UnstuckMobileDialog: FC<UnstuckMobileDialogProps> = ({ open, onClose, slideText }) => {
  const [checked, setChecked] = useState<string[]>([])
  const translate = useTranslate()
  const dispatch = useDispatch()
  const profile = useSelector((state: any) => state.global.user)
  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }
  const [aiResponse, setAIResponse] = useState<string[]>([])
  const [getHelpFromAI, { isLoading: getHelpFromAILoading }] = useGetHelpFromAIMutation()
  const [aiQuestion, setAIQuestion] = useState<string>('')
  const [messageLog, setMessageLog] = useState<IChatMessage[]>([])

  const handleAskAI = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const response = await getHelpFromAI({
      prompt: `${aiQuestion} Please explain considering the context of ${slideText} ${aiResponse}`,
    })

    if ('data' in response && response.data) {
      setAIResponse([...aiResponse, response.data?.data ?? response.data?.error])
    } else if (response.error) {
      setAIResponse([...aiResponse, response?.error?.data])
    }
  }

  async function getUnstuck() {
    const prompt = `Please help me understand what to do next. How do I get from my current code to the solution code? Please give me a simple hint about what I should do next. Explain the concept I need to learn to finish the code. ${slideText}`
    dispatch(setSlideContext(prompt))
    const hint = await getHelpFromAI({
      prompt,
    })
    if ('data' in hint) {
      const newMessages = [
        ...messageLog,
        {
          body: 'What should I do next?',
          sender: profile?.id,
          timestamp: new Date(),
        },
        {
          body: JSON.stringify(hint.data?.data),
          sender: SENDER_AI.MUMU_AI,
          timestamp: new Date(),
        },
      ]
      setMessageLog(newMessages)
      dispatch(setChatMessages(newMessages))
    } else if ('error' in hint) {
      const newMessages = [
        ...messageLog,
        {
          body: 'What should I do next?',
          sender: profile?.id,
          timestamp: new Date(),
        },
        {
          body: JSON.stringify(hint?.error),
          sender: SENDER_AI.MUMU_AI,
          timestamp: new Date(),
        },
      ]
      setMessageLog(newMessages)
      dispatch(setChatMessages(newMessages))
    }
    dispatch(setChatVisible(true))
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll='paper'
      PaperProps={DIALOG_PAPER_PROPS}
    >
      <DialogTitle sx={DIALOG_TITLE_SX}>
        <BsChatText
          size='30px'
          color='#43D4DD'
        />

        <Typography
          variant='h5'
          sx={DIALOG_TITLE_TYP_SX}
        >
          {translate('get_unstuck')}
        </Typography>

        <IconButton
          onClick={onClose}
          sx={ICON_BTN_SX}
        >
          <Iconify
            width='20px'
            icon='ic:round-close'
          />
        </IconButton>
      </DialogTitle>

      <>
        <Button onClick={getUnstuck}>{translate('Ask Mumu: Help, what do I do next?')}</Button>
        <List sx={LIST_MOB_SX}>
          {ASK_TEXTS.map((value) => {
            const labelId = `checkbox-list-label-${value}`

            return (
              <ListItem
                key={value}
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(value)}
                  sx={LIST_ITEM_BTN_SX}
                  dense
                >
                  <ListItemIcon sx={LIST_ITEM_ICON_SX}>
                    <Checkbox
                      edge='start'
                      checked={checked.includes(value)}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>

                  <ListItemText
                    id={labelId}
                    primary={translate(value)}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>

        <Box
          bgcolor='#eee'
          p='15px 29px'
        >
          {translate('see_this_training')}
          <FullCodeSolutionModal disabled={checked.length !== 3}>
            <Link href='#'>{translate('full_code_solutions')}</Link>
          </FullCodeSolutionModal>
        </Box>

        <Typography p='15px 29px'>{translate('or_keep_goin_slide')}</Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          sx={{ marginLeft: '5px' }}
          placeholder='Type your question here'
          onChange={(e) => {
            setAIQuestion(e.target.value)
          }}
        />
        <Button onClick={handleAskAI}>Submit your question to AI</Button>
      </>
    </Dialog>
  )
}

export default UnstuckMobileDialog
