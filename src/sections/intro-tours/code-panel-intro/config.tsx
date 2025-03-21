import { Box } from '@mui/material'
import { Step } from 'react-joyride'

import { Image } from '@/components'

export const getTourStepsDesktop = (translate: (key: string) => string): Step[] => [
  {
    target: '.tourStart',
    title: <div>{translate('intro_tour_step_1_desktop_title')}</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/auth-cat.webp'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '290px' }}
        />
        {translate('intro_tour_step_1_desktop_subtitle')}
      </div>
    ),
    disableBeacon: true,
    placement: 'center' as const,
  },
  {
    target: '.instructions',
    title: <div>{translate('intro_tour_step_2_desktop_title')}</div>,
    content: (
      <div>
        <p>{translate('intro_tour_step_2_desktop_subtitle_1')}</p>
        <p>{translate('intro_tour_step_2_desktop_subtitle_2')}</p>
      </div>
    ),
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.instructions',
    title: <div>{translate('intro_tour_step_3_desktop_title')}</div>,
    content: (
      <div>
        <Image
          src='/assets/tour_images/challenge.webp'
          alt='challenge preview'
          sx={{ py: 1, minHeight: '260px' }}
        />
        {translate('intro_tour_step_3_desktop_subtitle')}
      </div>
    ),
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.controls',
    title: <div>{translate('intro_tour_step_4_desktop_title')}</div>,
    content: (
      <div>
        <Image
          src='/assets/tour_images/controls.webp'
          alt='controls preview'
          sx={{ py: 1, minHeight: '160px' }}
        />
        {translate('intro_tour_step_4_desktop_subtitle')}
      </div>
    ),
    disableBeacon: true,
    placement: 'top' as const,
  },
  {
    target: '.codeEditorTour',
    title: <div>{translate('intro_tour_step_5_desktop_title')}</div>,
    content: (
      <div>
        <video
          src='/assets/tour_images/cat_typing.mp4'
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: 'auto' }}
        ></video>

        {translate('intro_tour_step_5_desktop_subtitle')}
      </div>
    ),
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.tourStart',
    title: <div>{translate('intro_tour_step_6_desktop_title')}</div>,
    content: (
      <div>
        <Image
          src='/assets/tour_images/checkers.webp'
          alt='checkers preview'
          sx={{ py: 1, minHeight: '160px' }}
        />
        {translate('intro_tour_step_6_desktop_subtitle')}
      </div>
    ),
    disableBeacon: true,
    placement: 'center' as const,
  },
  {
    target: '.toolbox',
    title: <div> {translate('intro_tour_step_7_desktop_title')} </div>,
    content: (
      <div>
        <Image
          src='/assets/tour_images/toolbox.webp'
          alt='checkers preview'
          sx={{ py: 1, minHeight: '160px' }}
        />
        <p> {translate('intro_tour_step_7_desktop_subtitle')}</p>
        <p> {translate('intro_tour_step_7_desktop_subtitle_2')}</p>
        <Box
          sx={{
            display: 'inline-block',
            fontWeight: 'bold',
            background: 'rgba(251, 221, 63, .4)',
            px: 1,
            borderRadius: 1,
          }}
        >
          &#123; &#125;
        </Box>{' '}
        {translate('intro_tour_step_7_desktop_subtitle_3')}
      </div>
    ),
    disableBeacon: true,
    placement: 'top' as const,
  },
  {
    target: '.lessonsTour',
    title: <div>{translate('intro_tour_step_8_desktop_title')} </div>,
    content: <div>{translate('intro_tour_step_8_desktop_subtitle')}</div>,
    disableBeacon: true,
    placement: 'top' as const,
  },
  {
    target: '.feedback-button',
    title: <div>{translate('intro_tour_step_9_desktop_title')}</div>,
    content: (
      <Box sx={{ py: 1, textAlign: 'center' }}>
        {translate('intro_tour_step_9_desktop_subtitle')}
      </Box>
    ),
    disableBeacon: true,
    placement: 'top' as const,
  },
]

export const getTourStepsMobile = (translate: (key: string) => string): Step[] => [
  {
    target: '.tourStart',
    title: <div>{translate('intro_tour_step_1_mobile_title')}</div>,
    content: (
      <div>
        <Image
          src='/assets/illustrations/auth-cat.webp'
          alt='mumu tiger'
          sx={{ py: 1, minHeight: '180px' }}
        />
        {translate('intro_tour_step_1_mobile_subtitle')}
      </div>
    ),
    disableBeacon: true,
    placement: 'center' as const,
  },
  {
    target: '.sliderTour',
    title: <div>{translate('intro_tour_step_2_mobile_title')}</div>,
    content: <div>{translate('intro_tour_step_2_mobile_subtitle')}</div>,
    disableBeacon: true,
  },
  {
    target: '.sliderTour',
    title: <div>{translate('intro_tour_step_3_mobile_title')}</div>,
    content: (
      <div>
        <Image
          src='/assets/tour_images/challenge.webp'
          alt='challenge preview'
          sx={{ py: 1 }}
        />
        {translate('intro_tour_step_3_mobile_subtitle')}
      </div>
    ),
    disableBeacon: true,
    placement: 'center' as const,
  },
  {
    target: '.controls',
    title: <div>{translate('intro_tour_step_4_mobile_title')}</div>,
    content: (
      <div>
        <Image
          src='/assets/tour_images/controls.webp'
          alt='controls preview'
          sx={{ py: 1, minHeight: '160px' }}
        />
        {translate('intro_tour_step_4_mobile_subtitle')}
      </div>
    ),
    disableBeacon: true,
    placement: 'top' as const,
  },
  {
    target: '.smallSliderTour',
    title: <div>{translate('intro_tour_step_5_mobile_title')}</div>,
    content: <div>{translate('intro_tour_step_5_mobile_subtitle')}</div>,
    disableBeacon: true,
  },
  {
    target: '.lessonsTourMobile',
    title: <div>{translate('intro_tour_step_6_mobile_title')}</div>,
    content: <div>{translate('intro_tour_step_6_mobile_subtitle')}</div>,
    disableBeacon: true,
    placement: 'top' as const,
  },
  {
    target: '.feedback-button',
    title: <div>{translate('intro_tour_step_7_mobile_title')}</div>,
    content: (
      <Box sx={{ py: 1, textAlign: 'center' }}>
        {translate('intro_tour_step_7_mobile_subtitle')}
      </Box>
    ),
    disableBeacon: true,
    placement: 'top' as const,
  },
]
