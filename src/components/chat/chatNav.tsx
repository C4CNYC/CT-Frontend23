import { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Drawer from '@mui/material/Drawer'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import ClickAwayListener from '@mui/material/ClickAwayListener'

import { useCollapseNav } from './hooks'
import { useRouter } from 'next/router'
import { useResponsive } from '@/hooks'
import ChatNavItem from './chatNavItem'
import { Scrollbar } from '../scrollbar'
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack'
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward'
import { BsPersonFillAdd } from '@react-icons/all-files/bs/BsPersonFillAdd'
import { FaUserGroup } from '@react-icons/all-files/fa6/FaUserGroup'
import { CiSearch } from '@react-icons/all-files/ci/CiSearch'

import ChatNavAccount from './chatNavAccount'

// ----------------------------------------------------------------------

const NAV_WIDTH = 320

const NAV_COLLAPSE_WIDTH = 96

export default function ChatNav({}) {
  const theme = useTheme()

  const router = useRouter()

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

  const handleClickCompose = useCallback(() => {
    if (!mdUp) {
      onCloseMobile()
    }
    // router.push(paths.dashboard.chat)
  }, [mdUp, onCloseMobile, router])

  const handleSearchContacts = useCallback((inputValue: string) => {
    setSearchContacts((prevState) => ({
      ...prevState,
      query: inputValue,
    }))

    // if (inputValue) {
    //   const results = contacts.filter((contact) =>
    //     contact.name.toLowerCase().includes(inputValue)
    //   )

    //   setSearchContacts((prevState) => ({
    //     ...prevState,
    //     results,
    //   }))
    // }
  }, [])

  const handleClickAwaySearch = useCallback(() => {
    setSearchContacts({
      query: '',
      results: [],
    })
  }, [])

  //   const handleClickResult = useCallback(
  //     (result) => {
  //       handleClickAwaySearch()

  //       router.push(`${paths.dashboard.chat}?id=${result.id}`)
  //     },
  //     [handleClickAwaySearch, router]
  //   )

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
        borderRadius: `0 12px 12px 0`,
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

  //   const renderSkeleton = (
  //     <>
  //       {[...Array(12)].map((_, index) => (
  //         <ChatNavItemSkeleton key={index} />
  //       ))}
  //     </>
  //   )

  const renderList = (
    <>
      {Array(5, 5, 5, 5).map((item, index) => (
        <ChatNavItem
          key={index}
          collapse={collapseDesktop}
          //   conversation={conversations.byId[index]}
          //   selected={true}
          //   onCloseMobile={onCloseMobile}
        />
      ))}
    </>
  )

  //   const renderListResults = (
  //     <ChatNavSearchResults
  //       query={searchContacts.query}
  //       results={searchContacts.results}
  //         onClickResult={handleClickResult}
  //     />
  //   )

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
      <Stack direction='row' alignItems='center' justifyContent='center' sx={{ p: 2.5, pb: 0 }}>
        {!collapseDesktop && (
          <>
            <ChatNavAccount />
            <Box sx={{ flexGrow: 1 }} />
          </>
        )}

        <IconButton onClick={handleToggleNav}>
          {collapseDesktop ? <IoIosArrowForward /> : <IoIosArrowBack />}
        </IconButton>

        {!collapseDesktop && (
          <IconButton onClick={handleClickCompose}>
            <BsPersonFillAdd />
          </IconButton>
        )}
      </Stack>

      <Box sx={{ p: 2.5, pt: 0 }}>{!collapseDesktop && renderSearchInput}</Box>

      <Scrollbar sx={{ pb: 1 }}>
        {/* {searchContacts.query && renderListResults} */}

        {/* {loading && renderSkeleton} */}

        {/* {!searchContacts.query && !!conversations.allIds.length && renderList} */}
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
