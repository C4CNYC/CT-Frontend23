import Stack from '@mui/material/Stack'
import Step from '@mui/material/Step'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { styled } from '@mui/material/styles'
import { FaUserCog } from '@react-icons/all-files/fa/FaUserCog'
import { FaUserEdit } from '@react-icons/all-files/fa/FaUserEdit'
import { LuImage } from '@react-icons/all-files/lu/LuImage'
import { MdFileDownloadDone } from '@react-icons/all-files/md/MdFileDownloadDone'
import { MdOutlineStickyNote2 } from '@react-icons/all-files/md/MdOutlineStickyNote2'
import { RiOrganizationChart } from '@react-icons/all-files/ri/RiOrganizationChart'
import { TbBrandCodesandbox } from '@react-icons/all-files/tb/TbBrandCodesandbox'

import { STEPS } from '../constants'
import { useStepperContext } from '../stepper-context'

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props

  const icons: { [index: string]: React.ReactElement<unknown> } = {
    1: (
      <FaUserEdit
        size={22}
        style={{ marginLeft: '4px' }}
      />
    ),
    2: (
      <FaUserCog
        size={22}
        style={{ marginLeft: '3px' }}
      />
    ),
    3: <RiOrganizationChart size={22} />,
    4: <TbBrandCodesandbox size={22} />,
    5: <LuImage size={22} />,
    6: <MdOutlineStickyNote2 size={22} />,
  }

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {completed ? <MdFileDownloadDone size={22} /> : icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

export default function RegStepper() {
  const { activeStep } = useStepperContext()
  return (
    <Stack
      sx={{ width: '100%', position: 'absolute', top: -45, left: 0, right: 0, zIndex: 1 }}
      spacing={2}
    >
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {Array.from(STEPS).map((el) => (
          <Step key={el}>
            <StepLabel StepIconComponent={ColorlibStepIcon} />
          </Step>
        ))}
      </Stepper>
    </Stack>
  )
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 18,
    left: 'calc(-50% + 5px)',
    right: 'calc(50% + 5px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(136deg, rgba(67, 212, 221, 0.6) 0%, rgba(47, 170, 179, 0.8) 50%, rgba(30, 130, 140, 1) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(136deg, rgba(67, 212, 221, 0.6) 0%, rgba(47, 170, 179, 0.8) 50%, rgba(30, 130, 140, 1) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#fff',
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}))

type OwnerState = {
  completed?: boolean
  active?: boolean
}

const ColorlibStepIconRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'ownerState',
})<{ ownerState: OwnerState }>(({ theme, ownerState }) => ({
  backgroundColor: '#fff',
  zIndex: 1,
  color: 'rgba(30, 130, 140, 1)',
  width: 36,
  height: 36,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...theme.applyStyles?.('dark', {
    backgroundColor: theme.palette.grey[700],
  }),
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient(136deg, rgba(67, 212, 221, 0.6) 0%, rgba(47, 170, 179, 0.8) 50%, rgba(30, 130, 140, 1) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.25)',
    color: '#fff',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient(136deg, rgba(67, 212, 221, 0.6) 0%, rgba(47, 170, 179, 0.8) 50%, rgba(30, 130, 140, 1) 100%)',
    color: '#fff',
  }),
}))
