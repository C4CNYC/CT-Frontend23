import { useState } from 'react'

import { Button, Link, MenuItem, Stack, useMediaQuery } from '@mui/material'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useTheme } from '@mui/system'
import { AiOutlineFundProjectionScreen } from '@react-icons/all-files/ai/AiOutlineFundProjectionScreen'
import { CiMountain1 } from '@react-icons/all-files/ci/CiMountain1'
import { FaPlus } from '@react-icons/all-files/fa/FaPlus'
import { GiProgression } from '@react-icons/all-files/gi/GiProgression'
import { IoPeopleOutline } from '@react-icons/all-files/io5/IoPeopleOutline'
import { IoSettingsOutline } from '@react-icons/all-files/io5/IoSettingsOutline'
import { SiGoogleclassroom } from '@react-icons/all-files/si/SiGoogleclassroom'
import NextLink from 'next/link'

import RoleBasedGuard from '@/auth/RoleBasedGuard'
import { useAuthContext } from '@/auth/useAuthContext'
import { MenuPopover } from '@/components'
import CustomTabPanel, { customTabProps } from '@/components/custom-tab-panel'
import { OPEN_PROJECT } from '@/redux/enums/assignment-types.enum'
import { IClass } from '@/redux/interfaces/class.interface'
import { Role } from '@/redux/services/enums/role.enum'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { useTranslate } from '@/utils/translateHelper'

import DetailsTab from './details-card'
import MemberCard from './members-card'
import ProgressCard from './progress-card'
import QuestsTab from './quest-card'

interface IClassInfoTable {
  classData: IClass & BaseResponseInterface
}

export default function ClassInfoTable({ classData }: IClassInfoTable) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [value, setValue] = useState(0)
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)
  const translate = useTranslate()
  const { user } = useAuthContext()
  const isStudent = user?.role === Role.Student

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    event.preventDefault()
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

  const addQuestPagePath = STUDENT_PATH_DASHBOARD.class.addQuest(classData.id, {
    schoolId: classData?.school?.id as string,
  })
  const addQuestOpenProjectPath = STUDENT_PATH_DASHBOARD.class.addQuest(classData.id, {
    schoolId: classData?.school?.id as string,
    type: OPEN_PROJECT,
  })

  return (
    <Stack
      className='tourMainStep4'
      sx={{ px: 2, pt: 1, flexGrow: 1 }}
    >
      <Stack
        direction='row'
        alignItems='center'
        pb={2}
      >
        <Tabs
          value={value}
          onChange={(_: any, newValue: number) => {
            setValue(newValue)
          }}
          scrollButtons={false}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#43D4DD',
            },
          }}
        >
          <Tab
            label={!isMobile && translate('quests')}
            icon={<CiMountain1 size={20} />}
            {...customTabProps(0)}
            sx={{ fontSize: '1.1rem' }}
          />
          {!isStudent ? (
            <Tab
              label={!isMobile && translate('members')}
              icon={<IoPeopleOutline size={20} />}
              sx={{ fontSize: '1.1rem' }}
              {...customTabProps(1)}
            />
          ) : null}
          <Tab
            label={!isMobile && translate('details')}
            icon={<IoSettingsOutline size={20} />}
            sx={{ fontSize: '1.1rem' }}
            {...customTabProps(isStudent ? 1 : 2)}
          />
          <Tab
            label={!isMobile && translate('progress')}
            icon={<GiProgression size={20} />}
            sx={{ fontSize: '1.1rem' }}
            {...customTabProps(isStudent ? 2 : 3)}
          />
        </Tabs>
        <Stack
          direction='row'
          sx={{
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'end',
            gap: 2,
          }}
        >
          {/* <Link
            noWrap
            href={STUDENT_PATH_DASHBOARD.gallery.root}
            variant="body2"
            underline="none"
            sx={GALLERY_SX}
          >
            <Iconify icon="solar:gallery-wide-broken" width={20} />
            {!isMobile && (
              <Typography color="#637381" fontSize="1.1rem" mr="10px">
                {translate("gallery")}
                <CiShare1 size={15} style={{ margin: "0 0 3px 3px" }} />
              </Typography>
            )}
          </Link> */}
          <RoleBasedGuard roles={[Role.Owner, Role.Admin, Role.Manager]}>
            <Button
              onClick={handleOpenPopover}
              sx={{
                gap: 1,
                p: isMobile ? 1 : '',
                minWidth: 0,
                whiteSpace: 'nowrap',
              }}
              variant='outlined'
              color='info'
            >
              <FaPlus
                size={15}
                style={{ marginBottom: '2px' }}
              />
              {!isMobile && translate('actions_add_quest')}
            </Button>
          </RoleBasedGuard>
        </Stack>
      </Stack>
      <CustomTabPanel
        value={value}
        index={0}
      >
        <QuestsTab
          classId={classData.id}
          schoolId={classData.school?.id ?? ''}
          activeTab={value === 0}
        />
      </CustomTabPanel>
      {!isStudent ? (
        <CustomTabPanel
          value={value}
          index={1}
        >
          <MemberCard activeTab={value === 1} />
        </CustomTabPanel>
      ) : null}
      <CustomTabPanel
        value={value}
        index={isStudent ? 1 : 2}
      >
        <DetailsTab
          classData={classData}
          activeTab={value === 1}
        />
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={isStudent ? 2 : 3}
      >
        <ProgressCard activeTab={value === 2 || value === 3} />
      </CustomTabPanel>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        disabledArrow
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: -5, horizontal: 5 }}
        sx={{
          p: 2,
        }}
      >
        <Link
          component={NextLink}
          href={addQuestPagePath}
          underline='none'
          color={theme.palette.mode === 'dark' ? '#fff' : 'initial'}
        >
          <MenuItem>
            <SiGoogleclassroom size={10} />
            {translate('home_assign_course')}
          </MenuItem>
        </Link>
        <RoleBasedGuard roles={[Role.Admin, Role.Manager, Role.Owner]}>
          <Link
            component={NextLink}
            href={addQuestOpenProjectPath}
            underline='none'
            color={theme.palette.mode === 'dark' ? '#fff' : 'initial'}
          >
            <MenuItem>
              <AiOutlineFundProjectionScreen size={20} />
              {translate('home_assign_project')}
            </MenuItem>
          </Link>
        </RoleBasedGuard>
      </MenuPopover>
    </Stack>
  )
}

const BADGE_SX = {
  '& .MuiBadge-badge': {
    left: 55,
    top: 28,
    padding: 0,
    height: 14,
    width: '85px',
  },
}

const GALLERY_SX = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  color: 'inherit',
  maxWidth: 360,
  ml: 3.25,
  justifyContent: 'center',
}
