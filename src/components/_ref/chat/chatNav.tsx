import { useState, useEffect, useCallback } from 'react'

import {
  Box,
  ClickAwayListener,
  Drawer,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { CiSearch } from '@react-icons/all-files/ci/CiSearch'
import { FaUserGroup } from '@react-icons/all-files/fa6/FaUserGroup'
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack'
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward'

import { useResponsive } from '@/hooks'
import { IFriend } from '@/redux/interfaces/friends.interface'

import ChatNavAccount from './chatNavAccount'
import ChatNavItem from './chatNavItem'
import { ChatNavItemSkeleton } from './chatSkeleton'
import useCollapseNav from './hooks/use-collapse-nav'
import { Scrollbar } from '../../scrollbar'

const NAV_WIDTH = 320

const NAV_COLLAPSE_WIDTH = 96

interface IChatNav {
  selectChat: (id: string) => void
  selectedConversation: string
  isLoading: boolean
  friends: IFriend[] | undefined
}

export default function ChatNav({
  selectChat,
  selectedConversation,
  isLoading,
  friends,
}: IChatNav) {
  const theme = useTheme()

  const mdUp = useResponsive('up', 'md')

  const {
    collapseDesktop,
    onCloseDesktop,
    onCollapseDesktop,
    //
    openMobile,
    onOpenMobile,
    onCloseMobile,
  } = useCollapseNav()

  const [searchContacts, setSearchContacts] = useState({
    query: '',
    results: [],
  })

  useEffect(() => {
    if (!mdUp) {
      onCloseDesktop()
    }
  }, [onCloseDesktop, mdUp])

  const handleToggleNav = useCallback(() => {
    if (mdUp) {
      onCollapseDesktop()
    } else {
      onCloseMobile()
    }
  }, [mdUp, onCloseMobile, onCollapseDesktop])

  const handleSearchContacts = useCallback((inputValue: string) => {
    setSearchContacts((prevState) => ({
      ...prevState,
      query: inputValue,
    }))
  }, [])

  const handleClickAwaySearch = useCallback(() => {
    setSearchContacts({
      query: '',
      results: [],
    })
  }, [])

  const renderToggleBtn = (
    <IconButton
      onClick={onOpenMobile}
      sx={{
        left: 0,
        top: 84,
        zIndex: 9,
        width: 32,
        height: 32,
        position: 'absolute',
        borderRadius: '0 12px 12px 0',
        bgcolor: theme.palette.primary.main,
        boxShadow: theme.customShadows.primary,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          bgcolor: theme.palette.primary.darker,
        },
      }}
    >
      <FaUserGroup />
    </IconButton>
  )

  const renderSkeleton = (
    <>
      {[...Array(12)].map((_, index) => (
        <ChatNavItemSkeleton key={index} />
      ))}
    </>
  )

  const renderList = (
    <>
      {friends?.map((friend, index) => (
        <ChatNavItem
          key={index}
          collapse={collapseDesktop}
          friend={friend}
          selectChat={selectChat}
          selected={selectedConversation}
          //   conversation={conversations.byId[index]}
        />
      ))}
    </>
  )

  const renderSearchInput = (
    <ClickAwayListener onClickAway={handleClickAwaySearch}>
      <TextField
        fullWidth
        value={searchContacts.query}
        onChange={(event) => handleSearchContacts(event.target.value)}
        placeholder='Search contacts...'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <CiSearch />
            </InputAdornment>
          ),
        }}
        sx={{ mt: 2.5 }}
      />
    </ClickAwayListener>
  )

  const renderContent = (
    <>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='center'
        sx={{ p: 2.5, pb: 0 }}
      >
        {!collapseDesktop && (
          <>
            <ChatNavAccount />
            <Box sx={{ flexGrow: 1 }} />
          </>
        )}

        <IconButton onClick={handleToggleNav}>
          {collapseDesktop ? <IoIosArrowForward /> : <IoIosArrowBack />}
        </IconButton>
      </Stack>

      <Box sx={{ p: 2.5, pt: 0 }}>{!collapseDesktop && renderSearchInput}</Box>

      <Scrollbar sx={{ pb: 1 }}>
        {isLoading && renderSkeleton}

        {renderList}
      </Scrollbar>
    </>
  )

  return (
    <>
      {!mdUp && renderToggleBtn}

      {mdUp ? (
        <Stack
          sx={{
            height: 1,
            flexShrink: 0,
            width: NAV_WIDTH,
            borderRight: `solid 1px ${theme.palette.divider}`,
            transition: theme.transitions.create(['width'], {
              duration: theme.transitions.duration.shorter,
            }),
            ...(collapseDesktop && {
              width: NAV_COLLAPSE_WIDTH,
            }),
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openMobile}
          onClose={onCloseMobile}
          slotProps={{
            backdrop: { invisible: true },
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  )
}
